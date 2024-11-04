// CustomModal.tsx (make sure to rename the file to .tsx if using TypeScript)
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { styles } from '@/assets/styles';
import { Picker } from '@react-native-picker/picker';

interface props {
  visible: boolean; // Define 'visible' as a boolean
  onClose: () => void; // Define 'onClose' as a function that returns void
}

const AddVisitModal: React.FC<props> = ({ visible, onClose }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [selectedValue, setSelectedValue] = useState("java");

    const handleAddVisit = async () => {

    }

  return (
    <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={localStyles.modalContainer}>
                <View style={localStyles.modalContent}>
                    <Text style={styles.heading}>Add New Visit</Text>
                    <View style={[styles.list_container, {flex: 0}]}>
                    <Picker
                      selectedValue={selectedValue}
                      style={localStyles.picker}
                      onValueChange={(itemValue) => setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="Option 1" value="option1" />
                      <Picker.Item label="Option 2" value="option2" />
                      <Picker.Item label="Option 3" value="option3" />
                    </Picker>
                      <TextInput
                          style={[styles.input, {flex: 0, margin: 10}]}
                          placeholder="School Name"
                          value={name}
                          onChangeText={setName}
                      />
                      <TextInput
                          style={[styles.input, {flex: 0, margin: 10}]}
                          placeholder="Date"
                          value={address}
                          onChangeText={setAddress}
                      />
                      <TextInput
                          style={[styles.input, {flex: 0, margin: 10}]}
                          placeholder="Attendance"
                          value={contact}
                          onChangeText={setContact}
                      />
                    </View>
                    <TouchableOpacity style={[styles.actionButton, {alignItems: 'center'}]} onPress={handleAddVisit} >
                      <Text style={styles.actionText}>Add Visit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={[styles.actionButton, localStyles.cancelBtn]} >
                      <Text style={styles.actionText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
  );
};
export default AddVisitModal;

const localStyles = StyleSheet.create({
    container: { padding: 16 },
    label: { fontSize: 16, marginBottom: 8 },
    picker: { height: 50, width: 200 },
    selectedText: { marginTop: 16 },
  
  cancelBtn: {
    backgroundColor: '#FF6347', 
    alignItems: 'center',
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background
  },
  modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      elevation: 5,
  },
  title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
  },
  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 5,
  },
});

