// CustomModal.tsx (make sure to rename the file to .tsx if using TypeScript)
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useState } from 'react';
import { styles } from '@/assets/styles';
import { API_URL } from '@/app/constants/constant';

interface props {
  visible: boolean; // Define 'visible' as a boolean
  onClose: () => void; // Define 'onClose' as a function that returns void
}

const AddSchool: React.FC<props> = ( { visible, onClose } ) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [type, setType] = useState('');

    const  handleAddSchool = async () => {
        // Here you would typically make an API call to add the school
        const newSchool = { name, address, contact, type };
        if (!newSchool.name || !newSchool.address || !newSchool.contact || !newSchool.type){
          // display error?
          return;
        }

        try {
          // Send a POST request to API
          const response = await fetch(API_URL + 'schools/add', 
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newSchool),
            }
          );
          // If response was not OK
          if (!response.ok) {
            throw new Error('Network response was not ok' + response.statusText);
          }
          // Log successful adding of the school
          const jsonResponse = await response.json();
          console.log('School added successfully:', jsonResponse);
        }
        catch (error){
          console.log(error)
        }
        // Reset the fields
        setName('');
        setAddress('');
        setContact('');
        setType('');
        onClose(); // Close the modal after submission
    };

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
                    <Text style={styles.heading}>Add New School</Text>
                    <View style={styles.list_container}>
                    <TextInput
                        style={[styles.input, {flex: 0, margin: 10}]}
                        placeholder="School Name"
                        placeholderTextColor="#999"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={[styles.input, {flex: 0, margin: 10}]}
                        placeholder="Address"
                        placeholderTextColor="#999"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        style={[styles.input, {flex: 0, margin: 10}]}
                        placeholder="Contact Person"
                        placeholderTextColor="#999"
                        value={contact}
                        onChangeText={setContact}
                    />
                    <TextInput
                        style={[styles.input, {flex: 0, margin: 10}]}
                        placeholder="Type (Public/Private)"
                        placeholderTextColor="#999"
                        value={type}
                        onChangeText={setType}
                    />
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={[styles.actionButton, {width: '50%'}]} onPress={handleAddSchool} >
                        <Text style={styles.actionText}>Add School</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={onClose} style={[styles.actionButton, localStyles.cancelBtn]} >
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
export default AddSchool;

const localStyles = StyleSheet.create({
    cancelBtn: {
      backgroundColor: '#FF6347',
      width: '50%',
      marginBottom: 10,
    },
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