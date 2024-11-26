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
  visible: boolean;
  onClose: () => void;
  onAdd: () => void;
}

const AddActivity: React.FC<props> = ({ schoolId, schoolName, visible, onClose, onAdd }) => {
  const [description, setDescription] = useState('');
  const [showPicker, setShowPicker] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
    const handleChange = (event: any, date?: Date) => {
      if (Platform.OS === 'android') {
          setShowPicker(false); // Close the picker on Android after selection
      }
      if (date) {
          setSelectedDate(date); // Update the selected date
      }
  };

    const handleAddActivity = async () => {
      try {
        console.log(schoolId);
        console.log(description);
        const response = await fetch(API_URL + 'activity/add', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({schoolId, selectedDate, description}),
          }
        );
        const json = await response.json();
        onClose();
        console.log(json);
        if (json.message == "Success"){
          
          onAdd();
        }
      } catch (error) {
          console.error('Error adding activity:', error);
      }
    }
    
    const handleDeleteActivity = async () => {

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
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
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
                            <Text style={[styles.schoolName, {marginLeft: 10}]}>Description: </Text>
                            <TextInput
                                style={[styles.input, { height: 80, minHeight: 80, flex: 0, margin: 10 }]}
                                placeholder="Description"
                                placeholderTextColor={'#ccc'}
                                value={description}
                                onChangeText={setDescription}
                                multiline={true}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.actionButton, { width: '50%' }]}
                                onPress={handleAddActivity}
                            >
                                <Text style={styles.actionText}>Add Activity</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onClose}
                                style={[styles.actionButton, styles.cancelBtn]}
                            >
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
export default AddActivity;

