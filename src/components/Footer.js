// src/components/Footer.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function Footer() {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="home-outline" size={width * 0.065} color="#FFFFFF" />
        <Text style={styles.iconLabel}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="chatbubble-ellipses-outline" size={width * 0.065} color="#FFFFFF" />
        <Text style={styles.iconLabel}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Icon name="settings-outline" size={width * 0.065} color="#FFFFFF" />
        <Text style={styles.iconLabel}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: width * 0.18,
    backgroundColor: '#000000', // black
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    color: '#FFFFFF', // white
    fontSize: width * 0.03,
    marginTop: 4,
  },
});
