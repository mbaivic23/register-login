import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
export default function RootLayout() {
  return (
    <>
      <StatusBar />
      <Stack>
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
