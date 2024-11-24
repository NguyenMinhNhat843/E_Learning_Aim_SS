import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; // To use lock and play icons
import { Ionicons } from '@expo/vector-icons';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Đường dẫn đúng tới file firebaseConfig.js
import { useRoute } from '@react-navigation/native';

const CourseDetailsWithLessons = ({ course }) => {
    console.log('lessonGroups:', JSON.stringify(course.lessonGroup, null, 4));
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleExpand = (sectionId) => {
        setExpandedSection(sectionId === expandedSection ? null : sectionId);
    };

    const renderLessonItem = ({ item }) => (
        <View style={styles.lessonItem}>
            <Text style={styles.lessonTitle}>{item.title}</Text>
            <Text style={styles.lessonDuration}>{item.time}</Text>
            {item.state ? <FontAwesome name="lock" size={20} color="gray" /> : <FontAwesome name="play-circle" size={20} color="#007BFF" />}
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.subContainer}>
                {/* Lesson Groups */}
                <FlatList data={course.lessonGroup} />
                {course.lessonGroup.map((group) => (
                    <View key={group.lessonGroup_id}>
                        <TouchableOpacity onPress={() => toggleExpand(group.lessonGroup_id)} style={styles.lessonGroupHeader}>
                            <Text style={styles.lessonGroupTitle}>{group.lessonGroup_title}</Text>
                            <FontAwesome name={expandedSection === group.id ? 'chevron-down' : 'chevron-up'} size={16} color="gray" />
                        </TouchableOpacity>
                        {expandedSection === group.lessonGroup_id && group.lessonList.length > 0 && (
                            <FlatList
                                data={group.lessonList}
                                renderItem={renderLessonItem}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.lessonList}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },

    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
        marginLeft: -10,
        marginRight: -10,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconButton: {
        padding: 5,
    },

    subContainer: {
        flex: 1,
        // padding: 10,
        backgroundColor: '#fff',
    },

    header: {
        alignItems: 'center',
        marginBottom: 20,
    },

    video: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subText: {
        fontSize: 24,
        color: 'gray',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    tab: {
        paddingBottom: 10,
    },
    tabText: {
        fontSize: 16,
        color: 'gray',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#007BFF',
    },
    activeTabText: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    lessonGroupHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    lessonGroupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lessonList: {
        paddingVertical: 10,
    },
    lessonItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    lessonTitle: {
        fontSize: 14,
    },
    lessonDuration: {
        fontSize: 12,
        color: 'gray',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
        // marginTop: 20,
        marginRight: -20,
        marginLeft: -20,
        marginBottom: -10,
        padding: 20,
        borderColor: '#9bc1e0',
        borderTopWidth: 1,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    discount: {
        color: '#79828b',
        fontSize: 14,
        marginLeft: 10,
    },

    addToCartButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 15,
        marginRight: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CourseDetailsWithLessons;
