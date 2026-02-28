import { FlatList, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StudentTabBar from "@/components/navigation/StudentTabBar";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { useRouter } from "expo-router";

export default function BrowseCoursesScreen() {
  const spacing = 10;
  const { token } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 0, title: "Recommended" },
    { id: 1, title: "All Courses" },
  ];

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
        // Remove the course from available courses after enrollment
        setCourses(prev => prev.filter(course => course._id !== courseId));
        // Navigate to home screen to see enrolled courses
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

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>

        {/* app and search icons bar */}
        <View style={{
          paddingHorizontal: spacing * 2,
          paddingVertical: spacing * 3,
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
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

            <TouchableOpacity
              style={{
                height: spacing * 5,
                width: spacing * 5,
                backgroundColor: "#F8F9FA",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: spacing * 3,
              }}
            >
              <Octicons name="search" size={24} color="#2C3E50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* header */}
        <View style={{
          marginVertical: spacing * 1,
          marginHorizontal: spacing * 2.5,
        }}>
          <Text style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#2C3E50",
            width: "65%",
          }}>
            Browse Courses
          </Text>

          <Text style={{
            fontSize: 14,
            color: "#6C757D",
            marginTop: spacing * 0.5,
          }}>
            Discover and enroll in new courses
          </Text>
        </View>

        {/* tab headers */}
        <View style={{
          flexDirection: "row",
          marginVertical: spacing * 2,
          marginHorizontal: spacing * 2,
        }}>
          {tabs.map((tab) => (
            <TouchableOpacity 
              style={{
                backgroundColor: activeTab === tab.id
                  ? "#2C3E50" 
                  : "#F8F9FA",
                paddingVertical: spacing * 2,
                paddingHorizontal: spacing * 3,
                borderRadius: spacing * 5,
                marginRight: spacing,
              }}
              onPress={() => setActiveTab(tab.id)}
              key={tab.id}
            >
              <Text style={{
                fontWeight: activeTab === tab.id ? "bold" : "normal",
                color: activeTab === tab.id ? "#FFFFFF" : "#6C757D",
              }}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* main content */}
        {activeTab === 0 ? (
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
              Recommended Courses
            </Text>
            <Text style={{
              fontSize: 14,
              color: "#6C757D",
              textAlign: "center",
            }}>
              Personalized course recommendations will appear here
            </Text>
          </View>
        ) : (
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
        )}

      </SafeAreaView>
      <StudentTabBar />
    </View>
  );
}
