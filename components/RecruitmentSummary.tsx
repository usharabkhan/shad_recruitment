import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { PURPLE_COLOR, RED_COLOR } from '@/app/constants/constant';

interface summaryData {
  total_schools: number;
  total_visits: number;
  total_students: number;
  future_visits: number;
}

interface props {
  data: summaryData
}

const RecruitmentSummary = ({ data }: { data: any }) => {
  return (
    
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Recruitment Summary</Text> */}
      
      <View style={styles.summaryItem}>
        <MaterialIcons name="school" size={24} color={RED_COLOR} />
        <Text style={styles.label}>Schools Contacted:</Text>
        <Text style={styles.value}>{data.total_schools}</Text>
      </View>

      <View style={styles.summaryItem}>
        <FontAwesome5 name="map-marker-alt" size={20} color="#4caf50" />
        <Text style={styles.label}>Schools Visited:</Text>
        <Text style={styles.value}>{data.total_visits}</Text>
      </View>

      <View style={styles.summaryItem}>
        <MaterialIcons name="event" size={24} color={PURPLE_COLOR} />
        <Text style={styles.label}>Future Visits:</Text>
        <Text style={styles.value}>{data.future_visits}</Text>
      </View>

      <View style={styles.summaryItem}>
        <FontAwesome5 name="users" size={20} color="#ff9800" />
        <Text style={styles.label}>Total Interactions:</Text>
        <Text style={styles.value}>{data.total_students}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(97, 52, 147, 0.5)',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#613493',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Archivo-Regular',
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#555',
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Inter',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RecruitmentSummary;