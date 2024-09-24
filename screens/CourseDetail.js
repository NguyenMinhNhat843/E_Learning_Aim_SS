import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like star or play button

import CourseDetail_Lesson from './CourseDetail/Lesson';
import CourseDetail_Overview from './CourseDetail/Overview';
import Review from './CourseDetail/Review';
const UXDesignCourse = () => {
    const [currentTab, setCurrentTab] = useState('REVIEW');

    const handleChangeTab = (tab) => {
        setCurrentTab(tab);
    };
    return (
        <View style={styles.container}>
            <ScrollView style={styles.lessonContainer}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Ionicons name="menu-outline" size={24} color="black" />
                    <Text style={styles.headerText}>Course details</Text>
                    <Ionicons name="ellipsis-vertical" size={24} color="black" />
                </View>

                {/* Course Image Section */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{
                            uri: 'https://example.com/course-image.png',
                        }}
                        style={styles.courseImage}
                    />
                    <Pressable style={styles.playButton}>
                        <Ionicons name="play-circle-outline" size={64} color="white" />
                    </Pressable>
                </View>

                {/* Course Info Section */}
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>UX Foundation: Introduction to UX Design</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="gold" />
                        <Text style={styles.ratingText}>4.5 (1233) • 12 lessons</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabs}>
                    <Pressable onPress={() => handleChangeTab('OVERVIEW')}>
                        <Text style={[styles.tabText, currentTab === 'OVERVIEW' && styles.activeTab]}>OVERVIEW</Text>
                    </Pressable>
                    <Pressable onPress={() => handleChangeTab('LESSONS')}>
                        <Text style={[styles.tabText, currentTab === 'LESSONS' && styles.activeTab]}>LESSONS</Text>
                    </Pressable>
                    <Pressable onPress={() => handleChangeTab('REVIEW')}>
                        <Text style={[styles.tabText, currentTab === 'REVIEW' && styles.activeTab]}>REVIEW</Text>
                    </Pressable>
                </View>

                {/* Lesson List */}
                {currentTab === 'OVERVIEW' ? (
                    <CourseDetail_Overview />
                ) : currentTab === 'LESSONS' ? (
                    <CourseDetail_Lesson />
                ) : currentTab === 'REVIEW' ? (
                    <Review />
                ) : null}

                {/* Pricing Section */}
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>$259</Text>
                    <Text style={styles.discountText}>
                        80% Disc. <Text style={styles.originalPrice}>$1020</Text>
                    </Text>
                    <Pressable style={styles.cartButton}>
                        <Text style={styles.cartButtonText}>Add to cart</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#a060f6',
        paddingVertical: 30,
    },
    courseImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    playButton: {
        position: 'absolute',
        top: '40%',
        left: '40%',
    },
    infoContainer: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        marginLeft: 4,
    },

    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
    },
    activeTab: {
        color: '#00C4CC',
        fontWeight: 'bold',
        borderBottomWidth: 2,
        borderBottomColor: '#00C4CC',
    },
    lessonContainer: {
        flex: 1,
    },
    priceContainer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    discountText: {
        fontSize: 14,
        color: '#888',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
    },
    cartButton: {
        backgroundColor: '#00C4CC',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    cartButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default UXDesignCourse;
