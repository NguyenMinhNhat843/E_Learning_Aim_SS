import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookMark, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

const Render_item_course = ({ item }) => {
    // xử lý đánh dấu sách
    const [isBookMark, setIsBookMark] = React.useState(item.isBookMark);
    const handleBookMark = () => {
        setIsBookMark(!isBookMark);
    };

    // xư lý đánh giá sao
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
                {/* rating lessons number */}
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

const Search_result = ({ data }) => {
    return (
        <View style={{ flex: 1 }}>
            {data.length === 0 ? (
                <Text>Not found</Text>
            ) : (
                <FlatList data={data} renderItem={({ item }) => <Render_item_course item={item} />} keyExtractor={(item) => item.id} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    // search result
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

export default Search_result;
