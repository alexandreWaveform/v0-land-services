import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/theme/colors";
import { Image } from "expo-image";
import { RequestStatusType } from "@enums/request-status-type";
import { Order } from "../../types/order";
import { Text } from "react-native-paper";
import i18n from "../../assets/localization/i18n";
import { Place } from "../../types/place";

interface PlaceItemProps {
  place: Place;
  isSelected?: boolean; // Changed from boolean<false> to boolean
}

const PlaceItem = ({ place, isSelected = false  }: PlaceItemProps) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <View style={[styles.container, isSelected && styles.selectedItem]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{place.location}</Text>
      </View>
      {/* Location and Area */}
      <View style={styles.infoRow}>
        <View style={styles.areaContainer}>
          <Image
            source={require("@images/area.png")}
            style={{ width: 24, height: 24, tintColor: colors.black }}
          />
          <Text style={styles.infoText}>{place.area}</Text>
        </View>
        
        {place.hasMap &&(
          <View style={styles.areaContainer}>
            <Feather name="map" size={24} color={colors.green} />
            <Text style={[styles.infoText, { color: colors.green }]}>{i18n.t("map")}</Text>
          </View>
          )
        }
      </View>

      {/* Service Type and Date */}
      <View style={styles.infoRow}>
        <View style={{flexDirection: "row", gap: 8}}>
            <Text style={styles.infoText}>ID</Text>
            <Text style={styles.infoText}>{place.id}</Text>
        </View>
        <View style={{flexDirection: "row", gap: 8, alignItems: "center"}}>
            <Feather name="map-pin" size={24}/>
            <View style={{flexDirection: "column", alignItems:"flex-end"}}>
                <Text style={styles.infoText}>{place.gps[0]}</Text>
                <Text style={styles.infoText}>{place.gps[1]}</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLightGrey,
    width: "100%",
    alignSelf: "stretch",
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: colors.primary500,
    borderRadius: 8,
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
    backgroundColor: colors.backgroundGrey,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 12,
  },
  infoText: {
    fontSize: 18
  },
  areaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});

export default PlaceItem;