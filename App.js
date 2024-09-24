//PhungCanhTuan
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from './screens/UserProfile';
import MyCourses from './screens/MyCourses';
import CourseDetail from './screens/CourseDetail';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="CourseDetail"
                screenOptions={{
                    headerShown: true,
                }}
            >
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="MyCourses" component={MyCourses} />
                <Stack.Screen name="CourseDetail" component={CourseDetail} />
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
