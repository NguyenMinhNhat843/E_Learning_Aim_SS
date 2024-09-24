import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import yourImage from '../../assets/image/CourseDetail_img/abc.jpg';

const CourseDetail_Overview = () => {
    return (
        <View style={styles.container}>
            {/* info teacher section */}
            <View style={info_teacher_css.container}>
                <Image style={info_teacher_css.avatar} source={yourImage} />
                <View style={info_teacher_css.infoContainer}>
                    <Text style={info_teacher_css.name}>Sara Weise</Text>
                    <Text style={info_teacher_css.profession}>UI/UX Designer</Text>
                </View>
                <Pressable style={info_teacher_css.followButton}>
                    <Text style={info_teacher_css.followButtonText}>Follow</Text>
                </Pressable>
            </View>

            {/* description section */}
            <View>
                <Text style={description_css.font_bold}>Description</Text>
                <Text style={description_css.description}>
                    Convallis in semper laoreet nibh leo. iaculis tincidunt tortor, risus, scelerisque   risus...
                    <Text style={description_css.seeMore}>See more</Text>
                </Text>
            </View>

            {/* Benefit section */}
            <View style={benefits_css.benefitsContainer}>
                <View style={benefits_css.benefitItem}>
                    <Image source={yourImage} style={benefits_css.benefitIcon} />
                    <Text style={benefits_css.benefitText}>14 hours on-demand video</Text>
                </View>
                <View style={benefits_css.benefitItem}>
                    <Image source={yourImage} style={benefits_css.benefitIcon} />
                    <Text style={benefits_css.benefitText}>Native teacher</Text>
                </View>
                <View style={benefits_css.benefitItem}>
                    <Image source={yourImage} style={benefits_css.benefitIcon} />
                    <Text style={benefits_css.benefitText}>100% free document</Text>
                </View>
                <View style={benefits_css.benefitItem}>
                    <Image source={yourImage} style={benefits_css.benefitIcon} />
                    <Text style={benefits_css.benefitText}>Full lifetime access</Text>
                </View>
                <View style={benefits_css.benefitItem}>
                    <Image source={yourImage} style={benefits_css.benefitIcon} />
                    <Text style={benefits_css.benefitText}>Certificate of complete</Text>
                </View>
                <View style={benefits_css.benefitItem}>
                    <Image source={yourImage} style={benefits_css.benefitIcon} />
                    <Text style={benefits_css.benefitText}>24/7 support</Text>
                </View>
            </View>

            {/* Similar course section */}
            <View>
                <Text style={styles.font_bold}>Similar course</Text>
                {list_course.map((course, index) => (
                    <CourseItem key={index} {...course} />
                ))}
            </View>
        </View>
    );
};

const list_course = [
    {
        image: require('../../assets/image/CourseDetail_img/abc.jpg'),
        title: 'UX Foundation',
        instructor: 'Dennis Sweeny',
        price: '80$',
        rating: '4.5',
        numReviews: '1233',
        numLessons: '12',
    },
    {
        image: require('../../assets/image/CourseDetail_img/abc.jpg'),
        title: 'UX Foundation',
        instructor: 'Dennis Sweeny',
        price: '80$',
        rating: '4.5',
        numReviews: '1233',
        numLessons: '12',
    },
    {
        image: require('../../assets/image/CourseDetail_img/abc.jpg'),
        title: 'UX Foundation',
        instructor: 'Dennis Sweeny',
        price: '80$',
        rating: '4.5',
        numReviews: '1233',
        numLessons: '12',
    },
];

const CourseItem = ({ image, title, instructor, price, rating, numReviews, numLessons }) => {
    return (
        <View style={[styles.container, styles.courseItem]}>
            <View style={styles.course_item_img_wrap}>
                <Image style={[styles.courseItem_img]} source={image} resizeMode="cover" />
            </View>
            <View style={[styles.info_course_column]}>
                <Text style={[styles.font_bold]}>{title}</Text>
                <Text style={[styles.font_light]}>{instructor}</Text>
                <View>
                    <Text style={[styles.font_bold, styles.text_blue]}>${price}</Text>
                    <View style={[styles.row, styles.justify_space_between]}>
                        <Text style={styles.font_light}>
                            {rating} {numReviews}
                        </Text>
                        <Text style={styles.font_light}>{numLessons} lessons</Text>
                    </View>
                </View>
            </View>
            <Pressable style={styles.bookmark}>a</Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    courseItem: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        height: 130,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    justify_space_between: {
        justifyContent: 'space-between',
    },
    justify_space_around: {
        justifyContent: 'space-around',
    },
    info_course_column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        flex: 5,
        paddingLeft: 8,
    },
    padding_bottom: {
        paddingBottom: 8,
    },
    font_bold: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    font_light: {
        fontWeight: 'light',
        fontSize: 16,
    },
    text_blue: {
        color: 'skyblue',
    },
    course_item_img_wrap: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    courseItem_img: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imageIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    bookmark: {
        flex: 2,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
});

const info_teacher_css = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profession: {
        color: 'gray',
    },
    followButton: {
        backgroundColor: '#4285F4',
        borderRadius: 8,
        padding: 8,
        marginLeft: 16,
    },
    followButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

const description_css = StyleSheet.create({
    font_bold: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    seeMore: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    description: {
        fontSize: 14,
        marginBottom: 16,
    },
});

const benefits_css = StyleSheet.create({
    benefitsContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    benefitItem: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 8,
    },
    benefitIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    benefitText: {
        fontSize: 16,
        paddingLeft: 8,
    },
});

const similar_course_css = StyleSheet.create({});

export default CourseDetail_Overview;
