import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecruitmentSummary = () => {
    const summaryData = {
        schoolsVisited: 5,
        interactions: 5,
        schoolsContacted: 50,
        futureVisits: 10,
    }
    
  return (
    <View style={styles.container}>
      <View style={styles.summaryItem}>
        <Text style={styles.label}>No. of Schools Visited:</Text>
        <Text style={styles.value}>{summaryData.schoolsVisited}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.label}>No. of Interactions:</Text>
        <Text style={styles.value}>{summaryData.interactions}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.label}>No. of Schools Contacted:</Text>
        <Text style={styles.value}>{summaryData.schoolsContacted}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.label}>Future Visits:</Text>
        <Text style={styles.value}>{summaryData.futureVisits}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    color: '#613493',
    fontFamily: 'Archivo-Regular',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default RecruitmentSummary;
