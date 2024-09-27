import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookMark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const data_course = [
    {
        id: 1,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        author: 'John Doe',
        price: 20,
        rating: 4.5,
        ratingNumber: 100,
        lessonsNumber: 10,
        isBookMark: false,
    },
    {
        id: 2,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        author: 'John Doe',
        price: 20,
        rating: 4.5,
        ratingNumber: 100,
        lessonsNumber: 10,
        isBookMark: false,
    },
    {
        id: 3,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        author: 'John Doe',
        price: 20,
        rating: 4.5,
        ratingNumber: 100,
        lessonsNumber: 10,
        isBookMark: false,
    },
    {
        id: 4,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        author: 'John Doe',
        price: 20,
        rating: 4.5,
        ratingNumber: 100,
        lessonsNumber: 10,
        isBookMark: false,
    },
];

const Render_item_course = ({ item }) => {
    const [isBookMark, setIsBookMark] = React.useState(item.isBookMark);
    const handleBookMark = () => {
        setIsBookMark(!isBookMark);
    };

    const [isStar, setIsStar] = React.useState(false);
    const handleStar = () => {
        setIsStar(!isStar);
    };

    return (
        <View style={styles.course_item}>
            {/* image course */}
            <Image source={item.image} style={styles.course_item_image} />

            {/* info course */}
            <View style={styles.info_course}>
                {/* name    author  boormark */}
                <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ color: '#333' }}>{item.author}</Text>
                    </View>
                    <TouchableOpacity onPress={handleBookMark}>
                        {isBookMark ? (
                            <FontAwesomeIcon style={{ paddingTop: 8, height: '100%', width: 18 }} icon={solidBookMark} />
                        ) : (
                            <FontAwesomeIcon style={{ paddingTop: 8, height: '100%', width: 18 }} icon={faBookmark} />
                        )}
                    </TouchableOpacity>
                </View>
                {/* price */}
                <Text style={{ color: 'cyan', fontWeight: 'bold' }}>${item.price}</Text>
                {/* rating      lessons number */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleStar}>
                        {isStar ? (
                            <FontAwesomeIcon style={{ paddingRight: 8, color: 'orange' }} icon={solidStar} onPress={handleStar} />
                        ) : (
                            <FontAwesomeIcon style={{ paddingRight: 8, color: 'orange' }} icon={faStar} onPress={handleStar} />
                        )}
                    </TouchableOpacity>
                    <Text style={{ paddingRight: 16 }}>
                        {item.rating} ({item.ratingNumber})
                    </Text>
                    <Text>{item.lessonsNumber} lessons</Text>
                </View>
            </View>
        </View>
    );
};

const Course_inspires = () => {
    return (
        <View style={styles.container}>
            <View style={styles.popular_course_header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Course inspires</Text>
                <TouchableOpacity>
                    <Text style={{ color: 'cyan' }}>View more</Text>
                </TouchableOpacity>
            </View>
            {/* lisst popular course section */}
            <View>
                <FlatList
                    data={data_course}
                    renderItem={({ item }) => <Render_item_course item={item} />}
                    keyExtractor={(item) => item.id}
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
});

export default Course_inspires;
