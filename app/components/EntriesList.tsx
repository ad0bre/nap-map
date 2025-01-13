import { 
    StyleSheet, 
    View, 
    Text,
    FlatList,
} from "react-native";
import SleepEntry from "../types/sleepEntry";
import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../firebaseConfig";
import { User } from "firebase/auth";

export default function EntriesList({
    user,
} : {
    user: User | null;
}) {
    const { sleepEntries, setSleepEntries } = useContext(AppContext);  
    const fetchSleepEntries = async () => {
    if (!user?.uid) return;
    const entriesRef = collection(db, "sleepEntries");
    const entriesQuery = query(entriesRef, where("userId", "==", user.uid));

    const snapshot = await getDocs(entriesQuery);

    const entries = snapshot.docs.map((doc) => {
      const data = doc.data();
        return {
            id: doc.id,
            dateStart: data.dateStart.toDate(),
            dateEnd: data.dateEnd.toDate(),
            status: data.status,
            dreamSummary: data.dreamSummary,
            } as SleepEntry
        });
        setSleepEntries(entries);
    };

    React.useEffect(() => {
        fetchSleepEntries();
        const interval = setInterval(fetchSleepEntries, 5000);
        return () => clearInterval(interval);
    }, [user?.uid]);
    
    function getTimeFromDates(item: SleepEntry): string {
        const diff = item.dateEnd.getTime() - item.dateStart.getTime();
        const hours = Math.floor(diff / 1000 / 60 / 60);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        return `${hours} hours, ${minutes} minutes`;
    }
      
    return sleepEntries.length === 0 ? (
        <View style={styles.emptyContainer}>
            <View style={styles.card}>
                <Text style={styles.cardText}>
                    Add a new entry to display previous sleep experiences.
                </Text>
            </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={sleepEntries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.sleepEntry}>
                <Text style={styles.entryText}>
                  {item.dateStart.toDateString()}
                </Text>
                <Text style={styles.entryText}>{getTimeFromDates(item)}</Text>
                <Text style={styles.entryText}>{item.status}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1, // Takes up the entire screen
        justifyContent: "flex-start", // Centers the content vertically
        alignItems: "center", // Centers the content horizontally
        backgroundColor: "#FFFFFF", // Match the app's background color
      },
    listContainer: {
      flex: 1, // Takes up all available vertical space
      width: "100%", // Ensures full width
      backgroundColor: "#FFFFFF", // Background for the entire list container
      borderRadius: 15,
      paddingVertical: 10,
      alignItems: "center",
      marginTop: 10,
    },
    sleepEntry: {
      width: "95%", // Makes sure it stays within the container
      backgroundColor: "#D0A6E1", // Background for each entry
      borderRadius: 10,
      padding: 15,
      marginVertical: 5, // Spacing between entries
      alignSelf: "center", // Ensures it centers horizontally
      elevation: 3, // Adds a subtle shadow on Android
      shadowColor: "#000", // Shadow for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    entryText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#FFFFFF",
      textAlign: "left", // Aligns text to the left
    },
    card: {
      backgroundColor: "#FFFFFF",
      width: "90%",
      height: 250,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      alignSelf: "center",
    },
    cardText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#2B3A67",
      textAlign: "center",
    },
    listContent: {
      paddingBottom: 20, // Adds space at the bottom of the list
    },
  });