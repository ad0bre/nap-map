import React, { useContext } from "react";
import { 
  StyleSheet, 
  View, 
  Text, 
  Dimensions, 
  TouchableOpacity,
} from "react-native";
import SleepEntryModal from "./components/SleepEntryModal";
import { AppContext } from "./context/AppContext";
import EntriesList from "./components/EntriesList";
import ChartArea from "./components/ChartArea";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { user } = useContext(AppContext);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
        <View style={styles.container_outer}>
          <ChartArea />
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

// Screen Dimensions
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  
  container_outer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-evenly"
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
