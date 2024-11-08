import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHandSparkles, faEnvelope, faGlobe, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const navigation_to_signup = () => {
        navigation.navigate('Signup');
    };
    const navigation_to_forgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };
    const navigation_to_home = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            {/* logo */}
            <FontAwesomeIcon style={{ height: 100, width: 50 }} icon={faGlobe} />

            {/* header */}
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Welcome to E_LEarning</Text>
                    <FontAwesomeIcon style={{ height: '100%', width: 24, paddingLeft: 10 }} icon={faHandSparkles} />
                </View>
                <Text style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 24 }}>Conquer your dreams with E_learning </Text>
            </View>

            {/* form login */}
            <View style={styles.form_login}>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faEnvelope} />
                    <TextInput style={styles.input_control} placeholder="Email" />
                </View>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faLock} />
                    <TextInput style={styles.input_control} placeholder="Password" />
                </View>
                <TouchableOpacity onPress={navigation_to_forgotPassword}>
                    <Text style={{ textAlign: 'right', color: 'cyan' }}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            {/* login button */}
            <View style={{ width: '100%' }}>
                <TouchableOpacity style={styles.login_button} onPress={navigation_to_home}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'medium', textAlign: 'center' }}>Log in to my Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
                    <Text style={{ fontSize: 16 }}>you don't have an account yet?</Text>
                    <TouchableOpacity style={styles.signup_link} onPress={navigation_to_signup}>
                        Sign up
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            {/* log in method */}
            <View style={{ width: '100%', paddingTop: 24 }}>
                <Pressable style={styles.login_method_item}>
                    <FontAwesomeIcon style={{ paddingRight: 16, height: '100%', width: 24, color: 'blue' }} icon={faFacebook} />
                    <Text style={{ fontWeight: 'medium', fontSize: 16 }}>Log in with facebook</Text>
                </Pressable>
                <Pressable style={styles.login_method_item}>
                    <FontAwesomeIcon style={{ paddingRight: 16, height: '100%', width: 24, color: 'blue' }} icon={faGoogle} />
                    <Text style={{ fontWeight: 'medium', fontSize: 16 }}>Log in with Google</Text>
                </Pressable>
                <Pressable style={styles.login_method_item}>
                    <FontAwesomeIcon style={{ paddingRight: 16, height: '100%', width: 24, color: 'blue' }} icon={faEnvelope} />
                    <Text style={{ fontWeight: 'medium', fontSize: 16 }}>Log in with Email</Text>
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
        borderColor: 'cyan',
        fontSize: 16,
    },
    form_login: {
        paddingTop: 24,
        width: '100%',
    },
    group: {
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: '#ccc',
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
        backgroundColor: 'blue',
        width: '100%',
        padding: 16,
        borderRadius: 16,
        marginTop: 24,
    },
});

export default Login;
