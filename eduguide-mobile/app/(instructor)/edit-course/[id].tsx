import { ScrollView, TouchableOpacity, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InstructorTabBar from "@/components/navigation/InstructorTabBar";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function EditCourse() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [courseLoading, setCourseLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
  });

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
        setFormData({
          title: res.data.data.title || '',
          description: res.data.data.description || '',
          content: res.data.data.content || '',
        });
      }
    } catch (error: any) {
      console.error('Error fetching course:', error);
      
      Alert.alert('Error', 'Failed to load course');
    
    } finally {
      setCourseLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.content.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`${API_BASE_URL}/api/course/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      Alert.alert('Success', 'Course updated successfully!');
      (router.replace as any)('/(instructor)/my-courses');
    
    } catch (error: any) {
      console.error('Error updating course:', error);
      const errorMessage = error?.response?.data?.message || 'Failed to update course';
      
      Alert.alert('Error', errorMessage);

    } finally {
      setLoading(false);
    }
  };

  if (courseLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading course...</Text>
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
            <TouchableOpacity style={{
              width: spacing * 5,
              height: spacing * 5,
              borderRadius: spacing * 3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F8F9FA",
            }}>
              <Text style={{
                fontSize: 16,
                color: "#2C3E50",
              }}>←</Text>
            </TouchableOpacity>

            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#2C3E50",
            }}>
              Edit Course
            </Text>

            <TouchableOpacity style={{
              width: spacing * 5,
              height: spacing * 5,
              borderRadius: spacing * 3,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F8F9FA",
            }}>
              <Text style={{
                fontSize: 16,
                color: "#2C3E50",
              }}>⚙</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
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
              fontSize: 16,
              fontWeight: "bold",
              color: "#2C3E50",
              marginBottom: spacing,
            }}>
              Course Title
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E9ECEF",
                borderRadius: spacing,
                padding: spacing * 1.5,
                fontSize: 16,
                backgroundColor: "#FFFFFF",
              }}
              placeholder="Enter course title"
              value={formData.title}
              onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
              multiline={false}
            />
          </View>

          {/* Description */}
          <View style={{
            marginBottom: spacing * 2,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#2C3E50",
              marginBottom: spacing,
            }}>
              Description
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E9ECEF",
                borderRadius: spacing,
                padding: spacing * 1.5,
                fontSize: 16,
                backgroundColor: "#FFFFFF",
                height: 100,
                textAlignVertical: "top",
              }}
              placeholder="Enter course description"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              multiline={true}
            />
          </View>

          {/* Content */}
          <View style={{
            marginBottom: spacing * 2,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#2C3E50",
              marginBottom: spacing,
            }}>
              Course Content
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#E9ECEF",
                borderRadius: spacing,
                padding: spacing * 1.5,
                fontSize: 16,
                backgroundColor: "#FFFFFF",
                height: 150,
                textAlignVertical: "top",
              }}
              placeholder="Enter course content"
              value={formData.content}
              onChangeText={(text) => setFormData(prev => ({ ...prev, content: text }))}
              multiline={true}
            />
          </View>

          {/* Update Button */}
          <TouchableOpacity
            style={{
              backgroundColor: loading ? "#6C757D" : "#2C3E50",
              paddingVertical: spacing * 2,
              borderRadius: spacing * 1.5,
              alignItems: "center",
              marginBottom: spacing * 2,
            }}
            onPress={handleUpdateCourse}
            disabled={loading}
          >
            <Text style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "bold",
            }}>
              {loading ? "Updating..." : "Update Course"}
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
