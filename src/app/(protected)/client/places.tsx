import { View, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text } from "react-native-paper";
import { styles as appStyles } from "@/src/assets/styles/appStylesheet";
import i18n from "@/src/assets/localization/i18n";
import { useRouter } from "expo-router";
import { Place } from "@/src/types/place";
import PlaceItem from "@/src/components/(client)/place-item";

const MOCK_PLACES: Place[] = [
  {
    id: "1",
    location: "Couto dos mouros",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: true,
  },
  {
    id: "2",
    location: "Roça dos Bois",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: true,
  },
  {
    id: "3",
    location: "Couto dos mouros",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: false,
  },
  {
    id: "4",
    location: "Couto dos mouros",
    area: "9000 m²",
    gps: ["-12.9949494", "8.23423424"],
    hasMap: true,
  },
];

const PlacesScreen = () => {
  const router = useRouter();

  return (
    <View style={appStyles.mainContainer}>
      <TouchableOpacity onPress={() => router.replace("/client/home")}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      {/* Title and Add Button */}
      <View style={appStyles.screenTitleContainer}>
        <Text style={appStyles.clientMainTitle}>{i18n.t("places")}</Text>
        <Button icon="plus-circle-outline" mode="contained" onPress={() => router.push("/client/places-add")}>
          {i18n.t("add")}
        </Button>
      </View>
      <View style={[appStyles.scrollContent, {  paddingBottom: 32, flex: 1 }]}>
        <FlatList
          data={MOCK_PLACES}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(item.id)}>
              <PlaceItem place={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
}

export default PlacesScreen; 