//PhungCanhTuan
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CourseInfo from './screens/Course_Info/Course_Info_main';
import Home from './screens/Home/Home';
import Search from './screens/Search/Search_page';
import Search_result from './screens/Search/Search_result';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Search_result"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Search_result" component={Search_result} />
                <Stack.Screen name="CourseInfo" component={CourseInfo} />
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
