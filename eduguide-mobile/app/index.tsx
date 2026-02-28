import { Text, View, TouchableOpacity, Image, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import "react-native-css-interop/jsx-runtime";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/LoadingScreen";

export default function Index() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{
      flex: 1,
      // backgroundColor: "#FDF8F3",
      backgroundColor: "#ffffff",
      position: "relative",
    }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDF8F3" />

      {/* Main content */}
      <View style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
        paddingBottom: 40,
      }}>
        
        {/* Top content - Image and text */}
        <View style={{
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}>
          <View style={{
            width: 280,
            height: 280,
            marginBottom: 40,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Image
              source={require("../assets/images/auth/get-start.png")}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="contain"
            />
          </View>

          {/* Welcome text */}
          <Text style={{
            fontSize: 36,
            fontWeight: "700",
            color: "#2C3E50",
            marginBottom: 16,
            textAlign: "center",
            letterSpacing: -0.5,
          }}>
            Welcome
          </Text>

          <Text style={{
            fontSize: 16,
            color: "#6C757D",
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 48,
            paddingHorizontal: 20,
          }}>
            Stay organised and live stress-free with { "\n" }
            <Text 
              style={{ 
                fontWeight: "700", 
                color: "#164676" 
              }}>
              EduGuide AI
            </Text>
          </Text>
        </View>

        <View style={{
          width: "100%",
          alignItems: "center",
          marginVertical: 20,
        }}>
          {/* Sign Up Button */}
          <TouchableOpacity 
            style={{
              backgroundColor: "#2C3E50",
              paddingHorizontal: 48,
              paddingVertical: 16,
              // marginVertical: 20,
              borderRadius: 25,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#2C3E50",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
              minWidth: 140,
              marginBottom: 20,
            }}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.8}
          >
            <Text style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: "600",
              marginRight: 8,
            }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Login link */}
          <View style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
            <Text style={{
              fontSize: 14,
              color: "#6C757D",
            }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={{
                fontSize: 14,
                color: "#2C3E50",
                fontWeight: "600",
              }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
