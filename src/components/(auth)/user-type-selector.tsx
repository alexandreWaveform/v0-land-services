import { View, StyleSheet } from 'react-native';
import { UserType } from '@/src/models/User';
import i18n from "@/src/assets/localization/i18n";
import { Text, Button } from 'react-native-paper';
import { colors } from '@/src/assets/theme/colors';
import { styles as globalStyles } from "@/src/assets/styles/appStylesheet";

const UserTypeSelector = ({ selectedType, onSelectType }: { selectedType: UserType | null; onSelectType: (type: UserType) => void }) => {

  return (
    <>
      <Text style={styles.title}>{i18n.t("user_type_description")}</Text>
      <View style={styles.selectorContainer}>
        <Button
          onPress={() => onSelectType(UserType.Client)}
          style={[globalStyles.buttonOption, { flex: 1 }, 
                  selectedType === UserType.Client && {borderWidth: 1 ,borderColor: colors.primary700}]}
          mode="outlined"
          contentStyle={[globalStyles.buttonOptionRipple, 
                        selectedType === UserType.Client && globalStyles.buttonSelectedOption
                        ]}
          textColor={selectedType === UserType.Client ? colors.primary700 : undefined}
          icon={selectedType === UserType.Client ? "check" : undefined}
        >
          {i18n.t("client")}
        </Button>

        <Button
          onPress={() => onSelectType(UserType.Supplier)}
          style={[globalStyles.buttonOption, { flex: 1 }, ,
                  selectedType === UserType.Supplier && {borderWidth: 1 ,borderColor: colors.primary700}]}
          mode="outlined"
          contentStyle={[globalStyles.buttonOptionRipple, 
                        selectedType === UserType.Supplier && globalStyles.buttonSelectedOption
                        ]}
          textColor={selectedType === UserType.Supplier ? colors.primary700 : undefined}
          icon={selectedType === UserType.Supplier ? "check" : undefined}
        >
          {i18n.t("supplier")}
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginBottom: 12,
    color: colors.primary700
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: 8
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    //marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#E6F2FF',
  },
  optionText: {
    fontSize: 14,
  },
  checkmark: {
    marginLeft: 6,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default UserTypeSelector;