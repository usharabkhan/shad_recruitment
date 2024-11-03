import { Button, Modal, ScrollView, TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from '@/assets/styles';
import AddActivity from "@/components/modals/AddActivity";
import { API_URL } from "../constants/constant";
interface school {
    id: number,
    name: string,
    address: string,
    contact: string,
    type: string
}
const SchoolDetail = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [school, setSchool] = useState<school>()
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();

    useEffect(() => {
        fetch(API_URL + 'schools/' + id)
          .then(response => response.json())
          .then(json => setSchool(json))
          .catch(error => console.error('Error fetching data:', error)); // Add error handling
      }, []); // Empty dependency array to fetch data once on mount

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
          headerTitle: "",
          headerBackTitle: "Back",
        });
      }, [navigation]);
      
    return (
        
        <SafeAreaView style={styles.container}>
            <AddActivity
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            <Text style={styles.heading}>School Details</Text>   
            <View style={localStyle.localContainer}> 
                <Image
                    source={require('@/assets/images/school_icon.png')} // Replace with your image URL
                    style={{width: 100, height: 100}}
                    />
                    <View style={[styles.visitcontainer, {flexDirection: 'column', flex: 1}]}>
                        <Text style={styles.schoolName}>{school?.name}</Text>
                        <Text style={styles.schoolDetails}>{school?.address}</Text>
                        <Text style={styles.schoolDetails}>Contact: {school?.contact}</Text>
                        <Text style={styles.schoolDetails}>Type: {school?.type}</Text>
                    </View>
            </View>
            
            <Text style={styles.heading}>History</Text>
            <View style={[styles.list_container, {flex: 1}]}>
                <ScrollView style={styles.visitcontainer}>
                    <View style={localStyle.historyItem}>
                        <Text style={localStyle.historyItemDate}>16 Sep 2024: </Text>
                        <Text style={localStyle.historyItemText}>Contacted Them this is a super long text</Text>
                    </View>
                    <View style={localStyle.historyItem}>
                        <Text style={localStyle.historyItemDate}>16 Sep 2024: </Text>
                        <Text style={localStyle.historyItemText}>Contacted Them this is a super long text</Text>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.actionText}>Add Activity</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
export default SchoolDetail; 

const localStyle = {
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    localContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#AADEE1',
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    historyItem: {
        // flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },

    historyItemDate: {

    },
    
    historyItemText: {
        flexShrink: 1,
        color: '#666',
        font: 14,
    }
}
