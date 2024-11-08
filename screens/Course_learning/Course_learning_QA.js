import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TextInput, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faComment, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart, faFire } from '@fortawesome/free-solid-svg-icons';

const data_question = [
    {
        id: '1',
        avatar: '../../assets/image/course_info/banner.jpg',
        username: 'Jane Barry',
        time: '1 day ago',
        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.ue vero nesciunt cupiditate sint, quas quae voluptates',
        like: 23,
        comment: 5,
    },
    {
        id: '2',
        avatar: '../../assets/image/course_info/banner.jpg',
        username: 'Jane Barry',
        time: '1 day ago',
        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.ue vero nesciunt cupiditate sint, quas quae voluptates',
        like: 23,
        comment: 5,
    },
    {
        id: '3',
        avatar: '../../assets/image/course_info/banner.jpg',
        username: 'Jane Barry',
        time: '1 day ago',
        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.ue vero nesciunt cupiditate sint, quas quae voluptates',
        like: 23,
        comment: 5,
    },
    {
        id: '4',
        avatar: '../../assets/image/course_info/banner.jpg',
        username: 'Jane Barry',
        time: '1 day ago',
        question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.ue vero nesciunt cupiditate sint, quas quae voluptates',
        like: 23,
        comment: 5,
    },
];
const Question_item = ({ item }) => {
    const { avatar, username, time, question, like, comment } = item;

    const [likeQuestionlected, setLikeCQuestionSelected] = useState(false);
    const handleQuestionCourse = () => {
        setLikeCQuestionSelected(!likeQuestionlected);
    };

    return (
        <View style={styles.item_container}>
            {/* avatar */}
            <View style={styles.user}>
                <View style={styles.avatar_wrap}>
                    <Image style={styles.avatar} source={require('../../assets/image/course_info/banner.jpg')} resizeMode="cover" />
                </View>
                <View style={styles.user_name}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{username}</Text>
                    <Text style={{ fontSize: 14, color: '#ccc' }}>{time}</Text>
                </View>
            </View>
            {/* comment */}
            <Text style={styles.question}>{question}</Text>
            {/* like and comment */}
            <View style={styles.like_comment}>
                <Pressable style={{ paddingLeft: 8 }} onPress={handleQuestionCourse}>
                    {likeQuestionlected ? (
                        <FontAwesomeIcon style={{ paddingRight: 8, color: 'red' }} icon={solidHeart} />
                    ) : (
                        <FontAwesomeIcon style={{ paddingRight: 8 }} icon={faHeart} />
                    )}
                </Pressable>
                <Text style={{ paddingRight: 24 }}>{like}</Text>
                <FontAwesomeIcon style={{ paddingRight: 8 }} icon={faComment} />
                <Text style={{ paddingRight: 16 }}>{comment} comment</Text>
            </View>
        </View>
    );
};

const Course_info_QA = () => {
    return (
        <View style={styles.container}>
            <FlatList data={data_question} renderItem={({ item }) => <Question_item item={item} />} keyExtractor={(item) => item.id} />
            {/* my comment */}
            <View style={styles.my_comment}>
                <View style={styles.avatar_wrap}>
                    <Image style={styles.avatar} source={require('../../assets/image/course_info/banner.jpg')} />
                </View>
                <View style={styles.comment_block}>
                    <View style={styles.icon}>
                        <FontAwesomeIcon style={{ color: 'red' }} icon={solidHeart} />
                        <FontAwesomeIcon style={{ color: 'orange' }} icon={faFaceSmile} />
                        <FontAwesomeIcon style={{ color: 'red' }} icon={faFire} />
                    </View>
                    <View style={styles.question_wrap}>
                        <TextInput style={styles.question} placeholder="Write a Q&A..." />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    item_container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        padding: 8,
    },
    // user
    user: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar_wrap: {
        height: 60,
        width: '20%',
    },
    avatar: {
        height: '100%',
        width: '100%',
        borderRadius: '50%',
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
    // my comment
    my_comment: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        paddingTop: 24,
        marginTop: 16,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    comment_block: {
        paddingLeft: 16,
        justifyContent: 'space-between',
        height: '100%',
        flex: 1,
    },
    icon: {
        flexDirection: 'row',
        gap: 8,
    },
    question_wrap: {
        backgroundColor: '#c3c3c3',
        borderRadius: 8,
    },
    question: {
        width: '100%',
        padding: 8,
    },
});

export default Course_info_QA;
