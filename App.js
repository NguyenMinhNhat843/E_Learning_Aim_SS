import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CourseInfo from './screens/Course_Info/Course_Info_main';
import Home from './screens/Home/Home';
import Search from './screens/Search/Search_page';
import Search_result from './screens/Search/Search_result';
import UserProfile from "./screens/UserProfile"; 
import MyCourses from "./screens/MyCourses";
import TeacherProfile from "./screens/teacherProfile";
import CourseDetails_OverView from "./screens/CourseDetails_OverView";
import CourseDetails_Review from "./screens/CourseDetails_Review";
import CourseDetails_Lession from "./screens/CourseDetails_Lession";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Search_result" component={Search_result} />
                <Stack.Screen name="CourseInfo" component={CourseInfo} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="MyCourses" component={MyCourses} />
                <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
                <Stack.Screen name="CourseDetails_OverView" component={CourseDetails_OverView} />
                <Stack.Screen name="CourseDetails_Review" component={CourseDetails_Review} />
                <Stack.Screen name="CourseDetails_Lession" component={CourseDetails_Lession} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
