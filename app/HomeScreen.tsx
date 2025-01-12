import React, { useContext } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "./../firebaseConfig";
import { doc, setDoc, addDoc, collection, getDocs, where, query } from "firebase/firestore";
import SleepEntryModal from "./components/SleepEntryModal";
import SleepEntry from "./types/sleepEntry";
import { AppContext } from "./context/AppContext";
import { router } from "expo-router";
import EntriesList from "./components/EntriesList";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { user } = useContext(AppContext);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  function extractFirstName(email: string | null | undefined): string {
    if (email == null || email == undefined || !email.includes("@")) return "";
    const localPart = email.split("@")[0];
    const firstName = localPart.split(".")[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  return (
        <View style={styles.container_outer}>
        <View style={styles.container_inner}>
          <Text style={styles.welcomeText}>
            Welcome back, <Text style={styles.userName}>{extractFirstName(user?.email)}</Text>
          </Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>No data to show you now . . .</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <EntriesList user={user}/>
        <TouchableOpacity 
          style={styles.fab}
          onPress={toggleModal}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
        <SleepEntryModal 
          isVisible={modalVisible} 
          toggleModal={toggleModal} 
          userId={user?.uid}/>
      </View>
  );
};

// Convert height to rem (1rem = 16px)
const remToPixels = (rem: number) => rem * 16;

// Screen Dimensions
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container_inner: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container_outer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#502274", // Matches purple color
    marginTop: 80,
  },
  userName: {
    color: "#502274",
    fontWeight: "900",
  },
  card: {
    backgroundColor: "#D0A6E1",
    width: width * 0.9,
    height: remToPixels(15.625), // 250px in rems
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  horizontalLine: {
    width: width * 0.8,
    height: 1,
    backgroundColor: "#C4C4C4"
  },
  addEntryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#502274",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: "#D0A6E1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  fabText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  listContent: {
    paddingVertical: 20,
  },
  sleepEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#D0A6E1",
    borderRadius: 10,
  },
  entryText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
});

export default HomeScreen;
