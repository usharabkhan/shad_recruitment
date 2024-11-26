import { useEffect, useState } from 'react';
import { View, Text, TextInput, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl } from "react-native";
import { styles } from '@/assets/styles';
import { FontAwesome } from "@expo/vector-icons";
import SchoolDetailBox from "@/components/school/SchoolDetailBox";
import LoadingSpinner from '@/components/misc/Loading';
import AddSchool from '@/components/modals/AddSchool'; // Adjust the path as needed
import { API_URL, PURPLE_COLOR } from '../constants/constant';
import { School } from '../constants/types';

export default function test(){
    const [schoolData, setSchoolData] = useState<School[]>([]);
    const [filteredSchools, setFilteredSchools] = useState<School[]>([]);

    const [modalVisible, setModalVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [searchText, setSearchText] = useState('')

    const fetchSchools = async () => {
        setRefreshing(true); // Set refreshing to true before fetching
        try {
            const response = await fetch(API_URL + 'schools');
            const json = await response.json();
            setSchoolData(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false); // Set refreshing to false after fetching
        }
    };
    
    // Filter the schools based on the search text
    const filterSchools = () => {
        if (searchText === '') {
        setFilteredSchools(schoolData); // If search is empty, show all schools
        } else {
        setFilteredSchools(
            schoolData.filter((school) =>
            school.name.toLowerCase().includes(searchText.toLowerCase()) // Case-insensitive search
            )
        );
        }
    };

    useEffect(() => {
        fetchSchools();
      }, []); // On mount

    useEffect(() => {
        setLoaded(schoolData && schoolData.length > 0);
    }, [schoolData])

    useEffect(() => {
        filterSchools(); // Filter the schools whenever the search text changes
    }, [searchText, schoolData]); // Trigger whenever `searchText` or `schoolData` changes
      

    return( 
        <SafeAreaView style={styles.main_container}>
            <View style={styles.sub_container}>
                <AddSchool 
                    visible={modalVisible} 
                    onClose={() => setModalVisible(false)} 
                />
                {/* Search bar */}
                <Text style={styles.heading}>Search School</Text>
                <View 
                    style={{
                        flexDirection: 'row', marginTop: 15, borderWidth: 1, borderColor: '#ccc',
                        paddingHorizontal: 10, alignItems: 'center', borderRadius: 8,
                    }}
                >
                            {/* <TouchableOpacity> */}
                                <FontAwesome name="search" size={20} 
                                color={PURPLE_COLOR} style={{ paddingRight: 10}} />
                            {/* </TouchableOpacity> */}
                            <TextInput
                                style={[styles.input, {borderWidth: 0}]}
                                placeholder="School Name"
                                placeholderTextColor="#888"
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                </View>
                
                <Text style={styles.heading}>All Schools</Text>
                
                <ScrollView style={styles.list_container} refreshControl={
                        <RefreshControl
                            refreshing={refreshing} // Indicates if the view is currently refreshing
                            onRefresh={fetchSchools} // Fetch visits on refresh
                            tintColor={'#613493'}
                        />
                    }>
                    {loaded ? (
                        filteredSchools.map(s => (
                            <SchoolDetailBox key={s.id} data={s} />
                        ))
                    ) : (
                        <LoadingSpinner />
                    )}
                </ScrollView>
                <View style={{marginTop: 15, borderTopWidth: 1, borderTopColor: "rgba(97, 52, 147, 0.5)"}}>
                    <TouchableOpacity style={[styles.actionButton, {width: '50%', }]} onPress={() => setModalVisible(true)}>
                        <Text style={styles.actionText}>Add New School</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
