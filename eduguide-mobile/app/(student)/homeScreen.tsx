import { TouchableOpacity, View, ScrollView, Text, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StudentTabBar from "@/components/navigation/StudentTabBar";
import { Ionicons, Octicons } from "@expo/vector-icons";

import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import axios from "axios";
import { useRouter, useFocusEffect } from "expo-router";

export default function HomeScreen() {
  const spacing = 10;
  const { token } = useAuth();

  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEnrolledCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/enroll/student`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (res.data?.data) {
        setEnrolledCourses(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchEnrolledCourses();
  };

  useFocusEffect(
    useCallback(() => {
      fetchEnrolledCourses();
    }, [])
  );

  const renderCourseItem = ({ item }: any) => (
    <TouchableOpacity
      style={{
        height: 180,
        marginRight: spacing * 2,
        borderRadius: spacing * 2,
        backgroundColor: "#FFFFFF",
        padding: spacing * 2,
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
          
          {/* Progress bar */}
          <View style={{
            height: 6,
            backgroundColor: "#E9ECEF",
            borderRadius: 3,
            marginBottom: spacing * 0.5,
          }}>
            <View style={{
              height: "100%",
              width: `${item.progress}%`,
              backgroundColor: "#2C3E50",
              borderRadius: 3,
            }} />
          </View>
          <Text style={{
            fontSize: 12,
            color: "#6C757D",
          }}>
            {item.progress}% Complete
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
          >
            <Text style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "600",
            }}>
              Continue
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

            {/* search icon */}
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
            Find Your Perfect Course
          </Text>

          <Text style={{
            fontSize: 14,
            color: "#6C757D",
            marginTop: spacing * 0.5,
          }}>
            Discover the best courses for you
          </Text>
        </View>

        {/* main content */}
        <ScrollView 
          contentContainerStyle={{
            paddingVertical: spacing * 1.5,
            marginHorizontal: spacing * 2,
            paddingBottom: spacing * 10,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <View style={{
              alignItems: "center",
              paddingVertical: spacing * 4,
            }}>
              <Text style={{
                fontSize: 16,
                color: "#6C757D",
              }}>
                Loading enrolled courses...
              </Text>
            </View>
          ) : enrolledCourses.length === 0 ? (
            <View style={{
              alignItems: "center",
              paddingVertical: spacing * 4,
            }}>
              <Text style={{
                fontSize: 16,
                color: "#6C757D",
                marginBottom: spacing,
              }}>
                No enrolled courses yet
              </Text>
              <Text style={{
                fontSize: 14,
                color: "#6C757D",
              }}>
                Browse courses to get started
              </Text>
            </View>
          ) : (
            enrolledCourses.map((course: any) => (
              <TouchableOpacity
                style={{
                  height: 180,
                  marginRight: spacing * 2,
                  borderRadius: spacing * 2,
                  backgroundColor: "#FFFFFF",
                  padding: spacing * 2,
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
                key={course._id}
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
                      {course.title}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: "#6C757D",
                      marginBottom: spacing,
                    }}>
                      {course.instructor?.firstName} {course.instructor?.lastName}
                    </Text>
                    
                    {/* Progress bar */}
                    <View style={{
                      height: 6,
                      backgroundColor: "#E9ECEF",
                      borderRadius: 3,
                      marginBottom: spacing * 0.5,
                    }}>
                      <View style={{
                        height: "100%",
                        width: `${course.progress}%`,
                        backgroundColor: "#2C3E50",
                        borderRadius: 3,
                      }} />
                    </View>
                    <Text style={{
                      fontSize: 12,
                      color: "#6C757D",
                    }}>
                      {course.progress}% Complete
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
                    >
                      <Text style={{
                        color: "#FFFFFF",
                        fontSize: 14,
                        fontWeight: "600",
                      }}>
                        Continue
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
            ))
          )}
        </ScrollView>

      </SafeAreaView>
      <StudentTabBar />
    </View>
  );
}