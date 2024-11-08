import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faMobile, faUserPlus, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-web';

const Signup = () => {
    const navigation = useNavigation();
    const navigation_to_login = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Create Your Account</Text>
                </View>
                <Text style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 24 }}>
                    create personal account now to access e_learning{' '}
                </Text>
            </View>

            {/* teacher or student account */}
            <View style={styles.type_account}>
                <TouchableOpacity style={styles.type_button}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>As a Teacher</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.type_button}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>As a Student</Text>
                </TouchableOpacity>
            </View>

            {/* Form login */}
            <View style={styles.form_signup}>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faEnvelope} />
                    <TextInput style={styles.input_control} placeholder="Email" />
                </View>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faUserPlus} />
                    <TextInput style={styles.input_control} placeholder="Full name" />
                </View>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faMobile} />
                    <TextInput style={styles.input_control} placeholder="Mobile" />
                </View>
                <View style={styles.group}>
                    <FontAwesomeIcon icon={faLock} />
                    <TextInput style={styles.input_control} placeholder="Password" />
                </View>
            </View>

            {/* login button */}
            <TouchableOpacity style={styles.login_button}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Sign up</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
                <Text>Bạn đã có tài khoản?</Text>
                <TouchableOpacity style={{ paddingLeft: 12 }} onPress={navigation_to_login}>
                    <Text style={{ color: 'cyan', fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    type_account: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    type_button: {
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: 'blue',
        marginRight: 12,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    form_signup: {
        paddingTop: 24,
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

export default Signup;
