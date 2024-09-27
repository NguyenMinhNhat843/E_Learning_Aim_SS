import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookMark, faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import Footer from '../Home/Footer';

const data_search_result = [
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

const Search_result = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* search input section */}
                <View style={styles.search_section}>
                    <View style={styles.search_input}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <TextInput style={styles.input} placeholder="Search Course" placeholderTextColor={'#f5f5f5'} />
                    </View>
                    <TouchableOpacity style={styles.filter_button}>
                        <FontAwesomeIcon icon={faFilter} />
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                {/* Search result section */}
                <View style={{ padding: 16, height: '80%' }}>
                    <FlatList
                        data={data_search_result}
                        renderItem={({ item }) => <Render_item_course item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>

                {/* Footer */}
                <Footer />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
    },
    search_section: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    search_input: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#f5f5f5',
        backgroundColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 16,
    },
    input: {
        flex: 1,
        padding: 12,
        color: '#424242',
        outline: 'none',
    },
    filter_button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00c2d9',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 16,
    },
    filterText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
    // hot topics section
    hot_topics_list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    hot_topics_section: {
        padding: 16,
    },
    hot_topics_text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 16,
    },
    hot_topics_item: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'cyan',
        borderRadius: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    // category section
    category_section: {
        padding: 16,
        paddingTop: 0,
    },
    category_item: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
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
