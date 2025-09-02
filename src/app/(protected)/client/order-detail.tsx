import { View, StyleSheet } from "react-native";
import { colors } from "@/src/assets/theme/colors";
import { Text } from "react-native-paper";

const OrderDetailScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGrey,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.primary700,
    }
});

export default OrderDetailScreen;