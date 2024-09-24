import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like star or play button

const CourseDetail_Overview = () => {
    const yourImage = require('../../assets/image/CourseDetail_img/abc.jpg');
    return (
        <View style={styles.container}>
            <Image source={yourImage} style={styles.profileImage} />
            <Text style={styles.name}>Sara Weise</Text>
            <Text style={styles.title}>UI/UX Designer</Text>
            <Text style={styles.description}>
                Convallis in semper laoreet nibh leo. iaculis tincidunt tortor, risus, scelerisque   risus...
                <Text style={styles.seeMore}>See more</Text>
            </Text>
            <View style={styles.benefitsContainer}>
                <View style={styles.benefitItem}>
                    <Image source={yourImage} style={styles.benefitIcon} />
                    <Text style={styles.benefitText}>14 hours on-demand video</Text>
                </View>
                <View style={styles.benefitItem}>
                    <Image source={yourImage} style={styles.benefitIcon} />
                    <Text style={styles.benefitText}>Native teacher</Text>
                </View>
                <View style={styles.benefitItem}>
                    <Image source={yourImage} style={styles.benefitIcon} />
                    <Text style={styles.benefitText}>100% free document</Text>
                </View>
                <View style={styles.benefitItem}>
                    <Image source={yourImage} style={styles.benefitIcon} />
                    <Text style={styles.benefitText}>Full lifetime access</Text>
                </View>
                <View style={styles.benefitItem}>
                    <Image source={yourImage} style={styles.benefitIcon} />
                    <Text style={styles.benefitText}>Certificate of complete</Text>
                </View>
                <View style={styles.benefitItem}>
                    <Image source={yourImage} style={styles.benefitIcon} />
                    <Text style={styles.benefitText}>24/7 support</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        marginBottom: 16,
    },
    seeMore: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    benefitsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    benefitItem: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
    },
    benefitIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    benefitText: {
        fontSize: 12,
    },
});

export default CourseDetail_Overview;
