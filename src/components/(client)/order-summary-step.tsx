import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { OrderData, Service, Supplier } from '../../app/(protected)/client/order-new';
import { styles as globalStyles } from "@/src/assets/styles/appStylesheet";

interface SummaryStepProps {
  orderData: OrderData & {
    selectedSuppliers: { [serviceId: string]: Supplier[] };
    confirmedSuppliers: { [serviceId: string]: string[] };
    supplierNotes: { [serviceId: string]: { [supplierId: string]: string } };
  };
  onToggleConfirm: (serviceId: string, supplierId: string) => void;
  onNoteChange: (serviceId: string, supplierId: string, note: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

const SummaryStep = ({
  orderData,
  onToggleConfirm,
  onNoteChange,
  onSubmit,
  onBack,
}: SummaryStepProps) => {
  const { place, services, selectedSuppliers, confirmedSuppliers, supplierNotes } = orderData;

  return (
    <View style={styles.container}>
      {/* Title with location */}
      <Text style={styles.title}>
        {place?.location ? `Order for ${place.location}` : "Order Summary"}
      </Text>
      <Text style={styles.subtitle}>Review your order details before submitting</Text>
      <ScrollView style={styles.summaryContainer}>
        {/* List by service */}
        {services.map(service => (
          <View key={service.id} style={styles.summarySection}>
            <Text style={styles.sectionTitle}>{service.name}</Text>
            <Text style={styles.itemSubtitle}>{service.description}</Text>
            {/* List suppliers for this service */}
            {(selectedSuppliers[service.id] || []).length > 0 ? (
              selectedSuppliers[service.id].map(supplier => {
                const isConfirmed = confirmedSuppliers[service.id]?.includes(supplier.id);
                const note = supplierNotes[service.id]?.[supplier.id] || "";
                return (
                  <View key={supplier.id} style={styles.supplierRow}>
                    <TouchableOpacity
                      style={styles.checkbox}
                      onPress={() => onToggleConfirm(service.id, supplier.id)}
                    >
                      <MaterialIcons
                        name={isConfirmed ? "check-box" : "check-box-outline-blank"}
                        size={24}
                        color={isConfirmed ? "#4CAF50" : "#888"}
                      />
                    </TouchableOpacity>
                    <View style={styles.supplierInfo}>
                      <Text style={styles.itemTitle}>{supplier.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{supplier.rating}</Text>
                        <MaterialIcons name="star" size={16} color="#FFC107" />
                        <Text style={styles.priceText}>{supplier.price}</Text>
                      </View>
                      <Text style={styles.itemSubtitle}>{supplier.description}</Text>
                      <TextInput
                        style={styles.noteInput}
                        placeholder="Add a note..."
                        value={note}
                        onChangeText={text => onNoteChange(service.id, supplier.id, text)}
                        multiline
                      />
                    </View>
                  </View>
                );
              })
            ) : (
              <Text style={styles.emptyText}>No suppliers selected for this service</Text>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.submitButtonText}>Submit Order</Text>
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
  summaryContainer: {
    flex: 1,
  },
  summarySection: {
    marginBottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333333',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666666',
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
  emptyText: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
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
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supplierRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 6,
  },
  supplierInfo: {
    flex: 1,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    minHeight: 36,
  },
});

export default SummaryStep;