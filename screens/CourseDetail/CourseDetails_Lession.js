import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // To use lock and play icons

const CourseDetailsWithLessons = ({ course }) => {
    console.log('lessonGroups:', JSON.stringify(course.lessonGroup, null, 4));
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleExpand = (sectionId) => {
        setExpandedSection(sectionId === expandedSection ? null : sectionId);
    };

    const renderLessonItem = ({ item }) => (
        <View style={styles.lessonItem}>
            <View style={styles.lessonItemView}>
                <Text style={styles.lessonTitle}>{item.lesson_name}</Text>
                <Text style={styles.lessonDuration}>{item.time}</Text>
            </View>
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
    lessonItemView:{
        flexDirection: 'row',justifyContent:'space-between', width:'95%'
    },
    lessonTitle: {
        fontSize: 16,
        fontweight: 'bold',
    },
    lessonDuration: {
        fontSize: 12,
        color: 'gray',
    },
});

export default CourseDetailsWithLessons;
