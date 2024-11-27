import { Button, Modal, ScrollView, TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { useLayoutEffect, useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from '@/assets/styles';
import AddActivity from "@/components/modals/Activity";
import DeleteSchoolModal from "@/components/modals/DeleteSchool";
import UpdateVisitModal from "@/components/modals/Visit"; 
import { API_URL } from "../constants/constant";
import HistoryItemCard from "@/components/HistoryItem";
import { HistoryItem, ActivityItem, School } from "../constants/types";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import axios from 'axios';

const SchoolDetail = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [visitModalVisible, setVisitModalVisible] = useState(false);
    const [deleteModal, setDeleteVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [school, setSchool] = useState<School>({
        id: 0,
        name: '',
        address: '',
        contact: '',
        type: ''
    });
    const [activity, setActivity] = useState<HistoryItem[]>([]);

    const navigation = useNavigation();
    const { id } = useLocalSearchParams();

    const fetchData = async () => {
        const fetchedSchool = await axios.get(API_URL + 'schools/' + id)
        setSchool(fetchedSchool.data)
        refreshActivityData();
    }
    // Function to refresh activity data after adding activity
    const refreshActivityData = async () => {
        try {
            const fetchedHistory = await axios.get(API_URL + 'activity/' + id)
            setActivity(fetchedHistory.data)
        } catch (error) {
            console.error('Error fetching activity data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []); // Empty dependency array to fetch data once on mount

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerTitle: "",
            headerBackTitle: "Back",
        });
    }, [navigation]);

    
    
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }
    
      
    return (
        
        <SafeAreaView style={styles.main_container}>
            <View style={[styles.sub_container, {flex: 1}]}>
                <UpdateVisitModal
                    schoolId={school.id} 
                    schoolName={school.name} 
                    visible={visitModalVisible} 
                    onClose={() => setVisitModalVisible(false)}
                    onAdd={refreshActivityData} 
                />

                <AddActivity
                    schoolId={school.id} 
                    schoolName={school.name}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onAdd={refreshActivityData}
                />

                <DeleteSchoolModal 
                    schoolId={school.id} 
                    schoolName={school.name} 
                    visible={deleteModal} 
                    onClose={() => setDeleteVisible(false)}
                />

                {/* SCHOOL DETAILS SECTION */}
                
                <Text style={styles.heading}>{school.name}</Text>   
                <View style={localStyle.localContainer}> 
                    <Image
                        source={require('@/assets/images/school_icon.png')} // Replace with your image URL
                        style={{width: 100, height: 100, marginRight: 10}}
                        />
                        {school ? (
                            <View style={[styles.visitcontainer, {flexDirection: 'column', flex: 1}]}>
                                
                                <Text style={styles.schoolName}>{school?.contact}</Text>
                                <Text style={styles.schoolDetails}>{school?.address || "No address available"}</Text>
                                <Text style={styles.schoolDetails}>Type: {school?.type || "No type available"}</Text>
                            </View>
                        ) : (<Text>Error</Text>)}
                </View>
                
                {/* ACTIVITY SECTION */}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', // Ensures space between text and icon
                    alignItems: 'center',           // Vertically center items
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(97, 52, 147, 0.5)'
                }}>
                    <Text style={[styles.heading, { flex: 1, borderBottomWidth: 0 }]}>
                        History
                    </Text>
                    {activity.length > 0 && (
                        <TouchableOpacity 
                            onPress={toggleEditMode} 
                            style={{
                                padding: 2, // Adjust padding for a better touch area
                            }}
                        >
                            {editMode ? 
                                <MaterialIcons name="cancel" size={20} color="rgba(97, 52, 147, 1)" /> 
                                : 
                                <Feather name="edit-2" size={20} color="rgba(97, 52, 147, 1)" />
                            }
                        </TouchableOpacity>
                    )}
                </View>

                {/* ACTIVITY LIST */}

                <View style={[styles.list_container, {flex: 1}]}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 0 }}>
                            {activity.length === 0 && 
                            (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center', // Center vertically
                                        alignItems: 'center', // Center horizontally
                                    }}
                                    >
                                    <MaterialIcons name="history" size={30} color="#666" />
                                    <Text style={[styles.schoolDetails, { textAlign: 'center'}]}>
                                        No activity for this school yet
                                    </Text>
                                </View>
                            )}
                            {
                            activity.map((a, index) =>
                                <HistoryItemCard key={index} item={a} onDelete={refreshActivityData} editMode={editMode}/>
                            )}
                    </ScrollView>
                </View>

                {/* ACTION BUTTONS */}

                <View style={{width: '100%'}}>
                    <View style={[styles.buttonContainer, ]}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => setVisitModalVisible(true)}>
                            <Text style={styles.actionText}>Add Visit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
                            <Text style={styles.actionText}>Add Activity</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <TouchableOpacity style={[styles.actionButton, {backgroundColor: '#FF6347', width: '70%'}]} onPress={() => setDeleteVisible(true)}>
                        <Text style={styles.actionText}>Delete School</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
      paddingHorizontal: 15,
      paddingTop: 15,
      backgroundColor: '#AADEE1',
      borderRadius: 8,
      flexDirection: 'row' as 'row',
      justifyContent: 'center' as 'center',
      alignItems: 'center' as 'center',
      marginTop: 15,
    },
}
