import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMagnifyingGlass, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Home/Footer';

const courses = [
    {
        id: '1',
        title: 'UX Foundation',
        time: '2 hrs 25 mins',
        progress: 0.3,
        image: require('../../assets/image/myCourses_img/UX_Foundation.png'),
    },
    {
        id: '2',
        title: 'Creative Art Design',
        time: '3 hrs 25 mins',
        progress: 0.7,
        image: require('../../assets/image/myCourses_img/CreateArtDesign.png'),
    },
    {
        id: '3',
        title: 'Palettes for Your App',
        time: '4 hrs 50 mins',
        progress: 1.0,
        image: require('../../assets/image/myCourses_img/PalettersYourApp.png'),
    },
    {
        id: '4',
        title: 'Typography in UI Design',
        time: '4 hrs 50 mins',
        progress: 0.5,
        image: require('../../assets/image/myCourses_img/TypographyUIDesign.png'),
    },
    {
        id: '5',
        title: 'App Interface Design',
        time: '5 hrs 30 mins',
        progress: 1,
        image: require('../../assets/image/myCourses_img/DesignInterFaceApp.jpg'),
    },
];

const MyCourses = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('ALL');

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    const CourseCard = ({ course }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CourseDetails_OverView')}>
            <Image source={course.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.time}>{course.time}</Text>
                <Text style={styles.progressText}>{Math.round(course.progress * 100)}% Complete</Text>
            </View>
        </TouchableOpacity>
    );

    const filterCourses = () => {
        if (selectedTab === 'ALL') {
            return courses;
        }
        if (selectedTab === 'ON GOING') {
            return courses.filter((course) => course.progress < 1);
        }
        if (selectedTab === 'COMPLETED') {
            return courses.filter((course) => course.progress === 1);
        }
        return courses;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Courses</Text>

            <View style={styles.bannerContainer}>
                <Image source={require('../../assets/image/myCourses_img/banner.png')} style={styles.bannerImage} />
            </View>

            {/* Thanh điều hướng */}
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => handleTabPress('ALL')} style={selectedTab === 'ALL' ? styles.activeTab : styles.tab}>
                    <Text style={selectedTab === 'ALL' ? styles.activeTabText : styles.tabText}>ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabPress('ON GOING')}
                    style={selectedTab === 'ON GOING' ? styles.activeTab : styles.tab}
                >
                    <Text style={selectedTab === 'ON GOING' ? styles.activeTabText : styles.tabText}>ON GOING</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleTabPress('COMPLETED')}
                    style={selectedTab === 'COMPLETED' ? styles.activeTab : styles.tab}
                >
                    <Text style={selectedTab === 'COMPLETED' ? styles.activeTabText : styles.tabText}>COMPLETED</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={filterCourses()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CourseCard course={item} />}
                    contentContainerStyle={styles.courseList}
                />
            </View>
            {/* Danh sách khóa học đã lọc */}

            {/* Footer cố định */}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        height: '100vh',
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
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 14,
        color: '#777',
        marginVertical: 5,
    },
    progressText: {
        marginTop: 5,
        fontSize: 12,
        color: '#555',
    },
    courseList: {
        paddingBottom: 20,
        paddingHorizontal: 16,
        paddingBottom: 80,
    },

    footerContainer: {
        position: 'absolute',
        bottom: 0,
    },
});

export default MyCourses;
