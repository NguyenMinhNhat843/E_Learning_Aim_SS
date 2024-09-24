import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import avatar from '../../assets/image/CourseDetail_img/abc.jpg';

const RatingComponent = ({ rating, numReviews }) => {
    return (
        <View style={review_css.ratingContainer}>
            <View style={styles.rating_row}>
                <View style={[styles.flex_row]}>
                    <MaterialIcons name="star-rate" size={24} color="yellow" />
                    <Text style={styles.font_bold}>{rating}/5</Text>
                    <Text style={styles.font_light}>({numReviews}+ reviews)</Text>
                </View>
                <Pressable>
                    <Text style={styles.font_view_all}>View all</Text>
                </Pressable>
            </View>
            <View style={styles.rating_row}>
                {['All', 1, 2, 3, 4, 5].map((star) => (
                    <Pressable key={star} style={styles.rating}>
                        <MaterialIcons name="star-rate" size={12} color="#03bed3" />
                        <Text style={styles.start_text}>{star}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

const Comment = ({ comment }) => {
    <View>
        <View>
            <View>
                <View>
                    <Image source={{ uri: comment.avatar }} style={review_css.avatar} />
                </View>
            </View>
        </View>
    </View>;
};

const Review = () => {
    return (
        <View style={review_css.reviewContainer}>
            <RatingComponent rating={4.5} numReviews={1233} />;
        </View>
    );
};

const styles = StyleSheet.create({
    rating_row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#03bed3',
        width: '13%',
    },
    flex_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    font_bold: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    font_light: {
        color: '#ccc',
    },
    font_view_all: {
        color: '#03bed3',
        fontWeight: 'medium',
    },
    start_text: {
        fontSize: 12,
        color: '#03bed3',
    },
});

const review_css = StyleSheet.create({
    reviewContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    start_yellow: {
        color: 'yellow',
    },
});

export default Review;
