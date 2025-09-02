import { ActivityIndicator, Button, HelperText, Text, TextInput } from "react-native-paper";
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { colors } from "@/src/assets/theme/colors";
import { Image } from "expo-image";
import { Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles as appStyles } from "@/src/assets/styles/appStylesheet";
import { useRouter } from "expo-router";
import i18n from "@/src/assets/localization/i18n";
import MapView, { LatLng, MapPressEvent, Marker, Polygon } from "react-native-maps";
import { getAreaOfPolygon } from "geolib";
import * as Location from 'expo-location';

const PlacesAddScreen = () => {
  const [isShowMap, setIsSelected] = useState(false);
  const [screen, setScreen] = useState<number>(1);
  const router = useRouter();

  const showMap = (button: string) => {
    if (button === "form") {
      setIsSelected(false);
      setScreen(1);
    } else if (button === "map") {
      setIsSelected(true);
      setScreen(2);
    }
  };

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
        Alert.alert(i18n.t("alert_permission_denied_title"), i18n.t("map_permission_denied_msg"));
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

  const renderScreen = () => {
    switch (screen) {
      case 1:
        return (
          <View style={{ marginTop: 16 }}>
            {/* First Name Input */}
            <TextInput
              label={i18n.t("name")}
              /* label={i18n.t("first_name")}
                value={formData.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                onBlur={() => handleValidation("firstName", formData.firstName)}
                error={!!firstNameError} */
              style={appStyles.textInput}
              mode="flat"
              underlineColor="transparent"
              theme={{ colors: { background: colors.white } }}
              returnKeyType="next"
            />
            <HelperText type="error" visible={false}>
              {"error"}
            </HelperText>
            <TextInput
              label={i18n.t("area_m2")}
              /* label={i18n.t("first_name")}
                value={formData.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                onBlur={() => handleValidation("firstName", formData.firstName)}
                error={!!firstNameError} */
              style={appStyles.textInput}
              mode="flat"
              underlineColor="transparent"
              theme={{ colors: { background: colors.white } }}
              returnKeyType="next"
            />
            <HelperText type="error" visible={false}>
              {"error"}
            </HelperText>
            <TextInput
              label={i18n.t("id")}
              /* label={i18n.t("first_name")}
                value={formData.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                onBlur={() => handleValidation("firstName", formData.firstName)}
                error={!!firstNameError} */
              style={appStyles.textInput}
              mode="flat"
              underlineColor="transparent"
              theme={{ colors: { background: colors.white } }}
              returnKeyType="next"
            />
            <HelperText type="error" visible={false}>
              {"error"}
            </HelperText>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 1, marginRight: 8 }}>
                <TextInput
                  label={i18n.t("gps") + "1"}
                  /* label={i18n.t("first_name")}
                        value={formData.firstName}
                        onChangeText={(text) => handleChange("firstName", text)}
                        onBlur={() => handleValidation("firstName", formData.firstName)}
                        error={!!firstNameError} */
                  style={appStyles.textInput}
                  mode="flat"
                  underlineColor="transparent"
                  theme={{ colors: { background: colors.white } }}
                  returnKeyType="next"
                />
                <HelperText type="error" visible={false}>
                  {"error"}
                </HelperText>
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <TextInput
                  label={i18n.t("gps") + "2"}
                  /* label={i18n.t("first_name")}
                        value={formData.firstName}
                        onChangeText={(text) => handleChange("firstName", text)}
                        onBlur={() => handleValidation("firstName", formData.firstName)}
                        error={!!firstNameError} */
                  style={appStyles.textInput}
                  mode="flat"
                  underlineColor="transparent"
                  theme={{ colors: { background: colors.white } }}
                  returnKeyType="next"
                />
                <HelperText type="error" visible={false}>
                  {"error"}
                </HelperText>
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <>
            {/* Area Display */}
            {polygonCoords.length >= 0 && (
              <View style={styles.mapAreaContainer}>
                <Text style={styles.mapAreaText}>{i18n.t("area_selected") + ": "}</Text>
                {/* <Text style={styles.mapAreaText}>{areaInKm2} km²</Text>
                <Text style={styles.mapAreaText}>{areaInHectares} ha</Text> */}
                <Text style={styles.mapAreaText}>{areaInM2} {i18n.t("sq_meter")}</Text>
              </View>
            )}
            <View style={styles.mapContainer}>
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
                    onDragEnd={(e) =>
                      movePoint(index, e.nativeEvent.coordinate)
                    }
                    //opacity={0} // hides the visual pin
                  />
                ))}
              </MapView>
              {/* Map Buttons */}
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={styles.myLocationViewTypeButton}
                  onPress={goToMyLocation}
                  activeOpacity={0.7}
                >
                  <FontAwesome6 name="location-crosshairs" size={24} color={colors.primary500} />
                </TouchableOpacity>
              )}
              <View style={styles.mapViewTypeButton}>
                <TouchableOpacity onPress={toggleMapType} style={{ alignItems: "center", justifyContent: "center" }}>
                  {mapType === "standard" ? (
                    <MaterialIcons name="satellite" size={32} color={colors.primary500} />
                  ) : (
                    <MaterialIcons name="map" size={32} color={colors.primary500} />
                  )}
                </TouchableOpacity>
              </View>
              {/* Edit Map Buttons */}
              <View style={styles.buttonMapContainer}>
                <TouchableOpacity
                  onPress={undoLastPoint}
                  disabled={polygonCoords.length === 0}
                  style={styles.buttonEditMapContainer}
                >
                  <MaterialIcons name="undo" size={32} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={clearPolygon}
                  disabled={polygonCoords.length === 0}
                  style={styles.buttonEditMapContainer}
                >
                  <MaterialIcons name="delete-outline" size={32} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={finishDrawing}
                  disabled={!isDrawing}
                  style={[
                    styles.buttonEditMapContainer,
                    { opacity: !isDrawing ? 0.25 : 0.75 }
                  ]}
                >
                  <MaterialIcons name="crop-square" size={32} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  const savePlace = () => {
    console.log('Save');
  }

  const goToMyLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          },
          zoom: 16,
          heading: 0,
          pitch: 0,
          altitude: 1000,
        },
        { duration: 800 }
      );
    }
  };

  return (
    <View style={appStyles.mainContainer}>
      <TouchableOpacity onPress={() => router.replace("/client/home")}>
        <MaterialIcons name="arrow-back" size={24} color={colors.primary700} />
      </TouchableOpacity>
      {/* Title and Optional Button */}
      <View style={appStyles.screenTitleContainer}>
        <Text style={appStyles.clientMainTitle}>{i18n.t("add_edit")}</Text>
        <View style={{flexDirection: "row", gap: 8}}>
          {/* Left icon - form */}
          <View style={[ styles.squareButtons,
              { backgroundColor: !isShowMap ? colors.primary500 : colors.backgroundGrey },
            ]} onTouchStart={() => showMap("form")} >
            <Image
              source={require("@images/products.png")}
              style={{ width: 24, height: 24, tintColor: !isShowMap ? colors.white : colors.black }}
            />
          </View>
          {/* Right icon - map */}
          <View style={[ styles.squareButtons,
              { backgroundColor: isShowMap ? colors.primary500 : colors.backgroundGrey },
            ]} onTouchStart={() => showMap("map")} >
            <Feather name="map" size={24} color={isShowMap ? colors.white : colors.black} />
          </View>
        </View>
      </View>
      {/* Conditional content */}
      {renderScreen()}
      <View style={[appStyles.buttonContainer, {marginTop: -16}]}>
          <Button
              onPress={() => router.back()}
              style={[appStyles.buttonOutlined, { flex: 1 }]}
              mode="outlined"
              contentStyle={appStyles.buttonRipple}
            >
            {i18n.t("cancel")}
          </Button>
          <Button
              // Validate secret code
              onPress={() => savePlace()}
              style={[appStyles.buttonContained, { flex: 1 }]}
              mode="contained"
              contentStyle={appStyles.buttonRipple}
            >
            {i18n.t("change")}
          </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  squareButtons: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary700,
    marginBottom: 16,
    marginTop: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapViewTypeButton: {
    width: 38,
    height: 38,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    position: "absolute",
    ...Platform.select({
      android: {
        top: 60,
      },
      ios: {
        top: 64,
      },
    }),
    right: 12,
  },
  myLocationViewTypeButton: {
    width: 38,
    height: 38,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    position: "absolute",
    ...Platform.select({
      android: {
        top: 92,
      },
      ios: {
        top: 16,
      },
    }),
    right: 12,
  },
  buttonMapContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  buttonEditMapContainer: {
    backgroundColor: colors.primary500,
    borderRadius: 3,
    width: 60,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  mapAreaContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  mapAreaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary700,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iOSLocationButtonContainer: {
    position: "absolute",
    top: 130,
    right: 20,
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default PlacesAddScreen;
