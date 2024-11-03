import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity,
   StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import SchoolDetailBox from '@/components/SchoolDetailBox';
import SummaryGraph from '@/components/SummaryGraph'; 
import {styles} from '@/assets/styles';

const screenWidth = Dimensions.get('window').width;

export default function Home() {

  const schoolData = [
    {name : "Central High", address: "123 Elm Street", type: "Public High School"},
    {name : "Maple Academy", address: "456 Maple Avenue", type: "Private Academy"},
    {name : "Oak Charter", address: "789 Oak Boulevard", type: "Charter School"},
    
  ]
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.heading}>Dashboard</Text>
        </View>
        <SummaryGraph/>
        {/* Header */}
        <View style={myStyles.header}>
          <Text style={styles.heading}>Recent Visits</Text>
          <FontAwesome name="user-circle" size={40} color={styles.headerIcon.color} />
        </View>

        {/* School list */}
        <View style={styles.list_container}>
          {/* <SchoolDetailBox data={schoolData}/> */}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontFamily: 'Archivo-Regular',
    color: '#613493',
  },
  headerIcon: {
    color: '#613493',
  },
  
  contactButton: {
    backgroundColor: '#613493',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  contactText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 16,
    textAlign: 'center',
  },
});
