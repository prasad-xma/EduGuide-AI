import { TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StudentTabBar from "@/components/navigation/StudentTabBar";
import { Octicons } from "@expo/vector-icons";

import { useState } from "react";
import RecommendedCoursesScreen from "@/components/recommended-courses";
import AllCoursesScreen from "@/components/all-courses";

export default function BrowseCoursesScreen() {
  const spacing = 10;
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "Recommended" },
    { id: 1, title: "All Courses" },
  ];

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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

        <View style={{ flex: 1 }}>
          {activeTab === 0 ? (
            <RecommendedCoursesScreen />
          ) : (
            <AllCoursesScreen />
          )}
        </View>
      </SafeAreaView>
      <StudentTabBar />
    </View>
  );
}
