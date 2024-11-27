// CustomModal.tsx (make sure to rename the file to .tsx if using TypeScript)
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { useState } from 'react';
import { styles } from '@/assets/styles';
import { API_URL } from '@/app/constants/constant';
import { useNavigation, useRouter } from 'expo-router';
import axios from 'axios';
import { showMessage } from '../misc/ShowMessage';

interface props {
    schoolId : number;
  schoolName : string;
  visible: boolean; // Define 'visible' as a boolean
  onClose: () => void; // Define 'onClose' as a function that returns void
}

const DeleteSchoolModal: React.FC<props> = ({ schoolId, schoolName, visible, onClose }) => {
  const nav = useNavigation();
  const router = useRouter();
    const confirmDelete = async () => {
      try {
        const response = await axios.delete(API_URL + 'schools/delete/' + schoolId );
        if (response.data.message == "Success"){
          showMessage("Successfully deleted school", "success");
          onClose();
          nav.goBack();
          router.push('/schools')
        } else {
          showMessage(response.data.message, "error");
        }
      } catch (error) {
        showMessage("Error deleting school", "error");
      }
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
                        <Text style={styles.heading}>Are you sure you want to delete {schoolName}'s data?</Text>
                        <View style={[styles.buttonContainer, {borderTopWidth: 0}]}>
                            <TouchableOpacity
                                style={[styles.actionButton, { width: '50%' }]}
                                onPress={confirmDelete}
                            >
                                <Text style={styles.actionText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={onClose}
                                style={[styles.actionButton, localStyles.cancelBtn]}
                            >
                                <Text style={styles.actionText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
    </Modal>

  );
};
export default DeleteSchoolModal;

const localStyles = StyleSheet.create(
  {
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

