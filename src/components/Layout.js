// src/components/Layout.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
export default function Layout({ children }) {
  return (
    <View style={styles.container}>
      <Header title="Dtechel" />
      <View style={styles.content}>
        {children}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
