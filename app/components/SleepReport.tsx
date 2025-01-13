import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import SleepEntry from "../types/sleepEntry";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./../../firebaseConfig";

const SleepReport = ({
    visible,
    entry,
    onClose,
  }: {
    visible: boolean;
    onClose: () => void;
    entry: SleepEntry | null;
  }) => {
    const getTimeFromDates = (entry: SleepEntry | null) => {
        if (!entry) return "No data";

        const { dateStart, dateEnd } = entry;
      
        if (!dateStart || !dateEnd) return "Invalid dates";
      
        // Calculate the difference in milliseconds
        const diffMs = dateEnd.getTime() - dateStart.getTime();
      
        // Convert milliseconds to hours
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
        return `${hours}h ${minutes}m`;
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Sleep report</Text>
                    <Text style={styles.modalText}>
                        In the night of {entry?.dateStart.toLocaleDateString()}, you have slept{" "}
                        {getTimeFromDates(entry)} and woke up feeling {entry?.status}.
                    </Text>
                    <Text style={styles.modalText}>
                        Your dream: {entry?.dreamSummary || "No details provided."}
                    </Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SleepReport;

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: "#d1a6e1",
      padding: 24,
      borderRadius: 16,
      width: "80%",
      alignItems: "center",
      elevation: 5,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginBottom: 16,
    },
    modalText: {
      fontSize: 16,
      color: "white",
      marginBottom: 8,
      textAlign: "center",
    },
    closeButton: {
      marginTop: 16,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: "#502274",
      borderRadius: 8,
    },
    closeButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });