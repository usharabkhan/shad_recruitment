import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const schoolDetails = {
  name: 'Greenwood High School',
  address: '123 Maple Street, Cityville, AB',
  visitDate: 'November 15, 2024',
  contactPerson: 'Ms. Sarah Thompson',
  phone: '(555) 123-4567',
  email: 'sthomp@example.com',
};

interface futureVisit {
  visit_id: number,
  date: Date,
  name: string,
  address: string,
  contact: string
}

interface props {
  data: futureVisit
}
const SchoolVisit = ( { data } : props) => {  
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',  // Use 'numeric' for full year (e.g., 2024)
    month: 'long',    // Use 'long' for full month name (e.g., September)
    day: 'numeric'    // Use 'numeric' for day of the month
  });
  return (
    <TouchableOpacity style={styles.visitcontainer}>
      <Text style={styles.header}>{formattedDate}</Text>
      <Text style={styles.info}>{data.name}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.info}>{data.address}</Text>
      <Text style={styles.label}>Contact Person:</Text>
      <Text style={styles.info}>{data.contact}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    visitcontainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Inter',
    marginBottom: 10,
    color: '#613493', // Using your button color
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'Inter',
    marginTop: 10,
    color: '#333',
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});

export default SchoolVisit;
