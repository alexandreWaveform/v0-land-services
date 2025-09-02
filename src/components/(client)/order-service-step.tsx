import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ListRenderItemInfo } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Service } from '../../app/(protected)/client/order-new'; // Adjust the import path as necessary
import { styles as globalStyles } from '@/src/assets/styles/appStylesheet';

interface ServiceStepProps {
  selectedServices: Service[];
  onSelectService: (service: Service) => void;
  onNext: () => void;
  onBack: () => void;
}

const ServiceStep = ({ 
  selectedServices, 
  onSelectService, 
  onNext, onBack }: ServiceStepProps) => {

  const services: Service[] = [
    { 
      id: '1', 
      name: 'Cleaning Service', 
      description: 'Professional cleaning for your space',
      icon: 'cleaning-services'
    },
    { 
      id: '2', 
      name: 'Maintenance', 
      description: 'Regular maintenance and repairs',
      icon: 'build'
    },
    { 
      id: '3', 
      name: 'Security', 
      description: 'Security services and monitoring',
      icon: 'security'
    },
    { 
      id: '4', 
      name: 'IT Support', 
      description: 'Technical support and IT services',
      icon: 'computer'
    },
  ];

  const renderServiceItem = ({ item }: ListRenderItemInfo<Service>): React.ReactElement => {
    const isSelected = selectedServices.some(s => s.id === item.id);
    
    return (
      <TouchableOpacity
        style={[styles.serviceItem, isSelected && styles.selectedItem]}
        onPress={() => onSelectService(item)}
      >
        <MaterialIcons name="check-circle" size={32} color="#555" style={styles.serviceIcon} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceDescription}>{item.description}</Text>
        </View>
        {isSelected && (
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Choose Service</Text>
      <Text style={styles.subtitle}>Select the service you need</Text>
      
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
      
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.nextButton, selectedServices.length === 0 && styles.disabledButton]}
          onPress={onNext}
          disabled={selectedServices.length === 0}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 24,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  serviceIcon: {
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666666',
  },
  backButton: {
    backgroundColor: '#EEEEEE',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
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

export default ServiceStep;