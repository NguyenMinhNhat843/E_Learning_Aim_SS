//PhungCanhTuan
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import UserProfile from "./screens/UserProfile"; 
import MyCourses from "./screens/MyCourses";
import TeacherProfile from "./screens/teacherProfile";
import CourseDetails_OverView from "./screens/CourseDetails_OverView";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CourseDetails_OverView"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="MyCourses" component={MyCourses} />
        <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
        <Stack.Screen name="CourseDetails_OverView" component={CourseDetails_OverView} />
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