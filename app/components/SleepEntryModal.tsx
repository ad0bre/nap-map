import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { addDoc, collection} from "firebase/firestore";
import { db } from "./../../firebaseConfig";

const SleepEntryModal = ({
  isVisible,
  toggleModal,
  userId,
}: {
  isVisible: boolean;
  toggleModal: () => void;
  userId: string | undefined;
}) => {
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [status, setStatus] = useState("Rested");
  const [dreamSummary, setDreamSummary] = useState("");
  const [activePicker, setActivePicker] = useState<string | null>(null);

  const openPicker = (picker: string) => {
    setActivePicker((prev) => (prev === picker ? null : picker)); // Toggle the picker
  };

  const handleSubmit = () => {
    const sleepEntry = {
      dateStart,
      dateEnd,
      status,
      dreamSummary,
      userId,
    };
    console.log(sleepEntry);
    addDoc(collection(db, "sleepEntries"), sleepEntry);
    toggleModal();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>How was your sleep?</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => openPicker("dateStart")}>
              <Text style={styles.label}>Start Date: </Text>
            </TouchableOpacity>
            <Text style={styles.selectedDate}>
              {dateStart ? dateStart.toDateString() : "Select a date"}
            </Text>
          </View>
          {activePicker === "dateStart" && (
            <DateTimePicker
            mode="date"
            display="calendar"
            onChange={(event, selectedDate: Date | undefined) => {
              setActivePicker(null);
              const updatedDate = new Date(dateStart);
              if (selectedDate) {
              updatedDate.setFullYear(selectedDate.getFullYear());
              updatedDate.setMonth(selectedDate.getMonth());
              updatedDate.setDate(selectedDate.getDate());
              setDateStart(updatedDate);
              }
            }}
            value={dateStart}
          />
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => openPicker("timeStart")}>
              <Text style={styles.label}>Start Time: </Text>
            </TouchableOpacity>
            <Text style={styles.selectedDate}>
              {dateStart ? dateStart.toLocaleTimeString() : "Select a time"}
            </Text>
          </View>
          {activePicker === "timeStart" && (
            <DateTimePicker
            mode="time"
            display="clock"
            onChange={(event, selectedDate: Date | undefined) => {
              setActivePicker(null);
              const updatedDate = new Date(dateStart);
              if (selectedDate) {
                updatedDate.setHours(selectedDate.getHours());
                updatedDate.setMinutes(selectedDate.getMinutes());
                setDateStart(updatedDate);
              }
            }}
            value={dateStart}/>
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => openPicker("dateEnd")}>
              <Text style={styles.label}>End Date: </Text>
            </TouchableOpacity>
            <Text style={styles.selectedDate}>
              {dateEnd ? dateEnd.toDateString() : "Select a date"}
            </Text>
          </View>
          {activePicker === "dateEnd" && (
            <DateTimePicker
            mode="date"
            display="calendar"
            onChange={(event, selectedDate: Date | undefined) => {
              setActivePicker(null);
              const updatedDate = new Date(dateEnd);
              if (selectedDate) {
              updatedDate.setFullYear(selectedDate.getFullYear());
              updatedDate.setMonth(selectedDate.getMonth());
              updatedDate.setDate(selectedDate.getDate());
              setDateEnd(updatedDate);
              }
            }}
            value={dateEnd}
          />
          )}
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={() => openPicker("timeEnd")}>
              <Text style={styles.label}>End Time: </Text>
            </TouchableOpacity>
            <Text style={styles.selectedDate}>
              {dateEnd ? dateEnd.toLocaleTimeString() : "Select a time"}
            </Text>
          </View>
          {activePicker === "timeEnd" && (
            <DateTimePicker
            mode="time"
            display="clock"
            onChange={(event, selectedDate: Date | undefined) => {
              setActivePicker(null);
              const updatedDate = new Date(dateEnd);
              if (selectedDate) {
                updatedDate.setHours(selectedDate.getHours());
                updatedDate.setMinutes(selectedDate.getMinutes());
                setDateEnd(updatedDate);
              }
            }}
            value={dateEnd}/>
          )}
          <Text style={styles.label}>Dream summary:</Text>
          <TextInput
            style={styles.input}
            placeholder="Dream summary"
            placeholderTextColor="#FFFFFF"
            multiline={true}
            onChange={(event) => setDreamSummary(event.nativeEvent.text)}
            />
          <View style={styles.feelingContainer}>
            <Text style={styles.label}>How did you feel:</Text>
            <View style={styles.radioContainer}>
            <TouchableOpacity 
              style={[
                styles.radioButton, 
                status === "Rested" && styles.selectedRadioButton
              ]}
              onPress={() => setStatus("Rested")}
            >
              <Text style={status === "Rested" ? styles.selectedText : styles.radioButtonText}>
                Rested
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.radioButton, 
                status === "Tired" && styles.selectedRadioButton
              ]}
              onPress={() => setStatus("Tired")}
            >
              <Text style={status === "Tired" ? styles.selectedText : styles.radioButtonText}>
                Tired
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.radioButton, 
                status === "Didn't sleep" && styles.selectedRadioButton
              ]}
              onPress={() => setStatus("Didn't sleep")}
            >
              <Text style={status === "Didn't sleep" ? styles.selectedText : styles.radioButtonText}>
                Didn't sleep
              </Text>
            </TouchableOpacity>
          </View>
        </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "#D0A6E1",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#FFFFFF",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginVertical: 10,
    padding: 5,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: 'row', // Makes the elements display in a row
    alignItems: 'center', // Vertically center the items
    flexWrap: 'wrap', // Allows the items to wrap to the next line
  },
  selectedDate: {
    fontSize: 14,
    color: '#533A71',
    marginTop: 5,
    maxWidth: '70%', // Limits the width of the date text
    paddingBottom: 5
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: "#502274",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#502274",
    fontWeight: "bold",
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#502274",
    marginBottom: 5,
  },
  feelingContainer: {
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  radioButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF", // Default background color for the button
    borderWidth: 1,
    borderColor: "#533A71", // Border color
  },
  selectedRadioButton: {
    backgroundColor: "#533A71", // Color for selected button
    borderColor: "#533A71", // Border color for selected button
  },
  radioButtonText: {
    fontSize: 16,
    color: "#533A71", // Default text color
  },
  selectedText: {
    fontSize: 16,
    color: "#FFFFFF", // Text color for selected option
  },
});

export default SleepEntryModal;
