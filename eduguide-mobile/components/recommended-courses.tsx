import { FlatList, TouchableOpacity, View, Alert, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { useRouter, useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecommendedCoursesScreen() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem('aiRecommendations');
      if (stored) {
        setRecommendations(JSON.parse(stored));
      } else {
        setRecommendations(null);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecommendations();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecommendations();
    }, [loadRecommendations])
  );

  const handleEnroll = async (courseId: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/enroll/${courseId}/enroll`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.data?.success) {
        Alert.alert('Success', 'Enrolled successfully!');
        router.replace('/(student)/homeScreen');
      } else {
        Alert.alert('Error', res.data?.message || 'Enrollment failed');
      }
    } catch (error: any) {
      console.error('Error enrolling course:', error);
      Alert.alert('Error', error.response?.data?.message || 'Enrollment failed');
    }
  };

  const renderCourseItem = ({ item }: any) => (
    <TouchableOpacity
      style={{
        height: 160,
        borderRadius: spacing * 2,
        backgroundColor: "#FFFFFF",
        padding: spacing * 2,
        marginHorizontal: spacing * 2,
        marginBottom: spacing * 2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View style={{
        flex: 1,
        justifyContent: "space-between",
      }}>
        <View>
          <Text style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#2C3E50",
            marginBottom: spacing * 0.5,
          }}>
            {item.title}
          </Text>
          <Text style={{
            fontSize: 14,
            color: "#6C757D",
            marginBottom: spacing,
          }}>
            {item.instructor?.firstName} {item.instructor?.lastName}
          </Text>
          
          <Text style={{
            fontSize: 14,
            color: "#6C757D",
            marginBottom: spacing,
          }}>
            {item.description}
          </Text>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <TouchableOpacity 
            style={{
              backgroundColor: "#2C3E50",
              paddingVertical: spacing * 1,
              paddingHorizontal: spacing * 2,
              borderRadius: spacing * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => handleEnroll(item._id)}
          >
            <Text style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "600",
            }}>
              Enroll
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: "#F8F9FA",
            borderRadius: spacing * 2,
            width: spacing * 5,
            height: spacing * 5,
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Ionicons 
              name="bookmark-outline"
              size={20}
              color="#2C3E50"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Text style={{
          fontSize: 16,
          color: "#6C757D",
        }}>
          Loading recommendations...
        </Text>
      </View>
    );
  }

  if (!recommendations) {
    return (
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing * 4,
      }}>
        <Text style={{
          fontSize: 16,
          color: "#6C757D",
          textAlign: "center",
          marginBottom: spacing,
        }}>
          No Recommendations Yet
        </Text>
        <Text style={{
          fontSize: 14,
          color: "#6C757D",
          textAlign: "center",
        }}>
          Get personalized course recommendations by telling us what you want to learn
        </Text>
        <TouchableOpacity
          onPress={() => router.push('/(student)/ai-recommendation' as any)}
          style={{
            backgroundColor: "#2C3E50",
            paddingVertical: spacing * 1.5,
            paddingHorizontal: spacing * 3,
            borderRadius: spacing * 2,
            marginTop: spacing * 2,
          }}
        >
          <Text style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: "bold",
          }}>
            Get Recommendations
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: spacing * 2 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: "bold",
          color: "#2C3E50",
          marginBottom: spacing,
        }}>
          Recommended Courses
        </Text>
      </View>
      <FlatList
        data={recommendations.recommendedCourses || []}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: spacing * 10,
        }}
      />
    </View>
  );
}
