import { Text, View, Image, StyleSheet, SafeAreaView } from "react-native";

export default function HeaderImage() {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Image
        source={require('@/assets/images/shad-logo.png')} // Replace with your image URL
          style={styles.headerImage}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    verticalAlign: 'middle',
    // paddingVertical: 10,
  },
  headerImage: {
    width: 180,
    height: 60,
    transform: [{scale: 0.7},],
  },
})