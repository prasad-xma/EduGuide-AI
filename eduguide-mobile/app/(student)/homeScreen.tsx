import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StudentTabBar from "@/components/navigation/StudentTabBar";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const spacing = 10;

  const [activeTag, setActiveTag] = useState<number>(0);

  const tags = [
    { id: 0, title: "All Courses" },
    { id: 1, title: "In Progress" },
    { id: 2, title: "Completed" },
    { id: 3, title: "Bookmarked" },
  ];

  const courses = [
    { id: 1, title: "Mathematics 101", instructor: "Dr. Smith", progress: 75 },
    { id: 2, title: "Physics Basics", instructor: "Prof. Johnson", progress: 30 },
    { id: 3, title: "Chemistry Lab", instructor: "Dr. Brown", progress: 90 },
  ];

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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{
        marginVertical: spacing * 2,
        marginHorizontal: spacing * 2,
      }}>
        {tags.map((tag) => (
          <TouchableOpacity style={{
            backgroundColor: activeTag === tag.id
              ? "#2C3E50" 
              : "#F8F9FA",
            paddingVertical: spacing * 2,
            paddingHorizontal: spacing * 3,
            borderRadius: spacing * 5,
            marginRight: spacing,
          }}
            onPress={() => setActiveTag(tag.id)}
            key={tag.id}
          >
            <Text style={{
              fontWeight: activeTag === tag.id ? "bold" : "normal",
              color: activeTag === tag.id ? "#FFFFFF" : "#6C757D",
            }}>
              {tag.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* main content */}
      <ScrollView 
        contentContainerStyle={{
          paddingVertical: spacing * 1.5,
          marginHorizontal: spacing * 2,
          paddingBottom: spacing * 10, // Add padding for bottom tab bar
        }}
        showsVerticalScrollIndicator={false}
      >
        {courses.map((course) => (
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
            key={course.id}
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
                  {course.instructor}
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
        ))}
      </ScrollView>

      </SafeAreaView>
      <StudentTabBar />
    </View>
  );
}