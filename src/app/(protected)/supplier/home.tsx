import React, { useEffect } from "react";
import { View, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { Image } from 'expo-image';
import { Text } from "react-native-paper";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles as appStyles } from "@/src/assets/styles/appStylesheet";
import { colors } from "@/src/assets/theme/colors";
import i18n from "@/src/assets/localization/i18n";

const SupplierHomeScreen = () => {
  useEffect(() => {
        console.log("Supplier Home Screen mounted");
      }, []);
   
  const router = useRouter();
  const badgeCount: number = 33;

  return (
    <View style={appStyles.mainContainer}>
      {/* Header */}
      <View
        style={ appStyles.homeHeader}
      >
        <Text style={[appStyles.homeTitle, { color: colors.secondary700 }]}>{i18n.t("landservices")}</Text>
        <View style={{ position: "absolute", right: 0 }}>
          <MaterialIcons name="notifications-none" size={36} color={colors.secondary700} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} bounces={false} >
        <View style={appStyles.homeSection}>
          <Text style={[appStyles.homeSectionText, { color: colors.secondary700 }]}>{i18n.t("next_service")}</Text>
          <Pressable onPress={() => router.push("/")}>
              <Text style={[appStyles.homeLabelText, { color: colors.secondary700 }]}>{i18n.t("see_all")}</Text>
          </Pressable>
        </View>
        {/* Top Card */}
        <TouchableOpacity
          style={[
            appStyles.homeTopCard,
            appStyles.homeSupplierPrimaryBackground,
          ]}
          activeOpacity={0.8}
          //onPress={() => router.push("/client/home")}
          >
            <View style={{ 
              flexDirection: "row", 
              justifyContent: "space-between", 
              alignItems: "center",
              marginBottom: 8}}>
              <Text style={ appStyles.homeTopCardHeaderText }>25/06/2025</Text>
              <Text style={ appStyles.homeTopCardHeaderText }>16h30</Text>
            </View>
            <Text style={appStyles.homeTopCardTitleText}>Limpeza de terreno</Text>
            <View style={[appStyles.homeTopCardInnerContainer, {marginBottom: 8}]}>
              <Image
                source={require("@images/farmer.png")}
                style={appStyles.cardInnerIcon}
              />      
              <View style={{
                marginLeft: 8
              }}>
                <Text style={{
                  color: colors.white
                }}>Cliente</Text>
                <Text style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Nome de cliente</Text>
              </View>
            </View>
            <View style={appStyles.homeTopCardInnerContainer}>
              <Image
                source={require("@images/location-pin.png")}
                style={appStyles.cardInnerIcon}
              />  
              <View style={{
                marginLeft: 8
              }}>
                <Text style={{
                  color: colors.white
                }}>Localização</Text>
                <Text style={{
                  color: colors.white,
                  fontSize: 16,
                  fontWeight: 'bold'
                }}>Dados de localização</Text>
              </View>
            </View>
        </TouchableOpacity>

        {/* Grid of Cards */}
        <View style={appStyles.homeSection}>  
          <Text style={[appStyles.homeSectionText, { color: colors.secondary700 }]}>{i18n.t("options")}</Text>
        </View>
        <View style={appStyles.homeCardRow}>
          {/* Pedidos Card */}
          <TouchableOpacity
            style={[
              appStyles.homeCard,
              appStyles.homeSupplierPrimaryBackground,
            ]}
            activeOpacity={0.8}
            onPress={() => router.push("/client/orders")}
          >
            {badgeCount > 0 && (
              <View style={appStyles.homeBadge}>
                <Text style={appStyles.homeBadgeText}>{badgeCount}</Text>
              </View>
            )}
            <View>
              <Image
                source={require("@images/requests.png")}
                style={appStyles.homeCardButtonIcon}
              />
            </View>
            <View style={appStyles.homeCardTextContainer}>
              <Text style={appStyles.homeCardText}>{i18n.t("requests")}</Text>
            </View>
          </TouchableOpacity>
          {/* Configurações Card */}
          <TouchableOpacity
            style={[
              appStyles.homeCard,
              appStyles.homeSupplierPrimaryBackground,
            ]}
            activeOpacity={0.8}
            onPress={() => router.push("/supplier/settings")}
          >
            <View>
              <Image
                source={require("@images/settings.png")}
                style={appStyles.homeCardButtonIcon}
              />
            </View>
            <View style={appStyles.homeCardTextContainer}>
              <Text style={appStyles.homeCardText}>{i18n.t("settings")}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={appStyles.homeCardRow}>
          {/* Histórico Card */}
          <TouchableOpacity
            style={[
              appStyles.homeCard,
              appStyles.homeSupplierPrimaryBackground,
            ]}
            activeOpacity={0.8}
          >
            <View>
              <Image
                source={require("@images/history.png")}
                style={appStyles.homeCardButtonIcon}
              />
            </View>
            <View style={appStyles.homeCardTextContainer}>
              <Text style={appStyles.homeCardText}>{i18n.t("history")}</Text>
            </View>
          </TouchableOpacity>
          {/* Perfil Card */}
          <TouchableOpacity
            style={[
              appStyles.homeCard,
              appStyles.homeSupplierPrimaryBackground,
            ]}
            activeOpacity={0.8}
          >
            <View>
              <Image
                source={require("@images/profile.png")}
                style={appStyles.homeCardButtonIcon}
              />
            </View>
            <View style={appStyles.homeCardTextContainer}>
              <Text style={appStyles.homeCardText}>{i18n.t("profile")}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SupplierHomeScreen;