import { colors, theme } from "@/src/assets/theme/colors";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

const Layout = () => {
    console.log('Supplier Layout');
    // This is the root layout for the app
    // It will be used to define the navigation structure
    return (
        <PaperProvider theme={theme}>
            <Stack>
                <Stack.Screen name="home" options={{
                    header: () => null
                }}/>
            </Stack>
        </PaperProvider>
    );
}

export default Layout;
