import { Tabs } from "expo-router";
import {TabBarIcon } from "@/components/misc/TabBarIcon";
import  HeaderImage  from "@/components/misc/HeaderImage";
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import { useState, useEffect } from "react";
import { useFonts } from 'expo-font'

export default function Layout() {
    const [loaded] = useFonts({
      'Inter': require('../../assets/fonts/Inter_18pt-Regular.ttf'),
      'Archivo-Regular': require('../../assets/fonts/Archivo-Regular.ttf'),
    });

    if (!loaded) {
        return <View><Text>Loading...</Text></View>;
    }
  return (
        <Tabs
        screenOptions={{
          header: () => <HeaderImage/>,
          
          tabBarActiveBackgroundColor: '#E4D6FA', // Active tab color
          tabBarInactiveBackgroundColor: '#FFFFFF', // Inactive tab color
          tabBarStyle: {
            borderTopWidth: 0, // Remove border
          },
          tabBarLabelStyle: {
            color: '#613493',
            fontFamily: 'Inter',
            fontSize: 12,
          },
        }}>
            <Tabs.Screen
              name="home"
              options={{
                title: 'Dashboard',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color='#613493' />
                ),
              }}
            />
            <Tabs.Screen
            name="schools"
            options={{
              title: 'Schools',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'school' : 'school-outline'} color='#613493' />
              ),
            }}
            />
        </Tabs>
      )
        ;
}


