import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '@/assets/styles'; // Assuming you're using the same styles as in the previous example
import { useRouter } from 'expo-router';

interface visit {
  visit_id: number;
  school_id: number;
  date: Date;
  students: number;
  name: string;
}

interface PastVisitBoxProps {
  data: visit;
}

const PastVisitBox = ( { data } : PastVisitBoxProps) => {
  const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',  // Use 'numeric' for full year (e.g., 2024)
    month: 'long',    // Use 'long' for full month name (e.g., September)
    day: 'numeric'    // Use 'numeric' for day of the month
});
  const router = useRouter();
  const handlePress = () => {
      router.push(`/details/${data.school_id}`);
  };

  return (
    <TouchableOpacity  style={styles.visitcontainer} onPress={handlePress}>
        <Text style={styles.schoolName}>{data.name}</Text>
        <Text style={styles.schoolDetails}>Visited on: {formattedDate}</Text>
        <Text style={styles.schoolDetails}>Attendance: {data.students}</Text>
    </TouchableOpacity>
  );
};

export default PastVisitBox;
