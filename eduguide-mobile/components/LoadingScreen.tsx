import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FDF8F3',
    }}>
      <ActivityIndicator size="large" color="#2C3E50" />
      
      <Text style={{
        marginTop: 20,
        fontSize: 16,
        color: '#6C757D',
      }}>Loading...</Text>
    
    </View>
  );
};



export default LoadingScreen;
