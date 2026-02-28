import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { Octicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";

export default function InstructorStudentsScreen() {
  const { token } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInstructorStudents = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/enroll/instructor/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data?.data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchInstructorStudents();
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
          My Students
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#F8F9FA",
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 8,
          }}
        >
          <Octicons name="search" size={18} color="#2C3E50" />
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
              Loading students...
            </Text>
          ) : students.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 60 }}>
              <Text style={{ fontSize: 16, color: "#6C757D" }}>
                No students enrolled yet
              </Text>
              <Text style={{ color: "#6C757D" }}>
                Students will appear here when they enroll in your courses
              </Text>
            </View>
          ) : (
            <View style={{ backgroundColor: "#FFFFFF", borderRadius: 12, padding: 16 }}>
              {/* Table Header */}
              <View style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: "#E0E0E0",
                paddingBottom: 12,
                marginBottom: 8,
              }}>
                <Text style={{ flex: 2, fontSize: 14, fontWeight: "bold", color: "#2C3E50" }}>
                  Student Name
                </Text>
                <Text style={{ flex: 2, fontSize: 14, fontWeight: "bold", color: "#2C3E50" }}>
                  Course Title
                </Text>
                <Text style={{ flex: 1, fontSize: 14, fontWeight: "bold", color: "#2C3E50" }}>
                  Progress
                </Text>
              </View>

              {/* Table Rows */}
              {students.map((student) => (
                <View
                  key={student._id}
                  style={{
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    borderBottomColor: "#F0F0F0",
                    paddingVertical: 12,
                  }}
                >
                  <Text style={{ flex: 2, fontSize: 14, color: "#2C3E50" }}>
                    {student.studentName}
                  </Text>
                  <Text style={{ flex: 2, fontSize: 14, color: "#6C757D" }}>
                    {student.courseTitle}
                  </Text>
                  <Text style={{ flex: 1, fontSize: 14, color: "#6C757D" }}>
                    {student.progress}%
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
