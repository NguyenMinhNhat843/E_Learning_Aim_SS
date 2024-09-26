import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; // To use lock and play icons
import { Ionicons } from '@expo/vector-icons'; 

const lessonGroups = [
  {
    id: '1',
    title: 'I - Introduction',
    lessons: [
      { id: '1-1', title: 'Amet adipiscing consectetur', duration: '01:23 mins', locked: false },
      { id: '1-2', title: 'Adipisicing dolor amet occaeca', duration: '01:23 mins', locked: false }
    ]
  },
  {
    id: '2',
    title: 'II - Plan for your UX Research',
    lessons: [
      { id: '2-1', title: 'Exercitation elit incididunt esse', duration: '01:23 mins', locked: true },
      { id: '2-2', title: 'Duis esse ipsum labour', duration: '01:23 mins', locked: true },
      { id: '2-3', title: 'Labore minim reprehenderit pariatur ea deserunt', duration: '01:23 mins', locked: true }
    ]
  },
  { id: '3', title: 'III - Conduct UX research', lessons: [] },
  { id: '4', title: 'IV - Articulate findings', lessons: [] },
];

const CourseDetailsWithLessons = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleExpand = (sectionId) => {
    setExpandedSection(sectionId === expandedSection ? null : sectionId);
  };

  const renderLessonItem = ({ item }) => (
    <View style={styles.lessonItem}>
      <Text style={styles.lessonTitle}>{item.title}</Text>
      <Text style={styles.lessonDuration}>{item.duration}</Text>
      {item.locked ? (
        <FontAwesome name="lock" size={20} color="gray" />
      ) : (
        <FontAwesome name="play-circle" size={20} color="#007BFF" />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style = {styles.headerBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course details</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.subContainer}>
      {/* Header with video */}
      <View style={styles.header}>
        <Video
          source={require('../assets/video/WhatIsUXDesign.mp4')} // Đường dẫn tới video
          style={styles.video}
          useNativeControls={true}  //Tạo ra các điều khiển phát/dừng mặc định (phát video khi nhấn vào).
          controls={true}          // Hiển thị các điều khiển phát video như play/pause
          resizeMode="contain"     // Điều chỉnh video vừa với khung hình
          shouldPlay={false}       // Không rự động phát 
          // resizeMode="cover"    // Chế độ hiển thị video
          // paused={false}        // Tự động phát khi tải
        />
        <Text style={styles.title}>UX Foundation: Introduction to UX Design</Text>
        <Text style={styles.subText}>⭐4.5 (1233) • 12 lessons</Text>
      </View>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>OVERVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>LESSONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>REVIEW</Text>
        </TouchableOpacity>
      </View>

      {/* Lesson Groups */}
      {lessonGroups.map((group) => (
        <View key={group.id}>
          <TouchableOpacity
            onPress={() => toggleExpand(group.id)}
            style={styles.lessonGroupHeader}
          >
            <Text style={styles.lessonGroupTitle}>{group.title}</Text>
            <FontAwesome
              name={expandedSection === group.id ? 'chevron-up' : 'chevron-down'}
              size={16}
              color="gray"
            />
          </TouchableOpacity>
          {expandedSection === group.id && group.lessons.length > 0 && (
            <FlatList
              data={group.lessons}
              renderItem={renderLessonItem}
              keyExtractor={(item) => item.id}
              style={styles.lessonList}
            />
          )}
        </View>
      ))}
      </ScrollView>

      {/* Footer with price and add to cart button */}
      <View style={styles.footer}>
        <Text style={styles.price}>$259 {'\n'} 
          <Text style={styles.discount}> 80% Disc 1020$</Text></Text>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>🛒Add to cart</Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
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

  discount:{
    color: '#79828b',
    fontSize: 14,
    marginLeft: 10,
  },

  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 15,
    marginRight: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CourseDetailsWithLessons;
