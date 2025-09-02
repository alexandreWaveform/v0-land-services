import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OrderItem from "@/src/components/(client)/order-item";
import { Text } from "react-native-paper";
import { styles as globalStyles } from "@/src/assets/styles/appStylesheet";
import i18n from "@/src/assets/localization/i18n";
import { colors } from "@/src/assets/theme/colors";
import { RequestStatusType } from "@enums/request-status-type";
import { Order } from "@/src/types/order";
import { useRouter } from "expo-router";

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    location: "Couto dos mouros",
    area: "9000 m²",
    serviceType: "Terraplanagem",
    supplier: "Nome do Fornecedor",
    dateTime: "16h30",
    date: "25/06/2025",
    status: RequestStatusType.Rejected,
    hasMap: true,
  },
  {
    id: "2",
    location: "Couto dos mouros",
    area: "9000 m²",
    serviceType: "Preparação de terreno",
    supplier: "Nome do Fornecedor",
    dateTime: "16h30",
    date: "25/06/2025",
    status: RequestStatusType.Execution,
    hasMap: false,
  },
  {
    id: "3",
    location: "Couto dos mouros",
    area: "9000 m²",
    serviceType: "Aplicação de Calcário",
    supplier: "Nome do Fornecedor",
    dateTime: "16h30",
    date: "25/06/2025",
    status: RequestStatusType.Negotiation,
    hasMap: false,
  },
  {
    id: "4",
    location: "Couto dos mouros",
    area: "9000 m²",
    serviceType: "Lavrar",
    supplier: "Nome do Fornecedor",
    dateTime: "16h30",
    date: "25/06/2025",
    status: RequestStatusType.Completed,
    hasMap: true,
  },
];

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<RequestStatusType>(
    RequestStatusType.All
  );
  const router = useRouter();

  const renderTab = (title: string, tabName: RequestStatusType) => {
    return (
      <TouchableOpacity
        style={[styles.tab, activeTab === tabName && styles.activeTab]}
        onPress={() => setActiveTab(tabName)}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === tabName && styles.activeTabText,
          ]}
        >
          {title}
        </Text>
        {activeTab === tabName && <View style={styles.activeTabIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={globalStyles.whiteBackgroundScreen}>
        {/* Title and Add Button */}
        <View style={globalStyles.clientTitleContainer}>
          <Text style={globalStyles.clientTitle}>{i18n.t("requests")}</Text>
          <TouchableOpacity
            style={globalStyles.requestAddButton}
            activeOpacity={0.8}
            onPress={() => router.push("/client/order-new")}
          >
            <Ionicons name="add" size={24} color={colors.primary500} />
            <Text style={globalStyles.requestAddButtonText}>
              {i18n.t("add")}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {renderTab(i18n.t("all"), RequestStatusType.All)}
          {renderTab(i18n.t("negotiation"), RequestStatusType.Negotiation)}
          {renderTab(i18n.t("execution"), RequestStatusType.Execution)}
          {renderTab(i18n.t("rejected"), RequestStatusType.Rejected)}
        </View>
        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === RequestStatusType.All && (
            <FlatList
              data={MOCK_ORDERS}
              renderItem={({ item }) => 
                <TouchableOpacity onPress={() => {
                  console.log(item.id);
                  //router.push(`/order-detail/${item.id}`);
                }}>
                  <OrderItem order={item} />
                </TouchableOpacity>
              }
              keyExtractor={(item) => item.id}
              style={{ width: "100%", paddingHorizontal: 8 }}
            />
          )}
          {activeTab === RequestStatusType.Negotiation && (
            <View style={{ width: "100%", paddingHorizontal: 8 }}>
              <OrderItem order={MOCK_ORDERS[3]} />
            </View>
          )}
          {activeTab === RequestStatusType.Execution && (
            <View style={{ width: "100%", paddingHorizontal: 8 }}>
              <OrderItem order={MOCK_ORDERS[1]} />
            </View>
          )}
          {activeTab === RequestStatusType.Rejected && (
            <View style={{ width: "100%", paddingHorizontal: 8 }}>
              <OrderItem order={MOCK_ORDERS[0]} />
            </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLightGrey,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    position: "relative",
  },
  activeTab: {
    borderBottomColor: colors.primary500,
  },
  tabText: {
    color: colors.primary300,
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary500,
    fontWeight: "bold",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "80%",
    backgroundColor: colors.primary500,
  },
  tabContent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
});

export default OrdersScreen;