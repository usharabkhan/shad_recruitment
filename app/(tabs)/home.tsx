import { View, Text, SafeAreaView, TouchableOpacity,ScrollView, RefreshControl } from "react-native";
import { styles } from '@/assets/styles'
import VisitDetailCard from "@/components/school/VisitDetailCard";
import RecruitmentSummary from "@/components/RecruitmentSummary";

import { useEffect, useState } from "react";
import { API_URL, PURPLE_COLOR } from "../constants/constant";
import UpdateVisitModal from "@/components/modals/Visit";
import { SchoolVisit } from "../constants/types";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { showMessage } from "@/components/misc/ShowMessage";
import { Ionicons } from "@expo/vector-icons";

interface summaryData {
    total_schools: number;
    total_visits: number;
    total_students: number;
    future_visits: number;
}

export default function HomeScreen(){
    const [selectedVisit, setSelectedVisit] = useState<SchoolVisit>()

    const [visits, setVisits] = useState<SchoolVisit[]>([])
    const [refreshing, setRefreshing] = useState(false);

    const [updateVisitVisible, setUpdateVisitVisible] = useState(false);


    const [summary, setSummary] = useState<summaryData>(
        {
            total_schools: 0,
            total_visits: 0,
            total_students: 0,
            future_visits: 0,
        }
    );
    const [loaded, setLoaded] = useState(false)

    const handleRefresh = async () => {
        setRefreshing(true)
        await fetchVisits(); // Assuming fetchVisits is an async function
        await fetchSummary(); // Assuming fetchSummary is an async function
        setRefreshing(false)
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
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleUpdateVisit = async (v? : SchoolVisit) => {
        if (v) {
            setSelectedVisit(v)
        }
        else {
            setSelectedVisit(undefined)
        }
        setUpdateVisitVisible(!updateVisitVisible)
        handleRefresh();
    }

    useEffect(() => {
        fetchSummary();
        fetchVisits();
    }, [])

    useEffect(() =>{
        setLoaded(visits ? true : false);
    }, [visits])

    return(
            <SafeAreaView style={styles.main_container} >
                
                
                <UpdateVisitModal 
                    visit = {selectedVisit}
                    visible={updateVisitVisible} 
                    onClose = {() => toggleUpdateVisit()}
                    onAdd = {handleRefresh}
                />
                <View style={styles.sub_container}>
                    <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', // Ensures space between text and icon
                            alignItems: 'center',           // Vertically center items
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(97, 52, 147, 0.5)'
                        }}>
                        
                        <Text style={[styles.heading, { flex: 1, borderBottomWidth: 0 }]}>
                            Recruitment Summary
                        </Text>
                        
                        <TouchableOpacity style={{padding: 2, marginRight: 5}} onPress={() => { handleRefresh(); 
                                                    showMessage("Successfully refreshed data", "success");}}>
                            <FontAwesome name="refresh" size={24} color={PURPLE_COLOR} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.list_container]}>
                        <RecruitmentSummary data={summary}/>
                    </View>
                        
                        <Text style={[styles.heading]}>Visits</Text>

                        <ScrollView style={[styles.list_container, {marginTop: 15}]} refreshControl={
                                <RefreshControl
                                    refreshing={refreshing} // Indicates if the view is currently refreshing
                                    onRefresh={handleRefresh} // Fetch visits on refresh
                                    tintColor={"#613493"}
                                />
                            } contentContainerStyle={{ flexGrow: 1 }} >

                            {visits && visits.length > 0  ? (
                                visits.map(v => (
                                    <VisitDetailCard key={v.visit_id} data={v} onTouch={() => toggleUpdateVisit(v)}/> // Ensure visit_id is unique
                                ))
                            ) : (
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', alignSelf: 'center',}}>
                                    <Ionicons name="cloud-offline-outline" size={24} color="#666" />
                                    <Text style={[styles.schoolDetails,{margin: 10}]}>No visits found</Text>
                                </View>
                            )}
                        </ScrollView>
                </View>
            </SafeAreaView>
    );
}
