import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { auth } from "./../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { AppContext } from "./context/AppContext";
import AppLoading from "./components/AppLoading";

export default function LoginPage() {
  const { setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (<AppLoading />);
  }

  const handleLogin = async () => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    router.replace("/HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to nap-map</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#533A71"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder=""
          placeholderTextColor="#533A71"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    fontFamily: "RobotoBold",
    color: "#FFFFFF",
    marginBottom: 30,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    color: "#533A71",
    fontFamily: "Roboto",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#533A71",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#533A71",
    fontFamily: "Roboto",
  },
  button: {
    backgroundColor: "#B49FCC",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#533A71",
    fontFamily: "RobotoBold",
  },
});
