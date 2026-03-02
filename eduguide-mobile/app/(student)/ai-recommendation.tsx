import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
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
        Alert.alert('Success', 'Recommendations generated!', [
          {
            text: 'View Recommended',
            onPress: () => router.replace('/(student)/browse-courses' as any),
          },
        ]);
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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F4F6F8' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 20,
            paddingVertical: 24,
            paddingBottom: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ width: '100%', maxWidth: 520 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#2C3E50', marginBottom: 20, textAlign: 'center' }}>
              AI Course Recommendations
            </Text>

            <View style={{ marginBottom: 20, width: '100%' }}>
              <Text style={{ fontSize: 16, color: '#2C3E50', marginBottom: 8 }}>
                What do you want to learn?
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  fontSize: 16,
                  backgroundColor: '#fff',
                  height: 120,
                  width: '100%',
                  textAlignVertical: 'top',
                }}
                placeholder="I want to become a software engineer, what courses should I take?"
                value={query}
                onChangeText={setQuery}
                multiline
                scrollEnabled
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
                width: '100%',
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
