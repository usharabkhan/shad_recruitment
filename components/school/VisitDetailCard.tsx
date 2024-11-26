import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '@/assets/styles'; // Assuming you're using the same styles as in the previous example
import { useRouter } from 'expo-router';
import { SchoolVisit } from '@/app/constants/types';

interface VisitDetailCardProps {
  data: SchoolVisit;
  onTouch: () => void
}

const VisitDetailCard = ( { data, onTouch } : VisitDetailCardProps) => {
  const visitDate = new Date(data.date); 
  const isPastVisit = visitDate < new Date(); // Check if the visit date is in the past

  const ContainerStyle = [
    styles.visitcontainer,
    isPastVisit ? {
      backgroundColor: '#f9f9f9',
    } :
    {
      backgroundColor: '#e0f7fa',
    }
  ]
  const formattedDate = visitDate.toLocaleDateString('en-US', {
    year: 'numeric',  // Use 'numeric' for full year (e.g., 2024)
    month: 'long',    // Use 'long' for full month name (e.g., September)
    day: 'numeric'    // Use 'numeric' for day of the month
});
  const router = useRouter();
  const handlePress = () => {
      router.push(`/details/${data.school_id}`);
  };

  return (
    <TouchableOpacity  style={ContainerStyle} onPress={onTouch}>
        <Text style={styles.schoolName}>{data.name}</Text>
        {isPastVisit ? ( 
          <View>
            <Text style={styles.schoolDetails}>Visited on: {formattedDate || 'Never visited'}</Text>
            <Text style={styles.schoolDetails}>Attendance: {data.students || '0'}</Text>
          </View>
        ) : ( 
          <View>
            <Text style={styles.schoolDetails}>Scheduled on: {formattedDate || '1970'}</Text>
            <Text style={styles.schoolDetails}>Contact: {data.contact || 'No contact'}</Text>
          </View>
        )}
    </TouchableOpacity>
  );
};

export default VisitDetailCard;
