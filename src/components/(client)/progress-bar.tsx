import { colors } from '@/src/assets/theme/colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps ) => {
  const renderSteps = () => {
    const steps = [];
    
    for (let i = 1; i <= totalSteps; i++) {
      const isActive = i <= currentStep;
      const isLast = i === totalSteps;
      
      steps.push(
        <View key={`step-${i}`} style={styles.stepContainer}>
          <View style={[styles.stepCircle, isActive && styles.activeStepCircle]}>
            <Text style={[styles.stepNumber, isActive && styles.activeStepNumber]}>
              {i}
            </Text>
          </View>
          
          {!isLast && (
            <View style={styles.stepLineContainer}>
              <View style={[styles.stepLine, isActive && i < currentStep && styles.activeStepLine]} />
            </View>
          )}
        </View>
      );
    }
    return steps;
  };

  return (
    <View style={styles.progressContainer}>
      {renderSteps()}
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the progress bar horizontally
    alignItems: 'center', // Center the progress bar vertically
    paddingHorizontal: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.backgroundGrey,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  activeStepCircle: {
    backgroundColor: colors.primary500,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
  },
  activeStepNumber: {
    color: colors.white,
  },
  stepLineContainer: {
    height: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepLine: {
    height: 2,
    width: 60, // Adjust the width to match the gap between circles
    backgroundColor: colors.backgroundGrey,
  },
  activeStepLine: {
    backgroundColor: colors.primary500,
  },
});


export default ProgressBar;