import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

const AppLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.loadingText}>Loading . . .</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B49FCC",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default AppLoading;
