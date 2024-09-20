//PhungCanhTuan
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserProfile from "./screens/UserProfile"; 
import MyCourses from "./screens/MyCourses";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MyCourses"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="MyCourses" component={MyCourses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});