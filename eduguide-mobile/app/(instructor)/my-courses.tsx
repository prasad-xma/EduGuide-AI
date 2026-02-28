import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";

export default function MyCoursesScreen() {
  const { token } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyCourses = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(res.data?.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyCourses();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F4F6F8" }}>
      {/* Header */}
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#2C3E50" }}>
          My Courses
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(instructor)/create-course")}
          style={{
            backgroundColor: "#2C3E50",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="add-outline" size={18} color="#fff" />
          <Text style={{ color: "#fff", marginLeft: 5 }}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        <ScrollView 
          style={{ paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
        {loading ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            Loading courses...
          </Text>
        ) : courses.length === 0 ? (
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Text style={{ fontSize: 16, color: "#6C757D" }}>
              No courses yet
            </Text>
            <Text style={{ color: "#6C757D" }}>
              Create your first course
            </Text>
          </View>
        ) : (
          courses.map((course) => (
            <View
              key={course._id}
              style={{
                backgroundColor: "#FFFFFF",
                padding: 16,
                borderRadius: 12,
                marginBottom: 14,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#2C3E50",
                  marginBottom: 6,
                }}
              >
                {course.title}
              </Text>

              <Text style={{ fontSize: 14, color: "#6C757D" }}>
                {course.description}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  color: "#6C757D",
                }}
              >
                {course.enrolledStudents ? course.enrolledStudents.length : 0} students enrolled
              </Text>

              {/* Actions */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 12,
                }}
              >
                <TouchableOpacity
                  onPress={() => (router.replace as any)(`/(instructor)/edit-course/${course._id}`)}
                  style={{
                    backgroundColor: "#E9ECEF",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: "#2C3E50" }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#2C3E50",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text style={{ color: "#FFFFFF" }}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      </View>
    </SafeAreaView>
  );
}
