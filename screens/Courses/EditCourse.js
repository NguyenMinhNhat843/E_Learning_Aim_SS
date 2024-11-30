import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, set } from 'firebase/database';
import { database } from '../../firebaseConfig';

const EditCourse = ({ navigation, route }) => {
    const { course } = route.params;

    // State để lưu thông tin khóa học
    const [name, setName] = useState(course.name || '');  // Dùng giá trị từ course nếu có
    const [category, setCategory] = useState(course.category || ''); 
    const [description, setDescription] = useState(course.description || ''); 
    const [imageUrl, setImageUrl] = useState(course.image.url || ''); 
    const [lessonGroups, setLessonGroups] = useState(course.lessonGroups || []); 
    const [price, setPrice] = useState(course.price || ''); 
    const [lessons, setLessons] = useState(course.lessons || ''); 
    const [teacherName, setTeacherName] = useState(course.teacherName || '');
    const [videoLink, setVideoLink] = useState(course.video || '');

    //Các trường không cần thay đổi,
    const [id, setId] = useState(course.id || '');
    const [counntLean, setCountLean] = useState(course.countLean || '');
    const [rank, setRank] = useState(course.rank || '');
    const [status, setStatus] = useState(course.status || '');
    const [lessonGroup, setLessonGroup] = useState(course.lessonGroup || '');


    // Hàm cập nhật khóa học
    const handleSave = async () => {
        if (!name || !category || !description || !imageUrl || !price || !lessons || !teacherName || !videoLink) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            // Cập nhật thông tin khóa học vào Firebase
            const courseRef = ref(database, `Courses/${course.id-1}`);
            await set(courseRef, {
                name,
                category,
                description,
                image: { url: imageUrl },
                lessonGroups,
                price,
                teacherName,
                video: videoLink,
                lessons,
                id,
                counntLean,
                rank,
                status,
                lessonGroup,
            });

            Alert.alert('Thành công', 'Khóa học đã được cập nhật!');
            navigation.goBack(); // Quay lại trang danh sách khóa học sau khi lưu thành công

        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình cập nhật khóa học.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.header}>Sửa Khóa Học {course.name}</Text>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Tên khóa học</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nhập tên khóa học"
            />

            <Text style={styles.label}>Thể loại</Text>
            <TextInput
                style={styles.input}
                value={category}
                onChangeText={setCategory}
                placeholder="Nhập thể loại"
            />

            <Text style={styles.label}>Mô tả</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Nhập mô tả"
            />

            <Text style={styles.label}>Giá</Text>
            <TextInput
                style={styles.input}
                value={String(price)}
                onChangeText={(text) => setPrice(Number(text))}
                keyboardType="numeric"
                placeholder="Nhập giá"
            />

            <Text style={styles.label}>Số lượng bài học</Text>
            <TextInput
                style={styles.input}
                value={String(lessons)}
                onChangeText={(text) => setLessons(Number(text))}
                keyboardType="numeric"
                placeholder="Nhập số lượng bài học"
            />

            <Text style={styles.label}>Tên giáo viên</Text>
            <TextInput
                style={styles.input}
                value={teacherName}
                onChangeText={setTeacherName}
                placeholder="Nhập tên giáo viên"
            />

            <Text style={styles.label}>URL hình ảnh</Text>
            <TextInput
                style={styles.input}
                value={imageUrl}
                onChangeText={setImageUrl}
                placeholder="Nhập URL hình ảnh"
            />

            <Text style={styles.label}>Link Video</Text>
            <TextInput
                style={styles.input}
                value={videoLink}
                onChangeText={setVideoLink}
                placeholder="Nhập link video"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
        padding: 10,
        marginLeft: -8,
        marginRight: -8,
        borderBottomColor: '#ddd',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        // marginBottom: 20,
        // textAlign: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default EditCourse;
