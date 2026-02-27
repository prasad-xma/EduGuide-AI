import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, TextInput, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function RegisterScreen() {

  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    role: 'student'
  });
  
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // check if all fields are entered
    if (!formData.firstName || !formData.lastName || !formData.username || 
        !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      
      return;


    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      if (response.data.success) {
        Alert.alert('Success', 'Registration successful! Please login.', [
          { text: 'OK', onPress: () => router.push('/(auth)/login') }
        ]);

      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      const axiosError = error as any;

      Alert.alert('Error', axiosError.response?.data?.message || errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#FDF8F3',
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF8F3" />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={{
          alignItems: 'center',
          marginTop: 50,
          marginBottom: 20,
          // paddingVertical: 20,
        }}>
          <Image 
            source={require("../../assets/images/auth/register.png")}
            style={{
              // width: 200,
              width: 300,
              height: 400,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <KeyboardAvoidingView>
        <View style={{
          paddingHorizontal: 32,
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: '700',
            color: '#164676',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            Create Account
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: '#6C757D',
            textAlign: 'center',
            marginBottom: 30,
          }}>
            Join EduGuide AI and start learning
          </Text>

          {/* name */}
          <View style={{
            flexDirection: 'row',
            marginBottom: 16,
            gap: 12,
          }}>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 14,
                color: '#2C3E50',
                marginBottom: 6,
                fontWeight: '500',
              }}>
                First Name
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
                }}
                placeholder="First name"
                placeholderTextColor="#999"
                value={formData.firstName}
                onChangeText={(text) => setFormData({...formData, firstName: text})}
              />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 14,
                color: '#2C3E50',
                marginBottom: 6,
                fontWeight: '500',
              }}>
                Last Name
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
                }}
                placeholder="Last name"
                placeholderTextColor="#999"
                value={formData.lastName}
                onChangeText={(text) => setFormData({...formData, lastName: text})}
              />
            </View>
          </View>

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
            placeholder="Choose a username"
            placeholderTextColor="#999"
            value={formData.username}
            onChangeText={(text) => setFormData({...formData, username: text})}
          />

          {/* email */}
          <Text style={{
            fontSize: 14,
            color: '#2C3E50',
            marginBottom: 6,
            fontWeight: '500',
          }}>
            Email
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
            placeholder="your@email.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
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
              marginBottom: 20,
            }}
            placeholder="Create a password"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => setFormData({...formData, password: text})}
          />

          {/* role */}
          <Text style={{
            fontSize: 14,
            color: '#2C3E50',
            marginBottom: 12,
            fontWeight: '500',
          }}>
            I am a
          </Text>
          <View style={{
            flexDirection: 'row',
            marginBottom: 30,
            gap: 12,
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: formData.role === 'student' ? '#164676' : '#E0E0E0',
                backgroundColor: formData.role === 'student' ? '#F0F7FF' : '#FFFFFF',
              }}
              onPress={() => setFormData({ ...formData, role: 'student'})}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: formData.role === 'student' ? '#164676' : '#E0E0E0',
                backgroundColor: formData.role === 'student' ? '#164676' : '#FFFFFF',
                marginRight: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {formData.role === 'student' && (
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#FFFFFF',
                  }} />
                )}
              </View>
              <Text style={{
                fontSize: 14,
                color: '#2C3E50',
              }}>
                Student
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: formData.role === 'instructor' ? '#164676' : '#E0E0E0',
                backgroundColor: formData.role === 'instructor' ? '#F0F7FF' : '#FFFFFF',
              }}
              onPress={() => setFormData({...formData, role: 'instructor'})}
            >
              <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: formData.role === 'instructor' ? '#164676' : '#E0E0E0',
                backgroundColor: formData.role === 'instructor' ? '#164676' : '#FFFFFF',
                marginRight: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                {formData.role === 'instructor' && (
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#FFFFFF',
                  }} />
                )}
              </View>
              <Text style={{
                fontSize: 14,
                color: '#2C3E50',
              }}>
                Instructor
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register Button */}
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
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontWeight: '600',
            }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Login Link */}
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
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={{
                fontSize: 14,
                color: '#164676',
                fontWeight: '600',
              }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
