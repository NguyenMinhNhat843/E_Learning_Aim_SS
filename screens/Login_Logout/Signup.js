import React from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faHandSparkles, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const navigation = useNavigation();
    const navigation_to_signup = () => {
        navigation.navigate('Signup');
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
            <View>
                <Text>As a Teacher</Text>
                <Text>As a Student</Text>
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

export default Signup;
