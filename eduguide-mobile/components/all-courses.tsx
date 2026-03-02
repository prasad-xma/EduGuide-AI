import { FlatList, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { useRouter } from "expo-router";

export default function AllCoursesScreen() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/enroll/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.data?.data) {
        setCourses(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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
        setCourses(prev => prev.filter(course => course._id !== courseId));
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
          Loading courses...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      renderItem={renderCourseItem}
      keyExtractor={(item) => item._id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: spacing * 1.5,
        paddingBottom: spacing * 10,
      }}
    />
  );
}
