import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHandSparkles, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();
    const navigation_to_signup = () => {
        navigation.navigate('Signup');
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

            {/* log in method */}
            <View style={{ width: '100%' }}>
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

            {/* login sign up */}
            <View style={{ width: '100%', paddingTop: 32 }}>
                <Pressable style={styles.login_button}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'medium' }}>Log in to my Account</Text>
                </Pressable>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
                    <Text style={{ fontSize: 16 }}>you don't have an account yet?</Text>
                    <TouchableOpacity style={styles.signup_link} onPress={navigation_to_signup}>
                        Sign up
                    </TouchableOpacity>
                </TouchableOpacity>
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
});

export default Login;
