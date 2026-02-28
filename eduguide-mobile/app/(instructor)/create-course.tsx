import { ScrollView, TouchableOpacity, View, Alert, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InstructorTabBar from "@/components/navigation/InstructorTabBar";
import { Octicons } from "@expo/vector-icons";

import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function CreateCourse() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async () => {
    if (!formData.title || !formData.description || !formData.content) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/course`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.data?.data) {
        Alert.alert('Success', 'Course created successfully!');
        (router.replace as any)('/(instructor)/my-courses');
      }
      // console.log(res.data);

    } catch (error) {
      const axiosError = error as any;
      const errorMessage = axiosError?.response?.data?.message || 'Failed to create course';
      //console.log(errorMessage);      

      Alert.alert('Error', errorMessage);
    
    } finally {
      setLoading(false);
    }
  };

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
            <Octicons name="apps" size={22} color="#2C3E50" />
          </TouchableOpacity>

          <Text style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#2C3E50",
          }}>
            Create Course
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

      {/* form */}
      <ScrollView 
        contentContainerStyle={{
          paddingVertical: spacing * 1.5,
          marginHorizontal: spacing * 2,
          paddingBottom: spacing * 10, 
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* title */}
        <View style={{
          marginBottom: spacing * 2,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#2C3E50",
            marginBottom: spacing,
          }}>
            Course Title *
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              borderRadius: spacing,
              paddingHorizontal: spacing * 1.5,
              paddingVertical: spacing * 1.2,
              fontSize: 16,
              backgroundColor: "#FFFFFF",
              color: "#2C3E50",
            }}
            placeholder="Enter course title"
            placeholderTextColor="#999"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </View>

        {/* description */}
        <View style={{
          marginBottom: spacing * 2,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#2C3E50",
            marginBottom: spacing,
          }}>
            Description *
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              borderRadius: spacing,
              paddingHorizontal: spacing * 1.5,
              paddingVertical: spacing * 1.2,
              fontSize: 16,
              backgroundColor: "#FFFFFF",
              color: "#2C3E50",
              height: spacing * 8,
              textAlignVertical: "top",
            }}
            placeholder="Enter course description"
            placeholderTextColor="#999"
            multiline
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
        </View>

        {/* content */}
        <View style={{
          marginBottom: spacing * 3,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#2C3E50",
            marginBottom: spacing,
          }}>
            Course Content *
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#E0E0E0",
              borderRadius: spacing,
              paddingHorizontal: spacing * 1.5,
              paddingVertical: spacing * 1.2,
              fontSize: 16,
              backgroundColor: "#FFFFFF",
              color: "#2C3E50",
              height: spacing * 8,
              textAlignVertical: "top",
            }}

            placeholder="Enter course content"
            placeholderTextColor="#999"
            multiline
            value={formData.content}
            onChangeText={(text) => setFormData({ ...formData, content: text })}
          />
        </View>

        {/* create button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2C3E50",
            paddingVertical: spacing * 2,
            borderRadius: spacing * 2,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: "#2C3E50",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
          onPress={handleCreateCourse}
          disabled={loading}
        >
          <Text style={{
            color: "#FFFFFF",
            fontSize: 16,
            fontWeight: "600",
          }}>
            {loading ? 'Creating...' : 'Create Course'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      </SafeAreaView>
      <InstructorTabBar />
    </View>
  );
}
