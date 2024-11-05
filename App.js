import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CourseInfo from './screens/Course_Info/Course_Info_main';
import Home from './screens/Home/Home';
import Course_inspires from './screens/Home/Course_inspires';
import Recomment_course from './screens/Home/Recomment_course';
import Popular_course from './screens/Home/Popular_course';
import Search from './screens/Search/Search_page';
import Search_result from './screens/Search/Search_result';
import UserProfile from "./screens/UserProfile/UserProfile"; 
import MyCourses from "./screens/MyCourse/MyCourses";
import TeacherProfile from "./screens/TeacherProfile/teacherProfile";
import CourseDetails_OverView from "./screens/CourseDetail/CourseDetails_OverView";
import CourseDetails_Review from "./screens/CourseDetail/CourseDetails_Review";
import CourseDetails_Lession from "./screens/CourseDetail/CourseDetails_Lession";

import { LogBox } from 'react-native';



export default function App() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']); // Ẩn thông báo thanh cuộn lồng nhau

    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} options={{ animationEnabled: false }}/>
                <Stack.Screen name="Course_inspires" component={Course_inspires} />
                <Stack.Screen name="Recomment_course" component={Recomment_course} />
                <Stack.Screen name="Popular_course" component={Popular_course} />
                <Stack.Screen name="Search" component={Search} options={{ animationEnabled: false }}/>
                <Stack.Screen name="Search_result" component={Search_result} />
                <Stack.Screen name="CourseInfo" component={CourseInfo} />
                <Stack.Screen name="UserProfile" component={UserProfile} options={{ animationEnabled: false }}/>
                <Stack.Screen name="MyCourses" component={MyCourses} options={{ animationEnabled: false }}/>
                <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
                <Stack.Screen name="CourseDetails_OverView" component={CourseDetails_OverView} options={{ animationEnabled: false }}/>
                <Stack.Screen name="CourseDetails_Review" component={CourseDetails_Review} options={{ animationEnabled: false }}/>
                <Stack.Screen name="CourseDetails_Lession" component={CourseDetails_Lession} options={{ animationEnabled: false }}/>
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
