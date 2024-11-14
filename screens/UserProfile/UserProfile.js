
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Footer from '../Home/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { database } from '../../firebaseConfig';
import { ref, get } from 'firebase/database';
import { useUser } from '../Login_Logout/UserContext';

const UserProfile = ({ navigation }) => {
    const { user } = useUser(); // Lấy thông tin người dùng từ context

    // Hàm xử lý đăng xuất
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken'); // Xóa token đăng nhập
            Alert.alert('Logged out', 'You have been logged out successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.replace('Login'), // Chuyển hướng về màn hình Login
                },
            ]);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    const [courses, setCourses] = useState([]); // Danh sách khóa học chi tiết

    // Hàm fetch chi tiết các khóa học từ Firebase
    const fetchCourses = async (courseLearning) => {
        try {
            const coursePromises = courseLearning.map(async (course) => {
                const courseRef = ref(database, `Courses/${course.courseID}`); // Đường dẫn tới course ID
                const snapshot = await get(courseRef);

                if (snapshot.exists()) {
                    return {
                        id: snapshot.key, // Sử dụng `key` của Firebase làm id
                        ...snapshot.val(), // Lấy toàn bộ thuộc tính của khóa học
                    };
                }
                return null; // Trường hợp khóa học không tồn tại
            });

            const fetchedCourses = await Promise.all(coursePromises);
            setCourses(fetchedCourses.filter((course) => course !== null)); // Loại bỏ giá trị null
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu khóa học:', error);
        }
    };

    useEffect(() => {
        if (user.course_learning) {
            fetchCourses(user.course_learning);
        }
    }, [user]);

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseItem} onPress={() => navigation.navigate("CourseDetails_OverView")}>
            <Image source={{ uri: item.image.url }} style={styles.courseImage} />
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.name}</Text>
                <Text style={styles.courseAuthor}>{item.teacherName}</Text>
                <Text style={styles.coursePrice}>$ {item.price}</Text>
                <View style={styles.courseMeta}>
                    <Text style={styles.courseRating}>⭐ {item.rank} ({item.lessons} lessons)</Text>
                </View>
            </View>
            <FontAwesome name="bookmark-o" size={24} color="gray" />
        </View>
    );

    return (
        <View style={styles.container}>

            {/* User Profile Header */}
            <View style={styles.profileHeader}>
                <Image
                    source={require('../../assets/image/userProfile_img/background_profile.png')}
                    style={styles.backgroundImage}
                />
                <Image
                    source={{ uri: user.image.url }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileRole}>{user.technique}</Text>

                {/* Thêm nút Logout */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                <View style={styles.profileStats}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Save</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>On Going</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>2</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                </View>
            </View>

            {/* Saved Courses List */}
            <Text style={styles.savedCoursesTitle}>Saved courses</Text>

            <FlatList
                data={courses}
                renderItem={renderCourseItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.courseList}
            />

            {/* Footer cố định */}
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileHeader: {
        alignItems: 'center',
        // marginVertical: 20,
        // paddingTop: 50
    },
    backgroundImage: {
        width: '100%',
        height: 180,
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        position: 'absolute',
        top: 115
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 65
    },
    profileRole: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    profileStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginLeft: 20,
        paddingHorizontal: 16,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 14,
        color: 'gray',
    },
    savedCoursesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 16,
        marginTop: 20,
    },
    courseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
    },
    courseImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    courseInfo: {
        flex: 1,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courseAuthor: {
        fontSize: 14,
        color: 'gray',
    },
    coursePrice: {
        fontSize: 16,
        color: '#007BFF',
        marginTop: 5,
    },
    courseMeta: {
        marginTop: 5,
    },
    courseRating: {
        fontSize: 14,
        color: 'gray',
    },

    footerContainer: {
        position: 'absolute',
        bottom: 0,
    },
    courseList: {
        paddingBottom: 80,
        paddingHorizontal: 16,
    },

    logoutButton: {
        backgroundColor: '#FF5733',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserProfile;
