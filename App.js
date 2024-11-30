import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CourseLearning from './screens/Course_learning/Course_learning_main';
import Home from './screens/Home/Home';
import Course_inspires from './screens/Home/Course_inspires';
import Recomment_course from './screens/Home/Recomment_course';
import Popular_course from './screens/Home/Popular_course';
import Top_teacher from './screens/Home/Top_teacher';
import Search from './screens/Search/Search_page';
import Search_result from './screens/Search/Search_result';

import UserProfile from './screens/UserProfile/UserProfile';
import MyCourses from './screens/MyCourse/MyCourses';
import TeacherProfile from './screens/TeacherProfile/teacherProfile';
import CourseDetails_OverView from './screens/CourseDetail/CourseDetails_OverView';
import CourseDetails_Review from './screens/CourseDetail/CourseDetails_Review';
import CourseDetails_Lession from './screens/CourseDetail/CourseDetails_Lession';
import Login from './screens/Login_Logout/Login';
import Signup from './screens/Login_Logout/Signup';
import ForgotPassword from './screens/Login_Logout/ForgotPassword';
import CartScreen from './screens/Cart_Page/CartPage';
import Category from './screens/Home/Category';
import CategoryDetail from './screens/Home/Category_Detail';
import AddCourse from './screens/Courses/AddCourse';
import EditCourse from './screens/Courses/EditCourse';

import UserProvider from './screens/Login_Logout/UserContext';

import { LogBox } from 'react-native';
import { CartProvider } from './context/CartContext';

export default function App() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']); // Ẩn thông báo thanh cuộn lồng nhau
    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested', // Ẩn thông báo thanh cuộn lồng nhau
    ]);

    const Stack = createStackNavigator();
    return (
        // Bọc toàn bộ Navigation trong UserProvider để context có thể sử dụng ở mọi nơi trong ứng dụng
        <UserProvider>
            <CartProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Cart" component={CartScreen} />
                        <Stack.Screen name="Course_inspires" component={Course_inspires} />
                        <Stack.Screen name="Recomment_course" component={Recomment_course} />
                        <Stack.Screen name="Popular_course" component={Popular_course} />
                        <Stack.Screen name="Top_teacher" component={Top_teacher} />
                        <Stack.Screen name="Search" component={Search} options={{ animationEnabled: false }} />
                        <Stack.Screen name="Search_result" component={Search_result} />
                        <Stack.Screen name="CourseLearning" component={CourseLearning} />
                        <Stack.Screen name="Profile" component={UserProfile} options={{ animationEnabled: false }} />
                        <Stack.Screen name="My Course" component={MyCourses} options={{ animationEnabled: false }} />
                        <Stack.Screen name="TeacherProfile" component={TeacherProfile} />
                        <Stack.Screen name="CourseDetails_OverView" component={CourseDetails_OverView} options={{ animationEnabled: false }} />
                        <Stack.Screen name="CourseDetails_Review" component={CourseDetails_Review} options={{ animationEnabled: false }} />
                        <Stack.Screen name="CourseDetails_Lession" component={CourseDetails_Lession} options={{ animationEnabled: false }} />
                        <Stack.Screen name="Category" component={Category} />
                        <Stack.Screen name="Category Detail" component={CategoryDetail} />
                        <Stack.Screen name="Add Course" component={AddCourse} />
                        <Stack.Screen name="Edit Course" component={EditCourse} />
                    </Stack.Navigator>
                </NavigationContainer>
            </CartProvider>
        </UserProvider>
    );
}
