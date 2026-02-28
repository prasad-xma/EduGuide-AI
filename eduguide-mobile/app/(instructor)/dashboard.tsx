import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InstructorTabBar from "@/components/navigation/InstructorTabBar";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useFocusEffect } from "expo-router";

export default function InstructorDashboard() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstructorCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/course`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.data?.data) {
        setCourses(res.data.data);
      }
    } catch (error: any) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInstructorCourses();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>

      {/* header */}
      <View style={{
        paddingHorizontal: spacing * 2,
        paddingVertical: spacing * 3,
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <TouchableOpacity style={{
            width: spacing * 5,
            height: spacing * 5,
            borderRadius: spacing * 3,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F8F9FA",
          }}>
            <Octicons name="apps" size={22} color="#2C3E50" />
          </TouchableOpacity>

          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#2C3E50",
          }}>
            Dashboard
          </Text>

          <TouchableOpacity style={{
            width: spacing * 5,
            height: spacing * 5,
            borderRadius: spacing * 3,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F8F9FA",
          }}>
            <Octicons name="search" size={24} color="#2C3E50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* my courses */}
      <ScrollView style={{
        marginHorizontal: spacing * 2,
        marginBottom: spacing * 2,
      }}>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing,
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#2C3E50",
          }}>
            My Courses
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#2C3E50",
              paddingHorizontal: spacing * 2,
              paddingVertical: spacing * 1,
              borderRadius: spacing * 1.5,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => (router.replace as any)('/(instructor)/create-course')}
          >
            <Ionicons name="add-outline" size={16} color="#FFFFFF" />
            <Text style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "500",
              // marginLeft: spacing * 0.8,
              marginLeft: spacing * 0.5,
            }}>
              Create Course
            </Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={{
            alignItems: "center",
            paddingVertical: spacing * 4,
          }}>
            <Text style={{
              fontSize: 16,
              color: "#6C757D",
            }}>
              Loading courses...
            </Text>
          </View>
        ) : courses.length === 0 ? (
          <View style={{
            alignItems: "center",
            paddingVertical: spacing * 4,
          }}>
            <Text style={{
              fontSize: 16,
              color: "#6C757D",
              marginBottom: spacing,
            }}>
              No courses yet
            </Text>
            <Text style={{
              fontSize: 14,
              color: "#6C757D",
            }}>
              Create your first course to get started
            </Text>
          </View>
        ) : (
          courses.map((course: any) => (
            <View key={course._id || course.id} style={{
              backgroundColor: "#FFFFFF",
              padding: spacing * 2,
              borderRadius: spacing * 2,
              marginBottom: spacing * 1.5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: spacing,
              }}>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#2C3E50",
                    marginBottom: spacing * 0.5,
                  }}>
                    {course.title}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: "#6C757D",
                  }}>
                    {course.enrolledStudents ? course.enrolledStudents.length : 0} students
                  </Text>
                </View>
                <TouchableOpacity style={{
                  backgroundColor: "#F8F9FA",
                  paddingHorizontal: spacing * 1.5,
                  paddingVertical: spacing * 0.5,
                  borderRadius: spacing * 1,
                }}>
                  <Text style={{
                    fontSize: 12,
                    color: "#2C3E50",
                    fontWeight: "500",
                  }}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add padding for bottom tab bar */}
      <View style={{ height: spacing * 10 }} />

      </SafeAreaView>
      <InstructorTabBar />
    </View>
  );
}
