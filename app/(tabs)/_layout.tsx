import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Animated, Modal, Text } from 'react-native';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors'; // Import your color scheme
import { useColorScheme } from '../../components/useColorScheme';
import LevelIndicator from '../../components/LevelIndicator'; // Import the LevelIndicator component
import Profile from '../profile'; // Import the Profile component

// Import your images
import duckyIcon from '../../assets/images/ducky.png';
import graphIcon from '../../assets/images/graph.png';
import communityIcon from '../../assets/images/community.png';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const colorScheme = useColorScheme();
  const icons = [graphIcon, duckyIcon, communityIcon]; // Array of icons

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const scale = useRef(new Animated.Value(1)).current;

        useEffect(() => {
          Animated.timing(scale, {
            toValue: isFocused ? 1.2 : 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }, [isFocused]);

        const onPress = () => {
          const event = navigation.emit({
            type: 'TabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Animated.View
            key={route.key}
            style={[
              styles.tabButtonContainer,
              isFocused && styles.tabButtonContainerActive,
              { transform: [{ scale }] },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.tabButton,
                isFocused && styles.tabButtonActive,
                isFocused && styles.tabButtonActiveSize,
              ]}
              onPress={onPress}
            >
              <Image
                source={icons[index]}
                style={[styles.tabButtonImage, isFocused && styles.tabButtonImageActive]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLevelIndicatorPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <LevelIndicator level={1} onPress={handleLevelIndicatorPress} />
      <Tabs
        screenOptions={{
          // Remove default header
          headerShown: false
        }}
        tabBar={(props) => <CustomTabBar {...props} />} // Use the custom tab bar
      >
        {/* Your Tabs.Screen components here */}
        <Tabs.Screen name="two" options={{ title: 'Home' }} />
        <Tabs.Screen name="index" options={{ title: 'Profile' }} />
        <Tabs.Screen name="three" options={{ title: 'Settings' }} />
      </Tabs>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Profile />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#bcf9b8', // Or Colors[colorScheme ?? 'light'].background
    paddingVertical: 10,
    justifyContent: 'space-around', // Distribute buttons evenly
    borderTopWidth: 1,
    borderTopColor: '#ccc' // Example border color
  },
  tabButtonContainer: {
    backgroundColor: '#92ee8c', // Background color for the hard circle
    borderRadius: 50, // Make the outer container circular
    padding: 5, // Add padding to create the margin effect
    width: 70, // Default width
    height: 70, // Default height
    justifyContent: 'center', // Center the button horizontally
    alignItems: 'center', // Center the button vertically
  },
  tabButtonContainerActive: {
    width: 90, // Increase width when active
    height: 90, // Increase height when active
    borderRadius: 45, // Adjust border radius to maintain circular shape
    justifyContent: 'center', // Center the button horizontally
    alignItems: 'center', // Center the button vertically
  },
  tabButton: {
    borderRadius: 30, // Make the button circular
    width: 60, // Set width to make it a circle
    height: 60, // Set height to make it a circle
    justifyContent: 'center', // Center the image
    alignItems: 'center', // Center the image
    overflow: 'hidden', // Ensure the image is cropped to the circle
  },
  tabButtonActive: {
    backgroundColor: '#eee', // Highlight active tab
  },
  tabButtonActiveSize: {
    width: 70, // Increase width when active
    height: 70, // Increase height when active
    borderRadius: 35, // Adjust border radius to maintain circular shape
  },
  tabButtonImage: {
    width: '100%', // Set the width of the image to fill the button
    height: '100%', // Set the height of the image to fill the button
  },
  tabButtonImageActive: {
    // No tintColor to avoid solid color overlay
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});