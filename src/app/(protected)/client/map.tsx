import React, { useState, useMemo, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Text, Alert, Platform } from 'react-native';
import MapView, { Marker, Polygon, MapPressEvent, LatLng } from 'react-native-maps';
import { getAreaOfPolygon } from 'geolib';
import * as Location from 'expo-location';
import { ActivityIndicator } from 'react-native-paper';

const MapScreen = () => {
  useEffect(() => {
    console.log("Map Screen mounted");
  }, []);
  const [polygonCoords, setPolygonCoords] = useState<LatLng[]>([]);
  const [isDrawing, setIsDrawing] = useState(true);

  const handleMapPress = (event: MapPressEvent) => {
    if (!isDrawing) return;

    const { coordinate } = event.nativeEvent;
    setPolygonCoords([...polygonCoords, coordinate]);
  };

  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');


  const undoLastPoint = () => {
    setPolygonCoords((prevCoords) => prevCoords.slice(0, -1));
  };

  const finishDrawing = () => {
    setIsDrawing(false);
  };

  const clearPolygon = () => {
    setPolygonCoords([]);
    setIsDrawing(true);
  };

  const movePoint = (index: number, coordinate: LatLng) => {
    const updatedCoords = [...polygonCoords];
    updatedCoords[index] = coordinate;
    setPolygonCoords(updatedCoords);
  };

  const toggleMapType = () => {
    setMapType((prev) => (prev === 'standard' ? 'satellite' : 'standard'));
  };
  

  // Memoized Area Calculation (only recalculates when coords change)
  const areaInSquareMeters = useMemo(() => {
    if (polygonCoords.length >= 3) {
      return getAreaOfPolygon(polygonCoords);
    }
    return 0;
  }, [polygonCoords]);

  const areaInKm2 = (areaInSquareMeters / 1_000_000).toFixed(2);
  const areaInHectares = (areaInSquareMeters / 10_000).toFixed(2);
  const areaInM2 = areaInSquareMeters.toFixed(0);

  const [userLocation, setUserLocation] = useState<Location.LocationObjectCoords | null>(null);
  const mapRef = useRef<MapView>(null);
  
  useEffect(() => {
    (async () => {
      // Ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required.');
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('User location:', latitude, longitude);
      setUserLocation(location.coords);
    })();
  }, []);
  
  useEffect(() => {
    if (userLocation && mapRef.current) {
      const camera = {
        center: userLocation,
        pitch: 0,
        heading: 0,
        altitude: 1000,
        zoom: 16,
      };
      mapRef.current.animateCamera(camera, { duration: 1000 });
    }
  }, [userLocation]);

  if (!userLocation) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const initialCamera = Platform.select({
    ios: {
      center: userLocation,
      pitch: 0,
      heading: 0,
      altitude: 1000, // Only affects iOS
      // Do not set zoom here to let altitude take effect
    },
    android: {
      center: userLocation,
      pitch: 0,
      heading: 0,
      zoom: 15, // Only affects Android
      // altitude is ignored on Android
    }
  });
  
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        mapType={mapType}
        showsCompass={true}
        rotateEnabled={true}
        showsUserLocation={true}
        loadingEnabled={true}
        style={styles.map}
        onPress={handleMapPress}
        initialCamera={initialCamera}
      >

        {polygonCoords.length > 0 && (
          <Polygon
            coordinates={polygonCoords}
            fillColor="rgba(0, 200, 0, 0.3)"
            strokeColor="green"
            strokeWidth={2}
          />
        )}

        {polygonCoords.map((point, index) => (
          <Marker
            key={index}
            coordinate={point}
            draggable
            pinColor="blue"
            onDragEnd={(e) => movePoint(index, e.nativeEvent.coordinate)}
            //opacity={0} // hides the visual pin
          />
        ))}
      </MapView>

      {/* Area Display */}
      {polygonCoords.length >= 2 && (
      <View style={styles.areaContainer}>
        <Text style={styles.areaText}>Area:</Text>
        <Text style={styles.areaText}>{areaInKm2} km²</Text>
        <Text style={styles.areaText}>{areaInHectares} ha</Text>
        <Text style={styles.areaText}>{areaInM2} m²</Text>
      </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title={`Switch to ${mapType === 'standard' ? 'Satellite' : 'Standard'}`} onPress={toggleMapType} />
        <Button title="Undo Last Point" onPress={undoLastPoint} disabled={polygonCoords.length === 0} />
        <Button title={isDrawing ? "Finish Drawing" : "Drawing Finished"} onPress={finishDrawing} disabled={!isDrawing} />
        <Button title="Clear Polygon" onPress={clearPolygon} disabled={polygonCoords.length === 0} />
      </View>
      {Platform.OS === 'ios' && (
      <View style={styles.locationButtonContainer}>
  <Button
    title="Go to My Location"
    onPress={() => {
      //console.log('Go to My Location pressed');
      //console.log('User location:', userLocation);
      //console.log('Map ref:', mapRef.current);
      if (userLocation && mapRef.current) {
        mapRef.current.animateCamera({
          center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 16,
        }, { duration: 1000 });
      } else {
        console.warn('User location or map reference not available');
      }
    }}
  />
</View>)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
  },
  areaContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  areaText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonContainer: {
    position: 'absolute',
    bottom: 130,
    right: 20,
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  }
});

export default MapScreen;
