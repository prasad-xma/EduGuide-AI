import { API_BASE_URL } from '@/utils/api';
import axios from 'axios';
import { useRouter } from 'expo-router'
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const router  = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!formData.username || !formData.password) {
      Alert.alert('Error', 'Please enter username and password...');
      return;
    }

    setLoading(true);
  
    try {

      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username: formData.username,
        password: formData.password
      });

      if (res.data?.data?.token) {

        const token = res.data.data.token;
        // console.log(token);

        // Use AuthContext login method
        await login(token);

        Alert.alert('Success', 'Login Successful!');

        // Navigation will be handled by AuthContext
      } else {
        console.log('Unexpected response structure:', res.data);
        Alert.alert('Login Failed', 'Unexpected response from server');
      }
      
    } catch (error) {
      console.log('Login error:', error);
      const errMessage = error instanceof Error ? error.message : 'Login Failed';
      const axiosError = error as any;

      // Show more detailed error message if available
      const errorMessage = axiosError?.response?.data?.message || errMessage;
      Alert.alert('Login Failed', errorMessage);

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FDF8F3',
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF8F3" />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={{
          alignItems: 'center',
          marginTop: 60,
          marginBottom: 20,
        }}>
          {/* 
          <Image
            source={require("../../assets/images/auth/login.png")}
            style={{
              width: 300,
              height: 300,
            }}
            resizeMode="contain"
          /> */}
        </View>

        <KeyboardAvoidingView>
          <View style={{
            paddingHorizontal: 32,
          }}>

            {/* title */}
            <Text style={{
              fontSize: 28,
              fontWeight: '700',
              color: '#164676',
              marginBottom: 8,
              textAlign: 'center',
            }}>
              Welcome Back
            </Text>

            <Text style={{
              fontSize: 14,
              color: '#6C757D',
              textAlign: 'center',
              marginBottom: 30,
            }}>
              Sign in to continue to EduGuide AI
            </Text>

            {/* username */}
            <Text style={{
              fontSize: 14,
              color: '#2C3E50',
              marginBottom: 6,
              fontWeight: '500',
            }}>
              Username
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 14,
                backgroundColor: '#FFFFFF',
                color: '#2C3E50',
                marginBottom: 16,
              }}
              placeholder="Enter your username"
              placeholderTextColor="#999"
              value={formData.username}
              onChangeText={(text) => setFormData({ ...formData, username: text })}
            />

            {/* password */}
            <Text style={{
              fontSize: 14,
              color: '#2C3E50',
              marginBottom: 6,
              fontWeight: '500',
            }}>
              Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 12,
                fontSize: 14,
                backgroundColor: '#FFFFFF',
                color: '#2C3E50',
                marginBottom: 30,
              }}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
            />

            {/* login button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#2C3E50',
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: 'center',
                marginBottom: 20,
                shadowColor: '#2C3E50',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
              }}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: '600',
              }}>
                {loading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* register link */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40,
            }}>
              <Text style={{
                fontSize: 14,
                color: '#6C757D',
              }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={{
                  fontSize: 14,
                  color: '#164676',
                  fontWeight: '600',
                }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardAvoidingView>

      </ScrollView>
    </View>
  )
}
