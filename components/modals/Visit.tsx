// CustomModal.tsx (make sure to rename the file to .tsx if using TypeScript)
import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, 
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, 
  Button} from 'react-native';
import { useState } from 'react';
import { styles } from '@/assets/styles';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import { API_URL, RED_COLOR } from '@/app/constants/constant';
import { SchoolVisit } from '@/app/constants/types';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { showMessage } from '../misc/ShowMessage';

interface props {
  visit? : SchoolVisit;
  schoolId? : number;
  schoolName? : string;
  visible: boolean; // Define 'visible' as a boolean
  onClose: () => void; // Define 'onClose' as a function that returns void
  onAdd: () => void;
}

const VisitModal: React.FC<props> = ({ visit, visible, schoolId, schoolName, onClose, onAdd }) => {
    const [attendance, setAttendance] = useState('0');
    const [showPicker, setShowPicker] = useState(Platform.OS == 'android' ? false : true);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
      if (visit && visit.students !== undefined) {
        setAttendance(visit.students.toString());
        setSelectedDate(new Date(visit.date));
      }
    }, [visit])

    const handleChange = (event: any, date?: Date) => {
      if (Platform.OS === 'android') {
          setShowPicker(false); // Close the picker on Android after selection
      }
      if (date) {
          setSelectedDate(date); // Update the selected date
      }
    };

    const handleDelete = async(id : number) => {
      try {
          const response = await axios.delete(API_URL + 'visits/delete/' + id);
          if (response.data.message == "Success"){
            showMessage("Successfully deleted visit", "success");
          }
          onClose();
      }
      catch (error) {
          console.log(error)
          showMessage("Error deleting visit", "error");
      }
  }
    const handleUpdateAddVisit = async () => {
      try {
        var method = "added";
        var response;
        if (visit) {
          schoolId = visit.school_id;
          const v_id = visit.visit_id;
          if ((visit.students.toString() != attendance) && (visit.date != selectedDate)){
            const newVisit = {v_id, schoolId, selectedDate, attendance};
            response = await axios.post(API_URL + "visits/update", newVisit)
            method = "updated"
          }
          else{
            return
          }
        }
        else {
          const newVisit = {schoolId, selectedDate, attendance};
          response = await axios.post(API_URL + "visits/add", newVisit)
        }
        

        if (response.data.message == "Success"){
          onAdd();
          showMessage(`Successfully ${method} visit`, "success");
        }
      } catch (error){
        
        showMessage("Error connecting with the server", "error");
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
                        {/* HEADING */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', // Ensures space between text and icon
                            alignItems: 'center',           // Vertically center items
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(97, 52, 147, 0.5)'
                        }}>
                          
                          <Text style={[styles.heading, { flex: 1, borderBottomWidth: 0 }]}>
                            {visit ? visit.name : schoolName}
                          </Text>
                          
                          {visit && <TouchableOpacity style={{padding: 2}} onPress={() => handleDelete(visit.visit_id)}>
                              <AntDesign name="delete" size={20} color={RED_COLOR} />
                          </TouchableOpacity>}
                        </View>

                        {/* INPUT FIELDS */}
                        <View style={styles.list_container}>
                            <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
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
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                              <Text style={styles.schoolName}>No. of Attendees: </Text>
                              <TextInput
                                  style={[styles.input, { flex: 1, marginHorizontal: 10 }]}
                                  placeholder={visit ? visit.students.toString() : "Attendance"}
                                  value={attendance}
                                  onChangeText={setAttendance}
                              />
                            </View>
                        </View>

                        {/* BUTTON SECTION */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton]}
                                onPress={handleUpdateAddVisit}
                            >
                                <Text style={styles.actionText}>{visit ? "Update" : "Add"} Visit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} style={[styles.actionButton, styles.cancelBtn]}>
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
export default VisitModal;

const localStyles = StyleSheet.create(
  {
    
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
    zIndex: 0, // Set to a lower value than the message modal
  },
  modalContent: {
      width: '80%',
      paddingTop: 10,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
      zIndex: 1, // Ensure the content is on top of the background but lower than message modal
  },
});

