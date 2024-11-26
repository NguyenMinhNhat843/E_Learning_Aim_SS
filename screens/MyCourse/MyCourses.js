import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../Home/Footer';
import { useUser } from '../Login_Logout/UserContext';
import ProgressBar from './progressBar'; // Đảm bảo đường dẫn đúng


const MyCourses = ({ navigation, route }) => {
    const { user } = useUser(); // Lấy thông tin người dùng từ context

    const [selectedTab, setSelectedTab] = useState('ALL');

    // Hàm lọc các khóa học theo trạng thái (ALL, ON GOING, COMPLETED)
    const filterCourses = () => {
        if (selectedTab === 'ALL') {
            return user.course_learning;
        }
        if (selectedTab === 'ON GOING') {
            return user.course_learning.filter(course => course.progress < 1);
        }
        if (selectedTab === 'COMPLETED') {
            return user.course_learning.filter(course => course.progress === 1);
        }
        return user.course_learning;
    };

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    const CourseCard = ({ course }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CourseLearning", { courses: course })}>
            <Image source={{ uri: course.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{course.name}</Text>
                <Text style={styles.time}>{course.time}</Text>
                <Text style={styles.progressText}>{Math.round(course.progress * 100)}% Complete</Text>
                {/* Thêm thanh tiến độ ở đây */}
                <ProgressBar progress={course.progress}/>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Courses</Text>

            <View style={styles.bannerContainer}>
                <Image
                    source={require('../../assets/image/myCourses_img/banner.png')}
                    style={styles.bannerImage}
                />
            </View>

            {/* Thanh điều hướng */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => handleTabPress('ALL')} style={selectedTab === 'ALL' ? styles.activeTab : styles.tab}>
                    <Text style={selectedTab === 'ALL' ? styles.activeTabText : styles.tabText}>ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('ON GOING')} style={selectedTab === 'ON GOING' ? styles.activeTab : styles.tab}>
                    <Text style={selectedTab === 'ON GOING' ? styles.activeTabText : styles.tabText}>ON GOING</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('COMPLETED')} style={selectedTab === 'COMPLETED' ? styles.activeTab : styles.tab}>
                    <Text style={selectedTab === 'COMPLETED' ? styles.activeTabText : styles.tabText}>COMPLETED</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách khóa học đã lọc */}
            <FlatList
                data={filterCourses()}
                keyExtractor={(item) => item.courseID.toString()}
                renderItem={({ item }) => <CourseCard course={item} />}
                contentContainerStyle={styles.courseList}
                ListEmptyComponent={<Text>No courses found</Text>}
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
        paddingTop: 40,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    bannerContainer: {
        paddingHorizontal: 16,
    },
    bannerImage: {
        width: '100%',
        height: 140,
        borderRadius: 10,
    },
    // Tabs điều hướng
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#00cec9',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    tabText: {
        color: '#999',
        fontSize: 16,
    },
    activeTabText: {
        color: '#00cec9',
        fontSize: 16,
        fontWeight: 'bold',
    },
    // Khóa học
    card: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 15,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 18,
        color: '#777',
        marginVertical: 5,
    },
    progressText: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 15,
        color: '#007BFF',
    },
    courseList: {
        paddingBottom: 20,
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
    }
});

export default MyCourses;