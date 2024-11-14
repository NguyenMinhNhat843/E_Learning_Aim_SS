import React,{useState} from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHandSparkles, faEnvelope, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebaseConfig'; // Import file config Firebase
import { ref, get, child } from 'firebase/database';
import { useUser } from './UserContext'; // Import UserContext


const Login = () => {
    const navigation = useNavigation();
    const { setUser } = useUser(); // Use the UserContext to store user data
    const navigation_to_signup = () => {
        navigation.navigate('Signup');
    };
    const navigation_to_forgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };
    const navigation_to_home = () => {
        navigation.navigate('Home');
    };


    //Kiểm tra dữ liệu đăng nhập từ Firebase
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!userName || !password) {
            Alert.alert('Error', 'Please fill in both fields');
            return;
        }

        try {
            const dbRef = ref(database);
            const snapshot = await get(child(dbRef, 'Users'));

            if (snapshot.exists()) {
                const users = snapshot.val();
                let userFound = false;

                for (const userID in users) {
                    const user = users[userID];
                    if (user.userName === userName && user.password === password) {
                        userFound = true;

                        // Save user data into UserContext
                        setUser(user);

                        Alert.alert('Success', `Welcome, ${user.name}!`);
                        navigation.navigate('Home'); // Navigate to Home page
                        break;
                    }
                }

                if (!userFound) {
                    Alert.alert('Error', 'Invalid username or password');
                }
            } else {
                Alert.alert('Error', 'No users found in the database');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to log in');
        }
    };

    return (
        <View style={styles.container}>
            {/* logo */}
            <Image source={require('../../assets/image/login/banner5.jpg')} style={styles.imageBanner}/>

            {/* header */}
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center', color:'blue' }}>Welcome to E_Learning</Text>
                    <FontAwesomeIcon style={{ height: '100%', width: 24, paddingLeft: 15,color:'blue' }} icon={faHandSparkles} />
                </View>
                <Text style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Conquer your dreams with E_learning </Text>
            </View>

            {/* form login */}
            <View style={styles.form_login}>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faUser} />
                    <TextInput 
                        style={styles.input_control} 
                        placeholder="User Name"
                        value={userName}
                        onChangeText={setUserName} 
                    />
                </View>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faLock} />
                    <TextInput 
                        style={styles.input_control} 
                        placeholder="Password" 
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity style={styles.login_button_api} onPress={handleLogin}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'medium', textAlign: 'center', fontWeight:700 }}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigation_to_forgotPassword}>
                    <Text style={{ textAlign: 'right', color: 'blue', fontSize:15 }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* login button */}
            <View style={{ width: '100%' }}>
                <TouchableOpacity style={styles.login_button}>
                    <Text style={{ color: 'black', fontSize: 16, fontWeight: 'medium', textAlign: 'center', fontWeight:500 }}>Login My user</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
                    <Text style={{ fontSize: 16 }}>You don't have an account yet?</Text>
                    <TouchableOpacity style={styles.signup_link} onPress={navigation_to_signup}>
                        <Text style={styles.signUpText}>Sign up</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            {/* log in method */}
            <View style={{ width: '100%', paddingTop: 24 }}>
                <Pressable style={styles.login_method_item}>
                    <FontAwesomeIcon style={{ paddingRight: 16, height: '100%', width: 24, color: 'blue' }} icon={faFacebook} />
                    <Text style={{ fontWeight: 'medium', fontSize: 16 }}>  Log in with facebook</Text>
                </Pressable>
                <Pressable style={styles.login_method_item}>
                    <FontAwesomeIcon style={{ paddingRight: 16, height: '100%', width: 24, color: 'blue' }} icon={faGoogle} />
                    <Text style={{ fontWeight: 'medium', fontSize: 16 }}>  Log in with Google</Text>
                </Pressable>
                <Pressable style={styles.login_method_item}>
                    <FontAwesomeIcon style={{ paddingRight: 16, height: '100%', width: 24, color: 'blue' }} icon={faEnvelope} />
                    <Text style={{ fontWeight: 'medium', fontSize: 16 }}>  Log in with Email</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 16,
        marginTop: 56,
    },
    imageBanner:{
        width: '100%',
        height: 200,
        borderRadius: 16,
        marginTop: 14,
        marginBottom: 24,
    },
    login_method_item: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 32,
        marginBottom: 12,
    },
    login_button: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 32,
    },
    signup_link: {
        color: 'cyan',
        marginLeft: 8,
        borderBottomWidth: 1,
        borderColor: 'blue',
        fontSize: 16,
    },
    form_login: {
        paddingTop: 24,
        width: '100%',
    },
    group: {
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: '#e8e8e8',
        marginBottom: 12,
        alignItems: 'center',
    },
    icon: {
        marginRight: 12,
        marginLeft: 12,
        height: 24,
        width: 24,
    },
    input_control: {
        width: '100%',
        height: '100%',
        outline: 'none',
        padding: 16,
    },
    login_button: {
        backgroundColor: '#ecd9dc',
        width: '100%',
        padding: 16,
        borderRadius: 16,
        marginTop: 24,
        borderWidth: 1,
    },
    login_button_api: {
        backgroundColor: 'blue',
        width: 'auto',
        padding: 16,
        borderRadius: 16,
        marginTop: 4,
    },
    signUpText:{
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;
