import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { theme } from "@/src/assets/theme/colors";

export default function RootLayout() {
    console.log("Root Layout");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    console.log("Auth State:", { isAuthenticated, loading });

    /*  useEffect(() => {
        const checkAuth = async () => {
        // TODO: Replace with real auth check
        await new Promise((r) => setTimeout(r, 500));
        setIsAuthenticated(false); // <— simulate "logged out"
        setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return null; // TODO: replace with splash screen
    } */

    return (
        <PaperProvider theme={theme}>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
            <Stack.Screen name="(protected)" />
            ) : (
            <Stack.Screen name="(auth)" />
            )}
        </Stack>
        </PaperProvider>
    );
}
