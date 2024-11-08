import Reat from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
    const navigation = useNavigation();
    const navigation_to_login = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/image/forgot_password.jpg')} />
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', paddingBottom: 8 }}>Forgot Password?</Text>
                <Text>Don't worry! It happends, Please enter the address email with your account</Text>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faLock} />
                    <TextInput style={styles.input_control} placeholder="Enter Email / Mobile number" />
                </View>
                <TouchableOpacity style={styles.submit_button}>
                    <Text style={{ color: 'white', fontSize: 22 }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingTop: 12 }} onPress={navigation_to_login}>
                    <Text style={{ color: 'cyan', textAlign: 'center', fontSize: 18 }}>login again</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100vh',
    },
    group: {
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: '#ccc',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24,
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
    submit_button: {
        backgroundColor: 'blue',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginTop: 12,
    },
});

export default ForgotPassword;
