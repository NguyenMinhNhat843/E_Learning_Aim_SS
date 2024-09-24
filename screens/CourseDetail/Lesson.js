import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like star or play button

const CourseDetail_Lesson = () => {
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <View style={styles.lessionList}>
            <Pressable onPress={() => toggleSection(1)} style={styles.sectionHeader}>
                <Text style={styles.sectionText}>I - Introduction</Text>
                <Ionicons name={expandedSection === 1 ? 'chevron-up' : 'chevron-down'} size={18} />
            </Pressable>

            {expandedSection === 1 && (
                <>
                    <LessonItem number="01" title="Amet adipisicing consectetur" duration="01:23 mins" completed />
                    <LessonItem number="02" title="Adipisicing dolor amet occaec" duration="01:23 mins" playing />
                </>
            )}

            <Pressable onPress={() => toggleSection(2)} style={styles.sectionHeader}>
                <Text style={styles.sectionText}>III - Plan for your UX Research</Text>
                <Ionicons name={expandedSection === 2 ? 'chevron-up' : 'chevron-down'} size={18} />
            </Pressable>

            {expandedSection === 2 && (
                <>
                    <LessonItem number="03" title="Exercitation elit incididunt esse" duration="01:23 mins" locked />
                    <LessonItem number="04" title="Duis esse ipsum laboris" duration="01:23 mins" locked />
                    <LessonItem number="05" title="Labore minim reprehenderit pariatur ea deserunt" duration="01:23 mins" locked />
                </>
            )}

            <Pressable onPress={() => toggleSection(3)} style={styles.sectionHeader}>
                <Text style={styles.sectionText}>III - Conduct UX research</Text>
                <Ionicons name={expandedSection === 3 ? 'chevron-up' : 'chevron-down'} size={18} />
            </Pressable>

            <Pressable onPress={() => toggleSection(4)} style={styles.sectionHeader}>
                <Text style={styles.sectionText}>IV - Articulate findings</Text>
                <Ionicons name={expandedSection === 4 ? 'chevron-up' : 'chevron-down'} size={18} />
            </Pressable>
        </View>
    );
};

const LessonItem = ({ number, title, duration, completed, playing, locked }) => {
    return (
        <View style={styles.lessonItem}>
            <Text style={styles.lessonNumber}>{number}</Text>
            <View style={styles.lessonDetails}>
                <Text style={styles.lessonTitle}>{title}</Text>
                <Text style={styles.lessonDuration}>{duration}</Text>
            </View>
            {completed ? (
                <Ionicons name="checkmark-circle-outline" size={20} color="green" />
            ) : playing ? (
                <Ionicons name="play-outline" size={20} color="blue" />
            ) : locked ? (
                <Ionicons name="lock-closed-outline" size={20} color="gray" />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    lessionList: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    lessonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    lessonNumber: {
        fontSize: 16,
        color: '#888',
        marginRight: 8,
    },
    lessonDetails: {
        flex: 1,
    },
    lessonTitle: {
        fontSize: 16,
        color: '#333',
    },
    lessonDuration: {
        fontSize: 12,
        color: '#888',
    },
});

export default CourseDetail_Lesson;
