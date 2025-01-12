import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "./components/AppLoading";
import { router } from "expo-router";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>nap-map</Text>
      <Text style={styles.subtitle}>Sleep better. Dream better.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/LoginPage")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/SignUpPage")}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupBold}>Sign In.</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B49FCC",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 64,
    fontFamily: "RobotoBold",
    color: "#FFFFFF",
    marginBottom: 10,
    marginTop: 200
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#FFFFFF",
    marginBottom: 190, // Increased spacing below subtitle
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20, // Space below the Login button
  },
  buttonText: {
    color: "#533A71",
    fontSize: 20,
    fontFamily: "RobotoBold",
  },
  signupText: {
    fontSize: 16,
    color: "#533A71",
    fontFamily: "Roboto",
  },
  signupBold: {
    fontFamily: "RobotoBold",
  },
});
