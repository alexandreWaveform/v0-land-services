import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../assets/theme/colors";
import { Image } from "expo-image";
import { RequestStatusType } from "@enums/request-status-type";
import { Order } from "../../types/order";
import { Text } from "react-native-paper";
import i18n from "../../assets/localization/i18n";

interface OrderItemProps {
  order: Order;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{order.location}</Text>

        {order.status === RequestStatusType.Negotiation && (
          <Image
            source={require("@images/requests.png")}
            style={{ width: 24, height: 24, tintColor: colors.secondary500 }}
          />
        )}
        {order.status === RequestStatusType.Execution && (
          <Image
            source={require("@images/history.png")}
            style={{ width: 24, height: 24, tintColor: colors.green }}
          />
        )}
        {order.status === RequestStatusType.Rejected && (
          <Feather name="x-circle" size={28} color={colors.red} />
        )}
      </View>
      {/* Location and Area */}
      <View style={styles.infoRow}>
        <View style={styles.areaContainer}>
          <Image
            source={require("@images/area.png")}
            style={{ width: 24, height: 24, tintColor: colors.black }}
          />
          <Text style={styles.areaInfoText}>{order.area}</Text>
        </View>
        
        {order.hasMap &&(
          <View style={{ flexDirection: "row"}}>
            <Feather name="map" size={24} color={colors.green} />
            <Text style={styles.areaInfoText}>{i18n.t("map")}</Text>
          </View>
          )
        }
      </View>

      {/* Service Type and Date */}
      <View style={styles.serviceContainer}>
        <Text style={styles.serviceTypeText}>{order.serviceType}</Text>
        <Text style={styles.dateTimeText}>
          {order.dateTime}
          {"\n"}
          {order.date}
        </Text>
      </View>

      {/* Supplier */}
      <Text style={styles.supplierText}>{order.supplier}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLightGrey,
    width: "100%",
    alignSelf: "stretch",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    height: 48,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: -16,
    marginHorizontal: -16,
    backgroundColor: "#F3F3F3",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  areaText: {
    fontSize: 14,
    color: "#333",
    marginRight: 8,
  },
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 8,
    paddingBottom: 8
  },
  serviceTypeText: {
    fontSize: 16,
    fontWeight: "500"
  },
  dateTimeText: {
    fontSize: 14,
    textAlign: "right"
  },
  supplierText: {
    fontSize: 14
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLightGrey,
  },
  areaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  areaInfoText: {
    fontSize: 18,
    marginLeft: 8,
  }
});

export default OrderItem;