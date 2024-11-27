import { Stack } from "expo-router";
import { useEffect } from "react";
import { RootSiblingParent } from 'react-native-root-siblings';

const StackLayout = () => {
  
  return ( 
      <RootSiblingParent> 
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        </Stack>
      </RootSiblingParent>
  )
}
export default StackLayout;