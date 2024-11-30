import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faComment, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart, faFire } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../Login_Logout/UserContext';
import { database } from '../../firebaseConfig'; // Đường dẫn đúng tới file firebaseConfig.js
import { ref, get, onValue, push, set } from 'firebase/database';

const Course_info_QA = ({ course }) => {
    const { user } = useUser();
    const [likeQuestionlected, setLikeCQuestionSelected] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');  // Lưu câu hỏi mới

    // Xử lý like câu hỏi
    const handleQuestionCourse = () => {
        setLikeCQuestionSelected(!likeQuestionlected);
    };

    const [QA, setQA] = useState([]); // Dữ liệu câu hỏi
    // Lấy dữ liệu câu hỏi từ Firebase khi component được render
    useEffect(() => {
        const fetchQA = async (userID, courseID) => {
            try {
                const QARef = ref(database, 'question_answer'); // Trỏ đến nhánh QA trong Firebase
                const snapshot = await get(QARef);

                if (snapshot.exists()) {
                    // Chuyển đổi object thành mảng và lọc theo userID và courseID
                    const allQA = Object.values(snapshot.val());
                    const filteredQA = allQA.filter(
                        (QA) => QA.userID === userID && QA.courseID === courseID
                    );
                    setQA(filteredQA);
                } else {
                    setQA([]);
                }
            } catch (error) {
                console.error('Lỗi khi fetch dữ liệu QA:', error);
            } finally {
            }
        };

        if (user && course) {

            const userID = user.id;
            const courseID = course.id;

            if (!userID || !courseID) {
                // console.error('UserID hoặc CourseID không tồn tại');
                setQA([]);
                return;
            }

            fetchQA(userID, courseID);
        } else {
            setQA([]);
        }
    }, [user, course]);

    // Hàm xử lý đăng câu hỏi lên Firebase
    const handlePostQuestion = async () => {
        if (newQuestion.trim() === '') {
            alert("Vui lòng nhập câu hỏi!");
            return;
        }

        try {
            const timestamp = Date.now();
            const timeString = new Date(timestamp).toLocaleString();
            const newQuestionId = new Date().getTime().toString();

            const newQuestionRef = push(ref(database, 'question_answer'));  // Lấy đường dẫn câu hỏi theo course
            const newQuestionData = {
                content: newQuestion,
                courseID: course.id,
                userID: user.id,
                likes: 0,
                comments: 0,
                time: timeString,
                id: newQuestionId,
            };

            // Thêm câu hỏi vào Firebase
            await set(newQuestionRef, newQuestionData);

            // Cập nhật state QA để câu hỏi mới xuất hiện ngay lập tức trên giao diện
            setQA(prevQA => [newQuestionData, ...prevQA]);

            // Reset ô nhập liệu sau khi đăng câu hỏi
            setNewQuestion('');
        } catch (error) {
            console.error("Error posting question: ", error);
        }
    };

    // Component hiển thị mỗi câu hỏi
    const Question_item = ({ item }) => {

        const [likeQuestionlected, setLikeCQuestionSelected] = useState(false);
        const handleQuestionCourse = () => {
            setLikeCQuestionSelected(!likeQuestionlected);
        };

        return (
            <View style={styles.item_container}>
                {/* avatar */}
                <View style={styles.user}>
                    <View style={styles.avatar_wrap}>
                        <Image style={styles.avatar} source={{ uri: user.image.url }} resizeMode="cover" />
                    </View>
                    <View style={styles.user_name}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{user.name}</Text>
                        <Text style={{ fontSize: 14, color: '#ccc' }}>{item.time}</Text>
                    </View>
                </View>
                {/* content */}
                <Text style={styles.question}>{item.content}</Text>
                {/* like and comment */}
                <View style={styles.like_comment}>
                    <Pressable style={{ paddingLeft: 8 }} onPress={handleQuestionCourse}>
                        {likeQuestionlected ? (
                            <FontAwesomeIcon style={{ paddingRight: 8, color: 'red' }} icon={solidHeart} />
                        ) : (
                            <FontAwesomeIcon style={{ paddingRight: 8 }} icon={faHeart} />
                        )}
                    </Pressable>
                    <Text style={{ paddingRight: 24 }}>{item.likes}</Text>
                    <FontAwesomeIcon style={{ paddingRight: 8 }} icon={faComment} />
                    <Text style={{ paddingRight: 16 }}>{item.comments} comment</Text>
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            {/* Ô nhập liệu và nút đăng câu hỏi */}
            <View style={styles.input_container}>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập câu hỏi của bạn..."
                    value={newQuestion}
                    onChangeText={setNewQuestion}
                />
                <Pressable style={styles.button} onPress={handlePostQuestion}>
                    <Text style={styles.buttonText}>Đăng câu hỏi</Text>
                </Pressable>
            </View>

            {/* Hiển thị danh sách câu hỏi từ Firebase */}
            <FlatList
                data={QA}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Question_item item={item} />}
                style={styles.scrollView}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginBottom: 50,
    },
    item_container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 8,
        padding: 8,
    },
    // user
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar_wrap: {
        height: 80,
        width: '20%',
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 50,
    },
    user_name: {
        paddingLeft: 16,
    },
    like_comment: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    question: {
        paddingTop: 16,
        paddingBottom: 16,
        textAlign: 'justify',
    },
    input_container: {
        marginTop: 12,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#0066CC',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    user_info: {
        flex: 1,
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    question_content: {
        marginTop: 10,
        fontSize: 16,
    },
    actions: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default Course_info_QA;
