import { useEffect, useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { styles } from '@/assets/styles';
import { FontAwesome } from "@expo/vector-icons";
import SchoolDetailBox from "@/components/SchoolDetailBox";
import LoadingSpinner from '@/components/Loading';
import AddSchool from '@/components/modals/AddSchool'; // Adjust the path as needed
import { API_URL } from '../constants/constant';

interface school {
    id: number,
    name: string,
    address: string,
    contact: string,
    type: string
}

export default function test(){
    const [schoolData, setSchoolData] = useState<school[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch(API_URL + 'schools')
          .then(response => response.json())
          .then(json => setSchoolData(json))
          .catch(error => console.error('Error fetching data')); // Add error handling
      }, []); // Empty dependency array to fetch data once on mount

    useEffect(() => {
        setLoaded(schoolData && schoolData.length > 0);
    }, [schoolData])

    return( 
        <SafeAreaView style={styles.container}>
            <AddSchool 
                visible={modalVisible} 
                onClose={() => setModalVisible(false)} 
            />
            {/* Search bar */}
            <Text style={styles.heading}>Search School</Text>
            <View style={styles1.searchSection}>
                        <TextInput
                        style={styles1.input}
                        placeholder="School Name"
                        placeholderTextColor="#888"
                        />
                        <TouchableOpacity>
                            <FontAwesome name="search" size={30} 
                            color={styles.headerIcon.color} style={{ paddingLeft: 10}} />
                        </TouchableOpacity>
            </View>
            
            <Text style={styles.heading}>All Schools</Text>
            
            <ScrollView style={styles.list_container}>
                {loaded ? (
                    schoolData.map(s => (
                        <SchoolDetailBox key={s.id} data={s} />
                    ))
                ) : (
                    <LoadingSpinner />
                )}
            </ScrollView>

            <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.actionText}>+ Add New School</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles1={
    list_con: {
        flex: 1,
        marginBottom: 20,
        padding: 10,
        // paddingTop: 10,
        backgroundColor: '#AADEE1',
        borderRadius: 8,
    },
    searchSection: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginBottom: 10,
        paddingTop: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        fontFamily: 'Inter',
        color: '#333',
    },
}