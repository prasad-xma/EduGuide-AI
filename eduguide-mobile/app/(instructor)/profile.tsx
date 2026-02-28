import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InstructorTabBar from "@/components/navigation/InstructorTabBar";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Text } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export default function InstructorProfile() {
  const spacing = 10;
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout", 
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  const menuItems = [
    { id: 1, icon: 'person-outline' as const, title: 'Personal Information', onPress: () => {} },
    { id: 2, icon: 'book-outline' as const, title: 'My Courses', onPress: () => {} },
    { id: 3, icon: 'people-outline' as const, title: 'My Students', onPress: () => {} },
    { id: 4, icon: 'bar-chart-outline' as const, title: 'Analytics', onPress: () => {} },
    { id: 5, icon: 'settings-outline' as const, title: 'Settings', onPress: () => {} },
    { id: 6, icon: 'help-circle-outline' as const, title: 'Help & Support', onPress: () => {} },
  ];

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
            Profile
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

      {/* Profile Info */}
      <View style={{
        alignItems: "center",
        marginVertical: spacing * 3,
      }}>
        <View style={{
          width: spacing * 12,
          height: spacing * 12,
          borderRadius: spacing * 6,
          backgroundColor: "#2C3E50",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: spacing * 2,
        }}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        
        <Text style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#2C3E50",
          marginBottom: spacing * 0.5,
        }}>
          {user?.username || 'Instructor'}
        </Text>
        
        <Text style={{
          fontSize: 14,
          color: "#6C757D",
          marginBottom: spacing,
        }}>
          Instructor • EduGuide AI
        </Text>

        <View style={{
          flexDirection: "row",
          gap: spacing * 2,
        }}>
          <View style={{
            alignItems: "center",
            backgroundColor: "#F8F9FA",
            paddingHorizontal: spacing * 2,
            paddingVertical: spacing,
            borderRadius: spacing * 1.5,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#2C3E50",
            }}>8</Text>
            <Text style={{
              fontSize: 12,
              color: "#6C757D",
            }}>Courses</Text>
          </View>
          
          <View style={{
            alignItems: "center",
            backgroundColor: "#F8F9FA",
            paddingHorizontal: spacing * 2,
            paddingVertical: spacing,
            borderRadius: spacing * 1.5,
          }}>
            <Text style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#2C3E50",
            }}>156</Text>
            <Text style={{
              fontSize: 12,
              color: "#6C757D",
            }}>Students</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView 
        contentContainerStyle={{
          paddingVertical: spacing * 1.5,
          marginHorizontal: spacing * 2,
          paddingBottom: spacing * 10, // Add padding for bottom tab bar
        }}
        showsVerticalScrollIndicator={false}
      >
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
              padding: spacing * 2,
              marginBottom: spacing * 1.5,
              borderRadius: spacing * 2,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={item.onPress}
          >
            <View style={{
              width: spacing * 5,
              height: spacing * 5,
              borderRadius: spacing * 2.5,
              backgroundColor: "#F8F9FA",
              alignItems: "center",
              justifyContent: "center",
              marginRight: spacing * 2,
            }}>
              <Ionicons name={item.icon} size={20} color="#2C3E50" />
            </View>
            
            <Text style={{
              flex: 1,
              fontSize: 16,
              color: "#2C3E50",
              fontWeight: "500",
            }}>
              {item.title}
            </Text>
            
            <Ionicons name="chevron-forward" size={20} color="#6C757D" />
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: spacing * 2,
            borderRadius: spacing * 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            borderWidth: 1,
            borderColor: "#FF3B30",
          }}
          onPress={handleLogout}
        >
          <View style={{
            width: spacing * 5,
            height: spacing * 5,
            borderRadius: spacing * 2.5,
            backgroundColor: "#FFF5F4",
            alignItems: "center",
            justifyContent: "center",
            marginRight: spacing * 2,
          }}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
          </View>
          
          <Text style={{
            flex: 1,
            fontSize: 16,
            color: "#FF3B30",
            fontWeight: "600",
          }}>
            Logout
          </Text>
          
          <Ionicons name="chevron-forward" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </ScrollView>

      </SafeAreaView>
      <InstructorTabBar />
    </View>
  );
}
