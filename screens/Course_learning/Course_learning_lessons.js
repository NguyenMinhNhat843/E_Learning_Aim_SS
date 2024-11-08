import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { Icon } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleUp, faAngleDown, faCheck, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const data_lessons = [
    {
        title: 'I - Introduction',
        lessons: [
            { id: '01', name: 'Amet adipisicing consectetur', duration: '01:23 mins', isCompleted: true },
            { id: '02', name: 'Culpa est incididunt enim id adi', duration: '01:23 mins', isPlaying: true },
        ],
    },
    {
        title: 'III - Plan for your UX Research',
        lessons: [
            { id: '03', name: 'Exercitation elit incididunt esse', duration: '01:23 mins' },
            { id: '04', name: 'Duis esse ipsum laboru', duration: '01:23 mins' },
            { id: '05', name: 'Labore minim reprehenderit pariatur', duration: '01:23 mins' },
        ],
    },
    {
        title: 'III - Conduct UX research',
        lessons: [
            { id: '06', name: 'Exercitation elit incididunt esse', duration: '01:23 mins' },
            { id: '07', name: 'Duis esse ipsum laboru', duration: '01:23 mins' },
            { id: '08', name: 'Labore minim reprehenderit pariatur', duration: '01:23 mins' },
        ],
    },
    {
        title: 'IV - Articulate findings',
        lessons: [
            { id: '09', name: 'Exercitation elit incididunt esse', duration: '01:23 mins' },
            { id: '10', name: 'Duis esse ipsum laboru', duration: '01:23 mins' },
            { id: '11', name: 'Labore minim reprehenderit pariatur', duration: '01:23 mins' },
        ],
    },
];

const Lesson_Detail = ({ lessons_detail, expanded }) => {
    return (
        <View>
            {expanded && (
                <View style={styles.lessons_detail_item}>
                    <Text style={{ fontSize: 18 }}>{lessons_detail.id}</Text>
                    <View style={{ flex: 1, paddingLeft: 16 }}>
                        <Text style={{ fontSize: 18 }}>{lessons_detail.name}</Text>
                        <Text style={{ fontSize: 18 }}>{lessons_detail.duration}</Text>
                    </View>
                    {lessons_detail.isCompleted && <FontAwesomeIcon style={{ color: 'blue' }} icon={faCheck} />}
                    {lessons_detail.isPlaying && <FontAwesomeIcon style={{ color: 'blue' }} icon={faCirclePlay} />}
                </View>
            )}
        </View>
    );
};

const TitleItem = ({ item }) => {
    const { title, lessons } = item;
    const [expanded, setExpanded] = useState(false);
    const handleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={styles.lessons_container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={[styles.lessonId, { fontWeight: 'bold', fontSize: 18, flex: 1 }]}>{title}</Text>
                <TouchableOpacity onPress={handleExpand}>
                    {expanded ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
                </TouchableOpacity>
            </View>

            <View style={styles.lessons_detail}>
                <FlatList
                    data={lessons}
                    renderItem={({ item }) => <Lesson_Detail lessons_detail={item} expanded={expanded} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

const Lesson_Tab = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View>
            <FlatList data={data_lessons} renderItem={({ item }) => <TitleItem item={item} />} keyExtractor={(item) => item.title} />
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
