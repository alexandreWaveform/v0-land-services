import i18n from "@/src/assets/localization/i18n";
import { colors, theme } from "@/src/assets/theme/colors";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const Layout = () => {
    console.log('Client Layout');
    // This is the root layout for the app
    // It will be used to define the navigation structure
    return (
        <PaperProvider theme={theme}>
            <Stack>
                <Stack.Screen name="home" options={{
                    header: () => null,
                }}/>
                <Stack.Screen name="places" options={{
                    header: () => null,
                }}/>
                <Stack.Screen name="places-add" options={{
                    header: () => null,
                }}/>
                <Stack.Screen name="orders" options={{
                    title: i18n.t("requests"),
                    headerTintColor: colors.white,
                    headerTitleAlign: 'center',
                    headerStyle: { 
                        backgroundColor: colors.primary500
                    }
                }}/>
            </Stack>
        </PaperProvider>
    );
}

export default Layout;
