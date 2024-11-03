import { Stack } from "expo-router";
import { View, Text, SafeAreaView, TouchableOpacity,ScrollView } from "react-native";
import { styles } from '@/assets/styles'
import SchoolVisit from "@/components/SchoolVisitBox";
import PastVisitBox from "@/components/SchoolPastVisitBox";
import LoadingSpinner from "@/components/Loading";
import RecruitmentSummary from "@/components/RecruitmentSummary";

import { useEffect, useState } from "react";
import { API_URL

 } from "../constants/constant";
interface pVisit {
    visit_id: number;
    school_id: number;
    date: Date;
    students: number;
    name: string;
}
interface futureVisit {
    visit_id: number,
    school_id: number;
    date: Date,
    name: string,
    address: string,
    contact: string
}

export default function test(){
    const [pVisits, setPVisits] = useState<pVisit[]>([])
    const [fVisits, setFVisits] = useState<futureVisit[]>([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch(API_URL + 'pastvisits')
          .then(response => response.json())
          .then(json => setPVisits(json))
          .catch(error => console.error('Error fetching data:', error)); // Add error handling
        
        fetch(API_URL + 'futurevisits')
        .then(response => response.json())
        .then(json => setFVisits(json))
        .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to fetch data once on mount

    useEffect(() =>{
        setLoaded(pVisits && pVisits.length > 0);
    }, [pVisits])

    return(
            
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Recruitment Summary</Text>

            <View style={[styles.list_container, {flex: 0}]}>
                <RecruitmentSummary/>
            </View>
            
            <Text style={styles.heading}>Visits</Text>

            <ScrollView style={styles.list_container}>
                {loaded ? (
                    pVisits.map(v => (
                        <PastVisitBox key={v.visit_id} data={v} /> // Ensure visit_id is unique
                    ))
                ) : (
                    <LoadingSpinner/>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>+ Add New Visit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
