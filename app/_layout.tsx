import { Stack } from "expo-router";
import { AppContextProvider } from "./context/AppContext";

export default function RootLayout() {
  return (
  <AppContextProvider>
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="LoginPage" options={{headerShown: false}}/>
      <Stack.Screen name="SignUpPage" options={{headerShown: false}}/>
      <Stack.Screen name="HomeScreen" options={{headerShown: false, navigationBarHidden: true}}/>
    </Stack>;
  </AppContextProvider>
  );
}
