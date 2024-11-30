import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ref, push, set, get, update } from 'firebase/database';
import { database } from '../../firebaseConfig';
import { text } from '@fortawesome/fontawesome-svg-core';

const AddCourse = ({ navigation, route }) => {
    const { categoryName } = route.params;

    // State để lưu thông tin khóa học
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [lessonGroups, setLessonGroups] = useState([{
        lessonGroup_id: 1,
        lessonGroup_title: "Bắt đầu",
        lessonList: [
            { lesson_name: "Giới thiệu về khóa học", state: "done", time: "01:00 mins" }
        ]
    }]);
    const [price, setPrice] = useState('');
    const [lessons, setLessons] = useState('');  // Số lượng bài học
    const [teacherName, setTeacherName] = useState('');
    const [videoLink, setVideoLink] = useState('');


    useEffect(() => {
        setCategory(categoryName);
    }, [categoryName]);

    // Hàm xử lý thêm khóa học
    const handleAddCourse = async () => {
        if (!name || !category || !description || !imageUrl || !price || !lessons || !teacherName || !videoLink) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const newCourse = {
            name,
            category,
            description,
            image: { url: imageUrl },
            price,
            lessons,
            teacherName,
            video: videoLink,
            lessonGroups,
        };

        try {
            const courseRef = ref(database, 'Courses');
            const newCourseRef = push(courseRef);  // Thêm khóa học mới vào Firebase
            const newCourseID = newCourseRef.key;
            await set(newCourseRef, newCourse);
            Alert.alert("Thành công", "Khóa học đã được thêm.");

            // 2. Lấy dữ liệu giáo viên từ Firebase dựa vào teacherName
            const teacherRef = ref(database, 'teacher');
            const snapshot = await get(teacherRef);

            if (snapshot.exists()) {
                const teachers = snapshot.val();
                let teacherID = null;

                // Tìm giáo viên theo teacherName
                for (const id in teachers) {
                    if (teachers[id].name === teacherName) {
                        teacherID = id;
                        break;
                    }
                }

                if (teacherID) {
                    // 3. Lấy dữ liệu của teacher course_teaching
                    const teacherCourseTeachingRef = ref(database, `teacher/${teacherID}/course_teaching`);

                    // Lấy dữ liệu hiện tại của course_teaching, sau đó thêm khóa học mới
                    const teacherSnapshot = await get(teacherCourseTeachingRef);
                    const currentCourses = teacherSnapshot.exists() ? teacherSnapshot.val() : [];

                    // 4. Thêm khóa học mới vào course_teaching
                    const updatedCourses = [...currentCourses, { courseID: newCourseID }];

                    // Cập nhật lại mảng course_teaching
                    await set(teacherCourseTeachingRef, updatedCourses);
                } else {
                    Alert.alert("Không tìm thấy giáo viên với tên này.");
                }
            } else {
                Alert.alert("Không có dữ liệu giáo viên.");
            }
            Alert.alert("Thêm khóa học thành công!");
            navigation.goBack();  // Quay lại màn hình trước đó sau khi thêm khóa học
        } catch (error) {
            Alert.alert("Lỗi", "Có lỗi xảy ra khi thêm khóa học.");
            console.error(error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <Text style={styles.header}>Thêm Khóa Học Mới</Text>
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
                value={categoryName}
                editable={false}
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
                value={price}
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

            <TouchableOpacity style={styles.button} onPress={handleAddCourse}>
                <Text style={styles.buttonText}>Thêm khóa học</Text>
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


export default AddCourse;
