import React from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, ListRenderItemInfo, SectionListData } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Service, Supplier } from '../../app/(protected)/client/order-new';
import { styles as globalStyles } from "@/src/assets/styles/appStylesheet";

interface SupplierStepProps {
  selectedSuppliers: { [serviceId: string]: Supplier[] }; // <-- now array
  selectedServices: Service[];
  onSelectSupplier: (supplier: Supplier, service: Service) => void;
  onNext: () => void;
  onBack: () => void;
}

const getSuppliersForService = (service: Service): Supplier[] => [
  { id: '1', name: 'Premium Services Inc.', rating: 4.8, price: '$$', description: 'Top-rated service provider with 10+ years of experience' },
  { id: '2', name: 'Quick Solutions', rating: 4.5, price: '$', description: 'Affordable and efficient services with quick response time' },
  { id: '3', name: 'Expert Group', rating: 4.7, price: '$$$', description: 'Premium quality service with certified professionals' },
  { id: '4', name: 'Local Pros', rating: 4.6, price: '$$', description: 'Local service provider with excellent customer satisfaction' },
];

const SupplierStep: React.FC<SupplierStepProps> = ({
  selectedSuppliers,
  selectedServices,
  onSelectSupplier,
  onNext,
  onBack,
}) => {
  const sections = selectedServices.map(service => ({
    title: service.name,
    data: getSuppliersForService(service),
    service,
  }));

  const renderSupplierItem = ({
    item,
    section,
  }: {
    item: Supplier;
    section: { service: Service };
  }) => {
    // Check if this supplier is selected for this service
    const isSelected = selectedSuppliers[section.service.id]?.some(s => s.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.supplierItem, isSelected && styles.selectedItem]}
        onPress={() => onSelectSupplier(item, section.service)}
      >
        <View style={styles.supplierInfo}>
          <Text style={styles.supplierName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating}</Text>
            <MaterialIcons name="star" size={16} color="#FFC107" />
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <Text style={styles.supplierDescription}>{item.description}</Text>
        </View>
        {isSelected && (
          <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section }: { section: SectionListData<Supplier, { title: string; service: Service }> }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  // Enable "Next" only if every service has at least one supplier selected
  const allServicesHaveSuppliers = selectedServices.every(
    s => selectedSuppliers[s.id] && selectedSuppliers[s.id].length > 0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 3: Choose Supplier(s)</Text>
      <Text style={styles.subtitle}>
        Select one or more suppliers for each service
      </Text>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderSupplierItem}
        renderSectionHeader={renderSectionHeader}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
      />

      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.nextButton,
            !allServicesHaveSuppliers && styles.disabledButton
          ]}
          onPress={onNext}
          disabled={!allServicesHaveSuppliers}
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
  supplierItem: {
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
  supplierInfo: {
    flex: 1,
  },
  supplierName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  priceText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  supplierDescription: {
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
  sectionHeader: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 16,
    marginBottom: 4,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SupplierStep;