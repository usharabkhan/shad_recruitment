// CustomModal.tsx (make sure to rename the file to .tsx if using TypeScript)
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, 
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, 
  Button} from 'react-native';
import { useState } from 'react';
import { styles } from '@/assets/styles';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import { API_URL } from '@/app/constants/constant';

interface props {
  schoolId : number;
  schoolName : string;
  visible: boolean; // Define 'visible' as a boolean
  onClose: () => void; // Define 'onClose' as a function that returns void
  onAdd: () => void;
}

const AddVisitModal: React.FC<props> = ({ schoolId, schoolName, visible, onClose, onAdd }) => {
    const [attendance, setAttendance] = useState('0');
    // const [date, setDate] = useState(new Date(Date.now()));

    const [showPicker, setShowPicker] = useState(Platform.OS == 'android' ? false : true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleChange = (event: any, date?: Date) => {
      if (Platform.OS === 'android') {
          setShowPicker(false); // Close the picker on Android after selection
      }
      if (date) {
          setSelectedDate(date); // Update the selected date
      }
  };

    const handleAddVisit = async () => {
      try {
        const newVisit = {schoolId, selectedDate, attendance};
        const response = await fetch(API_URL + "visits/add", 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVisit),
          }
        )

        const json = await response.json()
        if (json.message == "Success"){
          onAdd();
        }
      } catch (error){
        
      }
      onClose();
    }

  return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={localStyles.modalContainer}>
                    <View style={localStyles.modalContent}>
                        <Text style={styles.heading}>{schoolName}</Text>
                        <View style={styles.list_container}>
                            <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
                              <Text style={styles.schoolName}>Date: </Text>
                              
                              {Platform.OS === 'android' ? (
                                <Button title={selectedDate.toDateString()} onPress={() => setShowPicker(true)} />
                              ) : null}
                              
                              {showPicker && (
                                  <DateTimePicker
                                      value={selectedDate}
                                      minimumDate={new Date('2023-01-01')}
                                      maximumDate={new Date('2025-01-01')}
                                      onChange={handleChange}
                                      mode="date"
                                      display={Platform.OS === 'ios' ? 'compact' : 'default'}
                                  />
                              )}
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
                              <Text style={styles.schoolName}>No. of Attendees: </Text>
                              <TextInput
                                  style={[styles.input, { flex: 1, margin: 10 }]}
                                  placeholder="Attendance"
                                  value={attendance}
                                  onChangeText={setAttendance}
                              />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.actionButton, { width: '50%' }]} onPress={handleAddVisit}>
                                <Text style={styles.actionText}>Add Visit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} style={[styles.actionButton, styles.cancelBtn]} >
                                <Text style={styles.actionText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    </Modal>

  );
};
export default AddVisitModal;

const localStyles = StyleSheet.create(
  {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
  },
  modalContent: {
      width: '80%',
      paddingTop: 10,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
  },
});

