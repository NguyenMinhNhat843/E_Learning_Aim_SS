import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebaseConfig';
import { ref, get, remove, set } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const CategoryDetail = ({ navigation, route }) => {
    const { categoryName } = route.params;
    const [courses, setCourses] = useState([]);
    const [bookmarks, setBookmarks] = useState({}); // Lưu trạng thái bookmark của từng khóa học
    const [stars, setStars] = useState({}); // Lưu trạng thái sao của từng khóa học

    // Fetch courses from Firebase
    const fetchCourse = async (categoryName) => {
        try {
            const courseRef = ref(database, `Courses`);
            const snapshot = await get(courseRef);
            if (snapshot.exists()) {
                const courses = snapshot.val();
                const matchingCourses = Object.keys(courses)
                    .filter((id) => courses[id].category === categoryName)
                    .map((id) => ({
                        id: id,
                        ...courses[id],
                    }));

                if (matchingCourses.length === 0) {
                    console.warn(`Không tìm thấy khóa học với loại: ${categoryName}`);
                    setCourses([]);
                    return;
                }

                setCourses(matchingCourses);
            } else {
                console.warn(`Không có dữ liệu khóa học trong Firebase.`);
            }
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu khóa học:', error);
        }
    };

    // useEffect(() => {
    //     if (categoryName) {
    //         fetchCourse(categoryName);
    //     }
    // }, [categoryName]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchCourse(categoryName);
        });
    
        return unsubscribe; // Cleanup listener khi component bị unmount
      }, [navigation, categoryName]);

    // Hàm xử lý bookmark
    const handleBookMark = (id) => {
        setBookmarks((prevBookmarks) => ({
            ...prevBookmarks,
            [id]: !prevBookmarks[id],
        }));
    };

    // Hàm xử lý đánh giá sao
    const handleStar = (id) => {
        setStars((prevStars) => ({
            ...prevStars,
            [id]: !prevStars[id],
        }));
    };

    // Hàm xử lý thêm khóa học
    const handleAdd = () => {
        navigation.navigate('Add Course', { categoryName: categoryName });
    };

    // Hàm xử lý xóa khóa học
    const handleDelete = (courseID) => {
        // Hiển thị hộp thoại xác nhận trước khi xóa
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa khóa học này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: () => deleteCourse(courseID)
                }
            ]
        );
    };

    // Hàm xử lý xóa khóa học từ Firebase
    const deleteCourse = async (courseID) => {
        try {
            // 1. Xóa khóa học khỏi mục `Courses`
            const courseRef = ref(database, `Courses/${courseID}`);
            await remove(courseRef);

            // 2. Lấy danh sách giáo viên có khóa học này
            const teacherRef = ref(database, `teacher`);
            const teacherSnapshot = await get(teacherRef);

            if (teacherSnapshot.exists()) {
                const teachers = teacherSnapshot.val();

                // 3. Cập nhật `course_teaching` của từng giáo viên, xóa khóa học khỏi `course_teaching`
                for (const teacherID in teachers) {
                    const teacher = teachers[teacherID];
                    const courseTeachingRef = ref(database, `teacher/${teacherID}/course_teaching`);

                    if (teacher.course_teaching) {
                        const updatedCourses = teacher.course_teaching.filter(course => course.courseID !== courseID);

                        // Cập nhật lại danh sách khóa học của giáo viên
                        await set(courseTeachingRef, updatedCourses);
                    }
                }
            }

            // Sau khi xóa thành công
            Alert.alert("Thành công", "Khóa học đã được xóa.");
            // Cập nhật lại danh sách khóa học
            setCourses(courses.filter(course => course.id !== courseID));

        } catch (error) {
            console.error("Error deleting course: ", error);
            Alert.alert("Lỗi", "Có lỗi xảy ra khi xóa khóa học.");
        }
    };

    // Render item
    const renderItem = ({ item }) => {
        const isBookMarked = bookmarks[item.id]; // Truyền trạng thái bookmark từ state
        const isStarred = stars[item.id]; // Truyền trạng thái sao từ state

        return (
            <TouchableOpacity style={styles.course_item} onPress={() => navigation.navigate('CourseDetails_OverView', { courses: item })}>
                <Image source={{ uri: item.image.url }} style={styles.course_item_image} />
                <View style={styles.info_course}>
                    <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ color: '#333' }}>{item.author}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleBookMark(item.id)}>
                            {isBookMarked ? (
                                <FontAwesomeIcon style={{ paddingTop: 8, height: '100%', width: 18 }} icon={solidBookMark} />
                            ) : (
                                <FontAwesomeIcon style={{ paddingTop: 8, height: '100%', width: 18 }} icon={faBookmark} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>${item.price}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => handleStar(item.id)}>
                            <FontAwesomeIcon style={{ paddingRight: 8, color: 'orange' }} icon={isStarred ? solidStar : faStar} />
                        </TouchableOpacity>
                        <Text style={{ paddingRight: 16 }}>
                            {item.rating} ({item.rank})
                        </Text>
                        <Text>{item.lessons} lessons</Text>
                    </View>

                    {/* Thêm các icon Edit và Delete vào đây */}
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Edit Course', { course: item })} style={{ marginRight: 10 }}>
                            <FontAwesomeIcon icon={faEdit} size={25} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <FontAwesomeIcon icon={faTrash} size={25} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>


        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Courses in {categoryName}</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={courses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContent}
            />

            {/* Nút Add dưới cùng */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdd}
            >
                <FontAwesomeIcon icon={faPlus} size={24} color="white" />
                <Text style={styles.addButtonText}>Add Course</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
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
        // marginBottom: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: 5,
    },
    course_item: {
        padding: 8,
        width: '100%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 16,
        marginBottom: 16,
    },
    course_item_image: {
        height: '100%',
        width: '30%',
        borderRadius: 8,
    },
    info_course: {
        paddingLeft: 8,
        width: '70%',
    },
    flatListContent: {
        marginBottom: 100,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    addButton: {
        alignSelf: 'center',
        backgroundColor: '#007bff',
        borderRadius: 10,
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        marginTop: 5,
        fontWeight: 'bold',
    },
});

export default CategoryDetail;
