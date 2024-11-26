import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // To use lock and play icons

const Lesson_Tab = ({ course }) => {
    console.log('=====================================:' + JSON.stringify(course, null, 4));

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
    lessons_container: {
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#fff',
    },
    lessons_detail: {
        flexDirection: 'column',
    },
    lessons_detail_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 24,
        fontSize: 18,
    },
});

export default Lesson_Tab;
