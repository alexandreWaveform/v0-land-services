import { colors, theme } from "@/src/assets/theme/colors";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    console.log('Root Auth Layout');

    return (
        <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="registration" />
      <Stack.Screen name="password-recover" />
    </Stack>
    );
}

export default RootLayout;
