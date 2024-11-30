import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig';  // Import cấu hình Firebase


const Popular_course = ({ navigation }) => {
    const [courses, setCourses] = useState(null);

    // Hàm lấy dữ liệu từ Firebase
    const fetchCourses = async () => {
        const coursesRef = ref(database, 'Courses');
        try {
            const snapshot = await get(coursesRef);
            if (snapshot.exists()) {
                const coursesData = Object.keys(snapshot.val()).map(key => ({
                    id: key, // Lấy key làm id
                    ...snapshot.val()[key], // Thêm dữ liệu từ nút con
                }));
                console.log("Dữ liệu khóa học từ Firebase:", coursesData);
                setCourses(coursesData);  // Lưu dữ liệu vào state
            } else {
                console.log('Không có dữ liệu');
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu Khóa học:", error);
        }
    };

    useEffect(() => {
        fetchCourses(); 
    }, []);


    const Render_item_course = ({ item }) => {
        if (item.status === "Popular") {
            const [isBookMark, setIsBookMark] = React.useState(item.isBookMark);
            const handleBookMark = () => {
                setIsBookMark(!isBookMark);
            };

            const [isStar, setIsStar] = React.useState(false);
            const handleStar = () => {
                setIsStar(!isStar);
            };

            return (
                <TouchableOpacity style={styles.course_item} onPress={() => navigation.navigate("CourseDetails_OverView",{courses:item})}>
                    <Image source={{uri:item.image.url}} style={styles.course_item_image} />
                    <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                            <Text style={{ color: '#333' }}>{item.teacherName}</Text>
                            <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>${item.price}</Text>
                        </View>
                        <TouchableOpacity onPress={handleBookMark}>
                            {isBookMark ? (
                                <FontAwesomeIcon style={{ paddingTop: 8 }} icon={solidBookMark} />
                            ) : (
                                <FontAwesomeIcon style={{ paddingTop: 8 }} icon={faBookmark} />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleStar}>
                            {isStar ? (
                                <FontAwesomeIcon style={{ paddingRight: 8, color: 'orange' }} icon={solidStar} onPress={handleStar} />
                            ) : (
                                <FontAwesomeIcon style={{ paddingRight: 8, color: 'orange' }} icon={faStar} onPress={handleStar} />
                            )}
                        </TouchableOpacity>
                        <Text style={{ paddingRight: 16 }}>
                            {item.rank} ({item.countLean})
                        </Text>
                        <Text>{item.lessons} lessons</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.popular_course_header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Popular Course</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#007BFF' }}>View more</Text>
                </TouchableOpacity>
            </View>
            {/* lisst popular course section */}
            <View>
                <FlatList
                    data={courses}
                    renderItem={({ item }) => <Render_item_course item={item} />}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    popular_course_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    course_item: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 16,
    },
    course_item_image: {
        height: 100,
        width: 200,
        borderRadius: 8,
    },
});

export default Popular_course;
