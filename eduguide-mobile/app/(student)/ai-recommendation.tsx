import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/utils/api';

export default function AIRecommendation() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const router = useRouter();
  const { token } = useAuth();

  const generateRecommendations = async () => {
    if (!query.trim()) {
      Alert.alert('Error', 'Please enter what you want to learn');
      return;
    }

    setLoading(true);
    try {
      console.log('Using token:', token ? 'Token exists' : 'No token');
      const response = await fetch(`${API_BASE_URL}/api/ai-recommendation/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem('aiRecommendations', JSON.stringify(data.data));
        setRecommendations(data.data);
        Alert.alert('Success', 'Recommendations generated! Check the Recommended tab.');
      } else {
        Alert.alert('Error', data.message || 'Failed to generate recommendations');
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ 
        flex: 1,
        backgroundColor: '#F4F6F8',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 100
      }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20 }}>
        AI Course Recommendations
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 16, color: '#2C3E50', marginBottom: 8 }}>
          What do you want to learn?
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 8,
            padding: 15,
            fontSize: 16,
            backgroundColor: '#fff',
            minHeight: 100,
            textAlignVertical: 'top',
          }}
          placeholder="I want to become a software engineer, what courses should I take?"
          value={query}
          onChangeText={setQuery}
          multiline
        />
      </View>

      <TouchableOpacity
        onPress={generateRecommendations}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#2C3E50',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            Get Recommendations
          </Text>
        )}
      </TouchableOpacity>

      {loading && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ color: '#666', marginBottom: 10 }}>
            Generating personalized recommendations...
          </Text>
          <ActivityIndicator size="large" color="#2C3E50" />
        </View>
      )}
    </View>
  );
}
