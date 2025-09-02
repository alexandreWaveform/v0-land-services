import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import { colors } from '@/src/assets/theme/colors';
import { Place } from '@/src/types/place';
import i18n from '@/src/assets/localization/i18n';
import PlaceItem from './place-item';
import { styles as globalStyles } from "@/src/assets/styles/appStylesheet";
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface PlaceStepProps {
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  onNext: () => void;
}

const MOCK_PLACES: Place[] = [
  {
    id: "1",
    location: "Couto dos mouros",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: true,
  },
  {
    id: "2",
    location: "Roça dos Bois",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: true,
  },
  {
    id: "3",
    location: "Couto dos mouros",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: false,
  },
  {
    id: "4",
    location: "Couto dos mouros",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: true,
  },
];

const PlaceStep = ({ selectedPlace, onSelectPlace, onNext }: PlaceStepProps) => {
    const router = useRouter();

  const renderPlaceItem = ({ item }: ListRenderItemInfo<Place>) => {
    const isSelected = selectedPlace?.id === item.id;
    
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item.id);
          onSelectPlace(item);
          }}
        >
        <PlaceItem place={item} isSelected={isSelected} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('choose_place')}</Text>
      <Text style={styles.subtitle}>{i18n.t('choose_place_text')}</Text>      
      <FlatList
        data={MOCK_PLACES}
        renderItem={renderPlaceItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      /> 
      
      <View style={globalStyles.buttonContainer}>
          <Button
              onPress={() => router.back()}
              style={[globalStyles.buttonContained, { flex: 1 }, !selectedPlace && styles.disabledButton]}
              mode="outlined"
              contentStyle={globalStyles.buttonRipple}
          >
          {i18n.t("cancel")}
          </Button>
          <Button
              // Validate secret code
              onPress={onNext}
              style={[globalStyles.buttonContained, { flex: 1 }]}
              mode="contained"
              contentStyle={globalStyles.buttonRipple}
              disabled={!selectedPlace}
          >
              {i18n.t("next")}
          </Button>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: colors.primary700,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary700,
    marginBottom: 24,
  },
  list: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlaceStep;