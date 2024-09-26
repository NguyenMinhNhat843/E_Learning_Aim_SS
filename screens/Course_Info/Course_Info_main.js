import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faEllipsisVertical, faShareNodes, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faBookmark, faHeart } from '@fortawesome/free-regular-svg-icons';

import Course_info_QA from './Course_info_QA';

const Course_Info_main = () => {
    const [tabSelected, setTabSelected] = useState('Q&A');
    const handleTabSelected = (tab) => {
        setTabSelected(tab);
    };

    const [likeCourseSelected, setLikeCourseSelected] = useState(false);
    const handleLikeCourse = () => {
        setLikeCourseSelected(!likeCourseSelected);
    };

    return (
        <ScrollView>
            <View style={StyleSheet.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </View>
                    <Text style={styles.course_name}>UX Foundation</Text>
                    <View style={styles.header_right}>
                        <FontAwesomeIcon style={styles.header_icon} icon={faBookmark} />
                        <FontAwesomeIcon style={styles.header_icon} icon={faEllipsisVertical} />
                    </View>
                </View>

                {/* banner */}
                <View>
                    <View>
                        <Image source={require('../../assets/image/course_info/banner.jpg')} style={{ width: '100%', height: 200 }} />
                    </View>
                    <Text style={styles.banner_text}>UX Foundation: Introdute to user Experiance design</Text>
                    <View style={styles.course_like_share}>
                        <View style={styles.course_like}>
                            <TouchableOpacity onPress={() => handleLikeCourse()}>
                                {likeCourseSelected ? (
                                    <FontAwesomeIcon style={{ color: 'red' }} icon={solidHeart} />
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} />
                                )}
                            </TouchableOpacity>
                            <Text style={{ paddingLeft: 12, fontSize: 18 }}>231 Likes</Text>
                        </View>
                        <View style={styles.course_share}>
                            <Pressable>
                                <FontAwesomeIcon icon={faShareNodes} />
                            </Pressable>
                            <Text style={{ paddingLeft: 12, fontSize: 18 }}>16 share</Text>
                        </View>
                    </View>
                </View>

                {/* Tab */}
                <View style={styles.tab}>
                    <Pressable style={styles.tab_header_text_wrap} onPress={() => handleTabSelected('LESSONS')}>
                        <Text style={[styles.tab_header_text, tabSelected === 'LESSONS' && styles.tab_active]}>LESSONS</Text>
                    </Pressable>
                    <Pressable style={styles.tab_header_text_wrap} onPress={() => handleTabSelected('PROJECT')}>
                        <Text style={[styles.tab_header_text, tabSelected === 'PROJECT' && styles.tab_active]}>PROJECT</Text>
                    </Pressable>
                    <Pressable style={styles.tab_header_text_wrap} onPress={() => handleTabSelected('Q&A')}>
                        <Text style={[styles.tab_header_text, tabSelected === 'Q&A' && styles.tab_active]}>Q&A</Text>
                    </Pressable>
                </View>

                {/* Tab Q&A */}
                <Course_info_QA />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // container
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Header
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    header_right: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header_icon: {
        width: 24,
        height: 24,
        paddingLeft: 16,
    },
    course_name: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    // banner
    banner_text: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
    },
    course_like_share: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
    },
    course_like: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 24,
    },
    course_share: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    // tab
    tab: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 32,
    },
    tab_header_text_wrap: {
        flex: 1,
    },
    tab_header_text: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 16,
        borderBottomWidth: 4,
        borderBottomColor: '#ccc',
        textAlign: 'center',
    },
    tab_active: {
        color: 'cyan',
        borderBottomWidth: 4,
        borderBottomColor: 'cyan',
    },
});

export default Course_Info_main;
