import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InstructorTabBar from "@/components/navigation/InstructorTabBar";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCallback } from "react";

export default function ViewCourse() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/course/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data?.data) {
        setCourse(res.data.data);
      }
    } catch (error: any) {
      console.error('Error fetching course:', error);
      Alert.alert('Error', 'Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCourse();
    }, [id])
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading course...</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{
          paddingHorizontal: spacing * 2,
          paddingVertical: spacing * 3,
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <TouchableOpacity 
              onPress={() => router.replace('/(instructor)/my-courses')}
              style={{
                width: spacing * 5,
                height: spacing * 5,
                borderRadius: spacing * 3,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F8F9FA",
              }}
            >
              <Ionicons name="arrow-back" size={20} color="#2C3E50" />
            </TouchableOpacity>

            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#2C3E50",
            }}>
              Course Details
            </Text>

            <TouchableOpacity 
              onPress={() => router.push(`/(instructor)/edit-course/${id}` as any)}
              style={{
                width: spacing * 5,
                height: spacing * 5,
                borderRadius: spacing * 3,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F8F9FA",
              }}
            >
              <Ionicons name="create-outline" size={20} color="#2C3E50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Course Content */}
        <ScrollView 
          contentContainerStyle={{
            paddingVertical: spacing * 1.5,
            marginHorizontal: spacing * 2,
            paddingBottom: spacing * 10, 
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <View style={{
            marginBottom: spacing * 2,
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#2C3E50",
              marginBottom: spacing,
            }}>
              {course.title}
            </Text>
            <Text style={{
              fontSize: 14,
              color: "#6C757D",
            }}>
              {course.enrolledStudents ? course.enrolledStudents.length : 0} students enrolled
            </Text>
          </View>

          {/* Description */}
          <View style={{
            marginBottom: spacing * 2,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#2C3E50",
              marginBottom: spacing,
            }}>
              Description
            </Text>
            <Text style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 24,
            }}>
              {course.description}
            </Text>
          </View>

          {/* Content */}
          <View style={{
            marginBottom: spacing * 2,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#2C3E50",
              marginBottom: spacing,
            }}>
              Course Content
            </Text>
            <Text style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 24,
            }}>
              {course.content}
            </Text>
          </View>

          {/* Edit Button */}
          <TouchableOpacity
            style={{
              backgroundColor: "#2C3E50",
              paddingVertical: spacing * 2,
              borderRadius: spacing * 1.5,
              alignItems: "center",
              marginBottom: spacing * 2,
            }}
            onPress={() => router.push(`/(instructor)/edit-course/${id}` as any)}
          >
            <Text style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
            }}>
              Edit Course
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Add padding for bottom tab bar */}
        <View style={{ height: spacing * 10 }} />
      </SafeAreaView>
      <InstructorTabBar />
    </View>
  );
}
