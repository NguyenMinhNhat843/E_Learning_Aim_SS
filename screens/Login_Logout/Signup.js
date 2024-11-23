import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faMobile, faUserPlus, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';  // Import cấu hình Firebase

const Signup = () => {
    const navigation = useNavigation();

    // State để lưu trữ dữ liệu nhập vào
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [technique, setTechnique] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // Hàm điều hướng đến màn hình login
    const navigation_to_login = () => {
        navigation.navigate('Login');
    };

    // Hàm đăng ký người dùng
    const handleSignUp = () => {
        // Kiểm tra nếu các trường bắt buộc đều có dữ liệu
        if (email && fullName && technique && userName && password) {
            const newUserId = new Date().getTime().toString();  // Tạo ID người dùng (có thể dùng cách khác)
            const newUser = {
                email,
                name: fullName,
                technique,
                userName,
                password,
                category: "Default",  // Thêm thông tin mặc định
                image: {
                    url: "https://res.cloudinary.com/dac52ynk6/image/upload/v1731506220/aufagosi16y02tjx1eiw.jpg" // Thêm ảnh mặc định
                }
            };

            // Đẩy dữ liệu người dùng mới vào Firebase Realtime Database
            set(ref(database, 'Users/' + newUserId), newUser)
                .then(() => {
                    console.log('User added successfully');
                    navigation_to_login();  // Chuyển hướng về màn hình Login sau khi đăng ký thành công
                })
                .catch((error) => {
                    console.error('Error adding user: ', error);
                });
        } else {
            console.log('Please fill in all fields');
        }
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Create Your Account</Text>
                </View>
                <Text style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 24 }}>
                    Create a personal account now to access e-learning
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

            {/* Form signup */}
            <View style={styles.form_signup}>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faEnvelope} />
                    <TextInput
                        style={styles.input_control}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faUserPlus} />
                    <TextInput
                        style={styles.input_control}
                        placeholder="Full name"
                        value={fullName}
                        onChangeText={setFullName}
                    />
                </View>

                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faMobile} />
                    <TextInput
                        style={styles.input_control}
                        placeholder="Technique"
                        value={technique}
                        onChangeText={setTechnique}
                    />
                </View>

                <View style={styles.group}>
                    <FontAwesomeIcon style={styles.icon} icon={faMobile} />
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
            </View>

            {/* SignUp button */}
            <TouchableOpacity style={styles.login_button} onPress={handleSignUp}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Sign up</Text>
            </TouchableOpacity>

            {/* Login redirect */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
                <Text>Already have an account?</Text>
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
        marginTop: 36,
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
        padding: 16,
        color: 'black',
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
