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
        level: 'University',
        rating: 4.5,
        ratingNumber: 100,
    },
    {
        id: 2,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        level: 'University',
        rating: 4.5,
        ratingNumber: 100,
    },
    {
        id: 3,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        level: 'University',
        rating: 4.5,
        ratingNumber: 100,
    },
    {
        id: 4,
        image: require('../../assets/image/course_info/banner.jpg'),
        name: 'Project Manager',
        level: 'University',
        rating: 4.5,
        ratingNumber: 100,
    },
];

const Top_teacher = ({navigation}) => {
    const Render_item_teacher = ({ item }) => {
        const [isStar, setIsStar] = React.useState(false);
        const handleStar = () => {
            setIsStar(!isStar);
        };
    
        return (
            <TouchableOpacity style={styles.teacher_item} onPress={() => navigation.navigate('TeacherProfile')}>
                <Image source={item.image} style={styles.teacher_item_image} />
                <View style={{ flexDirection: 'row', paddingTop: 8, paddingBottom: 8, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.name}</Text>
                        <Text style={{ color: '#333' }}>{item.level}</Text>
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
                        {item.rating} ({item.ratingNumber})
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
                    <Text style={{ color: 'cyan' }}>View more</Text>
                </TouchableOpacity>
            </View>
            {/* lisst popular course section */}
            <View>
                <FlatList
                    data={data_course}
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
    },
    teacher_item_image: {
        height: 100,
        width: 200,
        borderRadius: 8,
    },
});

export default Top_teacher;
