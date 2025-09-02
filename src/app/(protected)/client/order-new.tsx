import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import PlaceStep from '../../../components/(client)/order-place-step';
import ServiceStep from '../../../components/(client)/order-service-step';
import SupplierStep from '../../../components/(client)/order-supplier-step';
import SummaryStep from '../../../components/(client)/order-summary-step';
import ProgressBar from '../../../components/(client)/progress-bar';
import { colors } from '@/src/assets/theme/colors';
import { Place } from "../../../types/place";
import i18n from '@/src/assets/localization/i18n';

// Define interfaces for our data types
export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Supplier {
  id: string;
  name: string;
  rating: number;
  price: string;
  description: string;
}

export interface OrderData {
  place: Place | null;
  services: Service[];
  supplier: Supplier | null;
}

const NewOrderSreen = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [orderData, setOrderData] = useState<OrderData>({
    place: null,
    services: [],
    supplier: null,
  });

  // Multiple suppliers per service
  const [selectedSuppliers, setSelectedSuppliers] = useState<{ [serviceId: string]: Supplier[] }>({});
  // Confirmed suppliers per service (array of supplier ids)
  const [confirmedSuppliers, setConfirmedSuppliers] = useState<{ [serviceId: string]: string[] }>({});
  // Notes per supplier per service
  const [supplierNotes, setSupplierNotes] = useState<{ [serviceId: string]: { [supplierId: string]: string } }>({});

  const updateOrderData = <K extends keyof OrderData>(key: K, value: OrderData[K]): void => {
    console.log(`Updating ${key} to`, value);
    setOrderData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const nextStep = () => {
    console.log('next step');
    setCurrentStep(prevStep => Math.min(prevStep + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const handleSelectService = (service: Service) => {
    setOrderData(prev => {
      const alreadySelected = prev.services.some(s => s.id === service.id);
      return {
        ...prev,
        services: alreadySelected
          ? prev.services.filter(s => s.id !== service.id) // remove if already selected
          : [...prev.services, service], // add if not selected
      };
    });
  };

  const handleSelectSupplier = (supplier: Supplier, service: Service) => {
    setSelectedSuppliers(prev => {
      const current = prev[service.id] || [];
      const alreadySelected = current.some(s => s.id === supplier.id);
      return {
        ...prev,
        [service.id]: alreadySelected
          ? current.filter(s => s.id !== supplier.id) // remove if already selected
          : [...current, supplier], // add if not selected
      };
    });
  };

  const handleToggleConfirm = (serviceId: string, supplierId: string) => {
    setConfirmedSuppliers(prev => {
      const current = prev[serviceId] || [];
      const alreadyConfirmed = current.includes(supplierId);
      return {
        ...prev,
        [serviceId]: alreadyConfirmed
          ? current.filter(id => id !== supplierId)
          : [...current, supplierId],
      };
    });
  };

  const handleNoteChange = (serviceId: string, supplierId: string, note: string) => {
    setSupplierNotes(prev => ({
      ...prev,
      [serviceId]: {
        ...(prev[serviceId] || {}),
        [supplierId]: note,
      },
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PlaceStep 
            selectedPlace={orderData.place}
            onSelectPlace={(place) => updateOrderData('place', place)}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ServiceStep 
            selectedServices={orderData.services}
            onSelectService={handleSelectService}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <SupplierStep 
            selectedSuppliers={selectedSuppliers}
            selectedServices={orderData.services}
            onSelectSupplier={handleSelectSupplier}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <SummaryStep 
            orderData={{
              ...orderData,
              selectedSuppliers,
              confirmedSuppliers,
              supplierNotes,
            }}
            onToggleConfirm={handleToggleConfirm}
            onNoteChange={handleNoteChange}
            onSubmit={() => console.log('Order submitted:', {
              ...orderData,
              selectedSuppliers,
              confirmedSuppliers,
              supplierNotes,
            })}
            onBack={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('new_quote_request')}</Text>
      </View>
      <View>
        <ProgressBar currentStep={currentStep} totalSteps={4}/>
      </View>
      <View style={styles.content}>
        {renderStep()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    padding: 16,
    backgroundColor: colors.white,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary700,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default NewOrderSreen;