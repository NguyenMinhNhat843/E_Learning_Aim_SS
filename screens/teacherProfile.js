import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const uiUxCourses = [
  {
    id: '1',
    title: 'UX Foundation',
    price: '$51',
    teacher: 'Sara Weise',
    lessons: '12 lessons',
    rating: '⭐4.5 (1233)',
    image: require('../assets/image/teacherProfile_img/UX_Foundation.png'), // Replace with actual image
  },
  {
    id: '2',
    title: 'Mobile App Design',
    price: '$59',
    teacher: 'Sara Weise',
    lessons: '8 lessons',
    rating: '⭐4.5 (1233)',
    image: require('../assets/image/teacherProfile_img/MobileApp.png') // Replace with actual image
  },
];

const graphicCourses = [
  {
    id: '3',
    title: 'Digital Poster',
    price: '$51',
    teacher: 'Sara Weise',
    lessons: '10 lessons',
    rating: '⭐4.5 (1233)',
    image: require('../assets/image/teacherProfile_img/DigitalPoster.png'), // Replace with actual image
  },
  {
    id: '4',
    title: 'Patterns Design',
    price: '$59',
    teacher: 'Sara Weise',
    lessons: '6 lessons',
    rating: '⭐4.5 (1233)',
    image: require('../assets/image/teacherProfile_img/PatternsDesign.png'), // Replace with actual image
  },
];

const CourseCard = ({ course }) => (
  <View style={styles.courseCard}>
    <Image source={course.image} style={styles.courseImage} />
    <View style={styles.courseDetails}>
      <Text style={styles.courseTitle}>{course.title}</Text>
      <Text style={styles.courseTeacher}>{course.teacher}</Text>
      <Text style={styles.coursePrice}>{course.price}</Text>
      <View style={styles.courseRating}>
        <Text>{course.rating}</Text>
      </View>
      <Text>{course.lessons}</Text>
    </View>
  </View>
);

const TeacherProfile = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.headerBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teacher's profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
    </View>

    <ScrollView style={styles.subContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/image/teacherProfile_img/headerImage.png')} // Replace with the banner image URL
          style={styles.headerImage}
        />
      </View>

      {/* Teacher Info */}
      <View style={styles.teacherInfo}>
        <Image
          source={require('../assets/image/teacherProfile_img/Teacher.png')} // Replace with teacher profile image
          style={styles.teacherAvatar}
        />
        <Text style={styles.teacherName}>Sara Weise</Text>
        <TouchableOpacity style = {styles.positionName}><Text style = {styles.positionText}>Teacher</Text></TouchableOpacity>
        <Text style={styles.teacherTitle}>UI/UX Designer</Text>
        <Text style={styles.teacherLocation}>📍New York - 09:30 AM</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>OVERVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.activeTab}>
          <Text style={styles.activeTabText}>COURSES</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>REVIEW</Text>
        </TouchableOpacity>
      </View>

      {/* UI/UX Design Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>UI/UX Design</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={uiUxCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        contentContainerStyle={styles.courseList}
      />

      {/* Graphic Design Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Graphic Design</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={graphicCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        contentContainerStyle={styles.courseList}
      />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    padding: 10,
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

  subContainer:{
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 200,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  teacherInfo: {
    alignItems: 'center',
    marginTop: -50,
  },
  teacherAvatar: {
    width:110,
    height: 110,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  teacherName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },

  positionName: {
    backgroundColor: '#00bad4', 
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15
  },

  positionText:{
    color:'white',
    fontWeight: 700,

  },

  teacherTitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  teacherLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tab: {
    paddingBottom: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00cec9',
    paddingBottom: 10,
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeTabText: {
    fontSize: 16,
    color: '#00cec9',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    color: '#00cec9',
  },
  courseList: {
    paddingLeft: 20,
    paddingVertical: 10,
  },
  courseCard: {
    width: 190,
    marginRight: 15,
  },
  courseImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  courseDetails: {
    marginTop: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseTeacher: {
    fontSize: 14,
    color: '#777',
  },
  coursePrice: {
    fontSize: 16,
    color: '#00cec9',
    marginTop: 5,
  },
  courseRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});

export default TeacherProfile;

