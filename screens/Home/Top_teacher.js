import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig';  // Import cấu hình Firebase 

const Top_teacher = ({ navigation }) => {
    const [teacher, setTeacher] = useState(null);

    // Hàm lấy dữ liệu từ Firebase
    const fetchTeacher = async () => {
        const teacherRef = ref(database, 'teacher');
        try {
            const snapshot = await get(teacherRef);
            if (snapshot.exists()) {
                const teacherData = Object.keys(snapshot.val()).map(key => ({
                    id: key, // Lấy key làm id
                    ...snapshot.val()[key], // Thêm dữ liệu từ nút con
                }));
                console.log("Dữ liệu giáo viên từ Firebase:", teacherData);
                setTeacher(teacherData);  // Lưu dữ liệu vào state
            } else {
                console.log('Không có dữ liệu');
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu giáo viên:", error);
        }
    };

    useEffect(() => {
        fetchTeacher();  // Gọi hàm fetch khi component mount
    }, []);

    const Render_item_teacher = ({ item }) => {
        const [isStar, setIsStar] = React.useState(false);
        const handleStar = () => {
            setIsStar(!isStar);
        };

        return (
            <TouchableOpacity style={styles.teacher_item} onPress={() => navigation.navigate('TeacherProfile',{teacher:item})}>
                <Image source={{ uri: item.image.url }} style={styles.teacher_item_image} />
                <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ color: '#333' }}>{item.education}</Text>
                    </View>
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
                        {item.rank} ({item.countReview})
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.popular_course_header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Top teacher</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#007BFF' }}>View more</Text>
                </TouchableOpacity>
            </View>
            {/* lisst popular course section */}
            <View>
                <FlatList
                    data={teacher}
                    renderItem={({ item }) => <Render_item_teacher item={item} />}
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
        paddingBottom: 100,
    },
    popular_course_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    teacher_item: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginRight: 16,
        backgroundColor: '#effaff',
    },
    teacher_item_image: {
        height: 120,
        width: 120,
        // borderRadius: 8,
        
    },
});

export default Top_teacher;
