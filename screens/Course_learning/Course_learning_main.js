import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEllipsisVertical, faShareNodes, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';
import { Ionicons } from '@expo/vector-icons';

import Course_info_QA from './Course_learning_QA';
import Course_info_project from './Course_learning_project';
import Lesson_Tab from './Course_learning_lessons';

import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig';

const Course_learning_main = ({ navigation,route }) => {
    const { courses } = route.params || {};

    if (!courses) {
        return <Text>Error: Courses data not found!</Text>;
    }

    const [tabSelected, setTabSelected] = useState('LESSONS');
    const handleTabSelected = (tab) => {
        setTabSelected(tab);
    };

    const [likeCourseSelected, setLikeCourseSelected] = useState(false);
    const handleLikeCourse = () => {
        setLikeCourseSelected(!likeCourseSelected);
    };


    const [course, setCourse] = useState([]); //  khóa học chi tiết

    // Hàm fetch chi tiết khóa học từ `Courses`
    const fetchCourseDetails = async (courseID) => {
        try {
            const courseRef = ref(database, `Courses/${courseID}`);
            const snapshot = await get(courseRef);

            if (snapshot.exists()) {
                setCourse({
                    id: snapshot.key,
                    ...snapshot.val(),
                });
            } else {
                console.error('Khóa học không tồn tại trong bảng Courses.');
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu khóa học:', error);
        } finally {
            setLoading(false); // Kết thúc trạng thái tải
        }
    };

    useEffect(() => {
        if (courses.courseID) {
            fetchCourseDetails(courses.courseID); // Lấy dữ liệu chi tiết khi component mount
        }
    }, [courses]);

    const courseImageUrl = course?.image?.url || 'https://via.placeholder.com/150';

    return (
        <ScrollView style={{marginTop:30, padding: 16}}>
            <View style={StyleSheet.container}>
                {/* Header */}
                <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} >
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                    <Text style={styles.course_name}>{course.name}</Text>
                    <TouchableOpacity style={styles.header_right}>
                        <FontAwesomeIcon style={styles.header_icon} icon={faBookmark} size={20}/>
                        <FontAwesomeIcon style={styles.header_icon} icon={faEllipsisVertical} size={20}/>
                    </TouchableOpacity>
                </View>

                {/* banner */}
                <View>
                    <View>
                        <Image source={{ uri: courseImageUrl }} style={{ width: '100%', height: 200, borderRadius: 16 }} />
                    </View>
                    <Text style={styles.banner_text}>{course.name}</Text>
                    <View style={styles.course_like_share}>
                        <View style={styles.course_like}>
                            <TouchableOpacity onPress={() => handleLikeCourse()}>
                                {likeCourseSelected ? (
                                    <FontAwesomeIcon style={{ color: 'red' }} icon={solidHeart} />
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} />
                                )}
                            </TouchableOpacity>
                            <Text style={{ paddingLeft: 12, fontSize: 18 }}>231 Likes</Text>
                        </View>
                        <View style={styles.course_share}>
                            <Pressable>
                                <FontAwesomeIcon icon={faShareNodes} />
                            </Pressable>
                            <Text style={{ paddingLeft: 12, fontSize: 18 }}>16 share</Text>
                        </View>
                    </View>

                    <Text style={styles.subText}>⭐{course.rank} ({course.countLean}) • {course.lessons} lessons</Text>
                </View>

                {/* Tab */}
                <View style={styles.tab}>
                    <Pressable style={styles.tab_header_text_wrap} onPress={() => handleTabSelected('LESSONS')}>
                        <Text style={[styles.tab_header_text, tabSelected === 'LESSONS' && styles.tab_active]}>LESSONS</Text>
                    </Pressable>
                    <Pressable style={styles.tab_header_text_wrap} onPress={() => handleTabSelected('PROJECT')}>
                        <Text style={[styles.tab_header_text, tabSelected === 'PROJECT' && styles.tab_active]}>PROJECT</Text>
                    </Pressable>
                    <Pressable style={styles.tab_header_text_wrap} onPress={() => handleTabSelected('Q&A')}>
                        <Text style={[styles.tab_header_text, tabSelected === 'Q&A' && styles.tab_active]}>Q&A</Text>
                    </Pressable>
                </View>

                {/* Tab Q&A */}
                {tabSelected === 'Q&A' ? <Course_info_QA /> : tabSelected === 'PROJECT' ? <Course_info_project /> : <Lesson_Tab />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 16,
        marginTop: 36,
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    header_right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header_icon: {
        width: 24,
        height: 24,
        paddingLeft: 16,
    },
    course_name: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    // banner
    banner_text: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
    },
    course_like_share: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
    },
    course_like: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 24,
    },

    subText: {
        fontSize:20,
        color: 'gray',
        paddingLeft: 12,
        marginTop: 8,
    },

    course_share: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // tab
    tab: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 22,
    },
    tab_header_text_wrap: {
        flex: 1,
    },
    tab_header_text: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#ccc',
        textAlign: 'center',
    },
    tab_active: {
        color: 'cyan',
        borderBottomWidth: 4,
        borderBottomColor: 'cyan',
    },
});

export default Course_learning_main;
