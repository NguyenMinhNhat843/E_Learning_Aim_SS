import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';
// import Video from 'react-native-video';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import CourseDetails_Lession from './CourseDetails_Lession';
import CourseDetails_Review from './CourseDetails_Review';
import { database } from '../../firebaseConfig'; // Đường dẫn đúng tới file firebaseConfig.js
import { ref, get } from 'firebase/database';



const CourseDetails = ({ navigation, route }) => {
    const { courses } = route.params;

    const [teacher, setTeacher] = useState([]);

    // Hàm fetch chi tiết giáo viên từ Firebase
    const fetchTeacher = async (teacherName) => {
        try {
            // Lấy toàn bộ danh sách giáo viên
            const teacherRef = ref(database, `teacher`);
            const snapshot = await get(teacherRef);

            if (snapshot.exists()) {
                const teachers = snapshot.val();

                // Tìm giáo viên dựa trên tên
                const teacherId = Object.keys(teachers).find(
                    (id) => teachers[id].name === teacherName
                );

                if (!teacherId) {
                    console.warn(`Không tìm thấy giáo viên với tên: ${teacherName}`);
                    setTeacher(null); // Giáo viên không tồn tại
                    return;
                }

                // Lấy chi tiết giáo viên theo ID
                const selectedTeacher = {
                    id: teacherId,
                    ...teachers[teacherId],
                };

                setTeacher(selectedTeacher); // Cập nhật state với chi tiết giáo viên
            } else {
                console.warn(`Không có dữ liệu giáo viên trong Firebase.`);
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu giáo viên:', error);
        }
    };

    useEffect(() => {
        if (courses.teacherName) {
            fetchTeacher(courses.teacherName);
        }
    }, [courses]);

    //lọc ra các khóa học tương tự (khóa học có cùng loại)
    const [similarCourses, setSimilarCourses] = useState([]);

    const fetchSimilarCourses = async () => {
        try {
            const coursesRef = ref(database, 'Courses');
            const snapshot = await get(coursesRef);
    
            if (snapshot.exists()) {
                const allCourses = snapshot.val();
    
                // Lọc các khóa học cùng loại (category) nhưng loại trừ khóa học hiện tại
                const similarCourses = Object.values(allCourses).filter(
                    (course) =>
                        course.category === courses.category && course.id !== courses.id
                );
    
                setSimilarCourses(similarCourses);
            } else {
                console.warn('Không có dữ liệu khóa học trong Firebase.');
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu khóa học:', error);
        }
    };
    
    // Gọi fetchSimilarCourses trong useEffect
    useEffect(() => {
        fetchSimilarCourses();
    }, [courses]);
    
    const teacherImageUrl = teacher?.image?.url || 'https://via.placeholder.com/150';

    const courseDetails_OverView = () => (
        <View>
            {/* Teacher info */}
            <TouchableOpacity style={styles.teacherContainer} onPress={() => navigation.navigate('TeacherProfile', {teacher:teacher})}>
                <Image
                    style={styles.teacherImage}
                    source={{uri:teacherImageUrl}}
                />
                <Text style={styles.teacherName}>{teacher.name}</Text>
                <Text style={styles.teacherRole}>{teacher.technique}</Text>
                <TouchableOpacity style={styles.teacherFollow}><Text style={styles.teacherFollowText}>Follow</Text></TouchableOpacity>
            </TouchableOpacity>

            {/* Course description */}
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.descriptionText}>{courses.description}</Text>
            </View>

            {/* Benefits section */}
            <View style={styles.benefitsContainer}>
                <Text style={styles.benefitText}>📹14 hours on-demand video</Text>
                <Text style={styles.benefitText}>🌐Native teacher</Text>
                <Text style={styles.benefitText}>📝100% free document</Text>
                <Text style={styles.benefitText}>⏰Full lifetime access</Text>
                <Text style={styles.benefitText}>✅Certificate of completion</Text>
                <Text style={styles.benefitText}>✔️24/7 support</Text>
            </View>

            {/* Similar courses */}
            <Text style={styles.similarCoursesTitle}>Similar Courses</Text>

            <FlatList
                data={similarCourses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.courseCard} onPress={() => navigation.navigate("CourseDetails_OverView", { courses: item })}>
                        <Image
                            style={styles.courseImage}
                            source={{uri:item.image.url}} 
                        />
                        <Text style={styles.courseTitle}>{item.name}</Text>
                        <Text style={styles.courseTeacher}>{item.teacherName}</Text>
                        <Text style={styles.coursePrice}>${item.price}</Text>
                    </TouchableOpacity>
                )}
                horizontal={true}
            />
        </View>
    )

    const [selectedTab, setSelectedTab] = useState('OVERVIEW');

    const filter = () => {
        if (selectedTab === 'OVERVIEW') {
            return courseDetails_OverView();
        }
        if (selectedTab === 'LESSONS') {
            return <CourseDetails_Lession />
        }
        if (selectedTab === 'REVIEW') {
            return <CourseDetails_Review courses={courses} />
        }
        return courseDetails_OverView();
    };

    return (

        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.iconButton} >
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Course details</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.subContainer}>

                <View style={styles.header}>
                    <Video
                        source={require('../../assets/video/WhatIsUXDesign.mp4')} // Đường dẫn tới video
                        style={styles.video}
                        useNativeControls={true}  //Tạo ra các điều khiển phát/dừng mặc định (phát video khi nhấn vào).
                        controls={true}          // Hiển thị các điều khiển phát video như play/pause
                        resizeMode="contain"     // Điều chỉnh video vừa với khung hình
                        shouldPlay={false}       // Không rự động phát 
                    // resizeMode="cover"    // Chế độ hiển thị video
                    // paused={false}        // Tự động phát khi tải
                    />

                    <Text style={styles.title}>{courses.name}</Text>
                    <Text style={styles.subText}>⭐{courses.rank} ({courses.countLean}) • {courses.lessons} lessons</Text>
                </View>

                {/* Tab Bar */}
                <View style={styles.tabBar}>
                    <TouchableOpacity onPress={() => setSelectedTab('OVERVIEW')} style={selectedTab === 'OVERVIEW' ? styles.activeTab : styles.tab}>
                        <Text style={selectedTab === 'OVERVIEW' ? styles.activeTabText : styles.tabText}>OVERVIEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab('LESSONS')} style={selectedTab === 'LESSONS' ? styles.activeTab : styles.tab}>
                        <Text style={selectedTab === 'LESSONS' ? styles.activeTabText : styles.tabText}>LESSONS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab('REVIEW')} style={selectedTab === 'REVIEW' ? styles.activeTab : styles.tab}>
                        <Text style={selectedTab === 'REVIEW' ? styles.activeTabText : styles.tabText}>REVIEW</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView nestedScrollEnabled={true}>
                    {filter()}
                </ScrollView>
            </View>

            {/* Price and button */}
            <View style={styles.footer}>
                <Text style={styles.price}>${courses.price} {'\n'}
                    <Text style={styles.discount}> 80% Disc 1020$</Text></Text>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.buttonText}>🛒Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },

    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
        marginLeft: -10,
        marginRight: -10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: 5,
    },

    subContainer: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#fff',
    },

    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
        padding: 5,
    },

    subText: {
        fontSize: 24,
        color: 'gray',
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        paddingBottom: 10,
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#007BFF',
    },
    activeTabText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },

    teacherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    teacherImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    teacherName: {
        marginLeft: 10,
        fontWeight: 'bold',
    },
    teacherRole: {
        marginLeft: 10,
        color: 'gray',
    },

    teacherFollow: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        padding: 5,
        marginLeft: 30,
    },

    teacherFollowText: {
        color: '#fff',
        fontSize: 14,
    },

    descriptionContainer: {
        marginBottom: 20,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionText: {
        marginTop: 5,
        color: 'gray',
    },
    benefitsContainer: {
        marginBottom: 20,
    },
    benefitText: {
        marginBottom: 5,
        color: 'black',
    },
    similarCoursesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    similarCoursesContainer: {
        flexDirection: 'row',
    },
    courseCard: {
        width: 150,
        marginRight: 10,
    },
    courseImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    courseTeacher: {
        fontSize: 14,
        color: 'gray',
    },
    coursePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        // marginTop: 20,
        marginRight: -20,
        marginLeft: -20,
        marginBottom: -10,
        padding: 20,
        borderColor: '#9bc1e0',
        borderTopWidth: 1,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    discount: {
        color: '#79828b',
        fontSize: 14,
        marginLeft: 10,
    },

    addToCartButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 15,
        marginRight: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CourseDetails;
