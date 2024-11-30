import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { database } from '../../firebaseConfig'; // Đường dẫn đúng tới file firebaseConfig.js
import { ref, get } from 'firebase/database';


const TeacherProfile = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState('COURSES');

    const { teacher } = route.params;
    const [courses, setCourses] = useState([]); // Danh sách khóa học chi tiết

    // Hàm fetch chi tiết các khóa học từ Firebase
    const fetchCourses = async (courseTeaching) => {
        try {
            const coursePromises = courseTeaching.map(async (course) => {
                const courseRef = ref(database, `Courses/${course.courseID}`); // Đường dẫn tới id của courses
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
        if (teacher.course_teaching) {
            fetchCourses(teacher.course_teaching); // Gọi hàm fetch với `teacher.course_teaching`
        }
    }, [teacher]);

    const COURSES_OF_TEACHER = () => (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Teaching Course</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                horizontal
                data={courses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CourseCard course={item} />}
                contentContainerStyle={styles.courseList}
            />
        </View>
    );


    const filter = () => {
        if (selectedTab === 'COURSES') {
            return COURSES_OF_TEACHER();
        }
        if (selectedTab === 'REVIEW') {
            // return <CourseDetails_Review />
            return REVIEWS_OF_TEACHER();
        }
        return COURSES_OF_TEACHER();
    };

    const CourseCard = ({ course }) => (
        <TouchableOpacity style={styles.courseCard} onPress={() => navigation.navigate("CourseDetails_OverView",{courses:course})}>
            <Image source={{ uri: course.image.url }} style={styles.courseImage} />
            <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseTeacher}>{course.teacherName}</Text>
                <Text style={styles.coursePrice}>${course.price}</Text>
                <View style={styles.courseRating}>
                    <Text>⭐{course.rank} ({course.countLean})</Text>
                </View>
                <Text>{course.lessons} lessons</Text>
            </View>
        </TouchableOpacity>
    );

    //Thao tác lọc các đánh giá dựa trên giá trị của selectedRating
    const [reviews, setReviews] = useState([]); // State lưu các review của giáo viên

    // Hàm fetch review từ Firebase
    const fetchReviews = async (teacherID) => {
        try {
            const reviewsRef = ref(database, 'review'); // Trỏ đến nhánh `review` trong Firebase
            const snapshot = await get(reviewsRef);

            if (snapshot.exists()) {
                // Lọc review theo teacherID
                const allReviews = Object.values(snapshot.val());
                const teacherReviews = allReviews.filter(review => review.teacherID === teacherID);
                setReviews(teacherReviews);
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu review:', error);
        }
    };

    // Gọi hàm fetchReviews khi component mount
    useEffect(() => {
        if (teacher.id) {
            fetchReviews(teacher.id); // Gọi với teacherID
        }
    }, [teacher]);

    // Trạng thái bộ lọc hiện tại (All, 5★, 4★,...)
    const [selectedRating, setSelectedRating] = useState('ALL');

    // Hàm lọc các đánh giá dựa trên giá trị của selectedRating
    const filterReviews = () => {
        if (selectedRating === 'ALL') {
            return reviews; // Hiển thị tất cả các đánh giá
        } else {
            return reviews.filter(review => review.rank === selectedRating);
        }
    };

    const REVIEWS_OF_TEACHER = () => (
        <View>
            <View style={styles.ratingSection}>
                <View style={styles.TextAndCountView}>
                    <Text style={styles.ratingText}>⭐{teacher.rank}/5</Text>
                    <Text style={styles.reviewCount}>({teacher.countReview} reviews)</Text>
                </View>
                <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
            </View>

            {/* Filter Reviews by Stars */}
            <View horizontal style={styles.filterSection}>
                <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating('ALL')}>
                    <Text style={styles.filterText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(5)}>
                    <Text style={styles.filterText}>5 ★</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(4)}>
                    <Text style={styles.filterText}>4 ★</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(3)}>
                    <Text style={styles.filterText}>3 ★</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(2)}>
                    <Text style={styles.filterText}>2 ★</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(1)}>
                    <Text style={styles.filterText}>1 ★</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filterReviews()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <Image style={styles.avatar} source={{ uri: item.image.url }} />
                        <View style={styles.reviewContent}>
                            <Text style={styles.reviewerName}>{item.name}</Text>
                            <Text style={styles.reviewText}>{item.content}</Text>
                            <Text style={styles.ratingStars}>{'★'.repeat(item.rank)}</Text>
                            <Text style={styles.reviewTime}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Teacher's profile</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.subContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={require('../../assets/image/teacherProfile_img/headerImage.png')} // Replace with the banner image URL
                        style={styles.headerImage}
                    />
                </View>

                {/* Teacher Info */}
                <View style={styles.teacherInfo}>
                    <Image
                        source={{ uri: teacher.image.url }} 
                        style={styles.teacherAvatar}
                    />
                    <Text style={styles.teacherName}>{teacher.name}</Text>
                    <TouchableOpacity style={styles.positionName}><Text style={styles.positionText}>Teacher</Text></TouchableOpacity>
                    <Text style={styles.teacherTitle}>{teacher.technique}</Text>
                    <Text style={styles.teacherLocation}>📍{teacher.address}</Text>
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => setSelectedTab('COURSES')} style={selectedTab === 'COURSES' ? styles.activeTab : styles.tab}>
                        <Text style={selectedTab === 'COURSES' ? styles.activeTabText : styles.tabText}>COURSES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedTab('REVIEW')} style={selectedTab === 'REVIEW' ? styles.activeTab : styles.tab}>
                        <Text style={selectedTab === 'REVIEW' ? styles.activeTabText : styles.tabText}>REVIEW</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    {filter()}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
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
        backgroundColor: '#fff',
    },

    header: {
        height: 200,
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    teacherInfo: {
        alignItems: 'center',
        marginTop: -50,
    },
    teacherAvatar: {
        width: 110,
        height: 110,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
    },
    teacherName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },

    positionName: {
        backgroundColor: '#00bad4',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 15
    },

    positionText: {
        color: 'white',
        fontWeight: 700,

    },

    teacherTitle: {
        fontSize: 16,
        color: '#777',
        marginTop: 5,
    },
    teacherLocation: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
    },
    tab: {
        paddingBottom: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#00cec9',
        paddingBottom: 10,
    },
    tabText: {
        fontSize: 16,
        color: '#777',
    },
    activeTabText: {
        fontSize: 16,
        color: '#00cec9',
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 14,
        color: '#00cec9',
    },
    courseList: {
        paddingLeft: 20,
        paddingVertical: 10,
    },
    courseCard: {
        width: 190,
        marginRight: 15,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    courseImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
    courseDetails: {
        marginTop: 10,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courseTeacher: {
        fontSize: 14,
        color: '#777',
    },
    coursePrice: {
        fontSize: 16,
        color: '#00cec9',
        marginTop: 5,
    },
    courseRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    // Css Review
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    TextAndCountView: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingHorizontal: 7,
    },
    ratingText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    reviewCount: {
        color: 'gray',
        marginLeft: 5,
    },
    viewAllButton: {
        backgroundColor: '#007BFF',
        padding: 5,
        borderRadius: 5,
        marginRight: 15,
    },
    viewAllText: {
        color: '#fff',
        fontSize: 14,
    },
    filterSection: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    filterButton: {
        padding: 10,
        backgroundColor: '#F0F0F0',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    filterText: {
        fontSize: 14,
    },
    reviewCard: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewContent: {
        flex: 1,
    },
    reviewerName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reviewText: {
        color: '#555',
        marginBottom: 5,
    },
    ratingStars: {
        color: '#FFD700', // Màu vàng cho sao
        marginBottom: 5,
    },
    reviewTime: {
        color: '#999',
        fontSize: 12,
    },

});

export default TeacherProfile;

