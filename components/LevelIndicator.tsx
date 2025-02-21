import React from 'react';
import { View, Text, StyleSheet, Image, Platform, SafeAreaView, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const LevelIndicator = ({ level, onPress }: { level: number; onPress: () => void }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../assets/images/fox_icon.png')} // Replace with your icon path
            style={styles.icon} 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.levelText}>LEVEL {level}</Text>
          <View style={styles.indicatorLine} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { // Style for SafeAreaView
    position: 'absolute', // To allow absolute positioning within SafeAreaView
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: 'absolute', // Key for staying in top-left
    top: 20, // Adjust as needed (distance from safe area top)
    left: 20, // Adjust as needed
    flexDirection: 'row', // Icon and text side by side
    alignItems: 'center', // Vertically center content
    backgroundColor: Colors.pastelGreen, // Semi-transparent background
    borderRadius: 8, // Rounded corners
    padding: 10, // Padding inside
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10, // Ensure it's above other elements
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {},
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  indicatorLine: {
    height: 2,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 5,
    ...(Platform.OS === 'ios'
      ? {
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ccc',
        }
      : {
          // Android dashed line using a library or custom View
          // (See note below about dashed lines on Android)
        }),
  },
});

export default LevelIndicator;