import { View, Text, SafeAreaView, TouchableOpacity,ScrollView, RefreshControl } from "react-native";
import { styles } from '@/assets/styles'
import PastVisitBox from "@/components/school/VisitBox";
import LoadingSpinner from "@/components/misc/Loading";
import RecruitmentSummary from "@/components/RecruitmentSummary";
import AddVisitModal from "@/components/modals/AddVisit";

import { useEffect, useState } from "react";
import { API_URL } from "../constants/constant";

interface visit {
    visit_id: number;
    school_id: number;
    date: Date;
    students: number;
    name: string;
    contact: string;
}

interface summaryData {
    total_schools: number;
    total_visits: number;
    total_students: number;
    future_visits: number;
}

export default function HomeScreen(){
    const [visits, setVisits] = useState<visit[]>([])
    const [summary, setSummary] = useState<summaryData>(
        {
            total_schools: 0,
            total_visits: 0,
            total_students: 0,
            future_visits: 0,
        }
    );
    const [loaded, setLoaded] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleRefresh = async () => {
        await fetchVisits(); // Assuming fetchVisits is an async function
        await fetchSummary(); // Assuming fetchSummary is an async function
    };

    const fetchVisits = async () => {
        setRefreshing(true); // Set refreshing to true before fetching
        try {
            const response = await fetch(API_URL + 'visits');
            const json = await response.json();
            setVisits(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false); // Set refreshing to false after fetching
        }
    };

    const fetchSummary = async () => {
        try {
            const response = await fetch(API_URL + 'summary');
            const json = await response.json();
            setSummary(json);
            console.log(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchSummary();
        fetchVisits();
    }, [])

    useEffect(() =>{
        setLoaded(visits && visits.length > 0);
    }, [visits])

    return(
            
        <SafeAreaView style={styles.container}>
            <AddVisitModal visible={modalVisible} onClose={() => setModalVisible(false)}/>
            <Text style={styles.heading}>Recruitment Summary</Text>

            <View style={[styles.list_container, {flex: 0}]}>
                <RecruitmentSummary data={summary}/>
            </View>
            
            <Text style={styles.heading}>Visits</Text>

            <ScrollView style={styles.list_container} refreshControl={
                    <RefreshControl
                        refreshing={refreshing} // Indicates if the view is currently refreshing
                        onRefresh={handleRefresh} // Fetch visits on refresh
                    />
                }>

                {loaded ? (
                    visits.map(v => (
                        <PastVisitBox key={v.visit_id} data={v} /> // Ensure visit_id is unique
                    ))
                ) : (
                    <LoadingSpinner/>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.actionButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.actionText}>+ Add New Visit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
