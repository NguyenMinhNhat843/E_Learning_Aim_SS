import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
// import Video from 'react-native-video';
import { Ionicons } from '@expo/vector-icons'; 

const CourseDetails = () => {
  return (
    
    <View style = {styles.container}>
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
        <TouchableOpacity style={[styles.tab,styles.activeTab]}>
          <Text style={[styles.tabText,styles.activeTabText]}>OVERVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>LESSONS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>REVIEW</Text>
        </TouchableOpacity>
      </View>

      {/* Teacher info */}
      <View style={styles.teacherContainer}>
        <Image
          style={styles.teacherImage}
          source={require('../assets/image/courseDetailsOverView_img/TeacherAvatar.png')} // Replace with the real image URL
        />
        <Text style={styles.teacherName}>Sara Weise</Text>
        <Text style={styles.teacherRole}>UX Designer</Text>
        <TouchableOpacity style={styles.teacherFollow}><Text style={styles.teacherFollowText}>Follow</Text></TouchableOpacity>
      </View>

      {/* Course description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>aa
          Convallis in semper laoreet nibh lio. Vivamus malesuada ipsum pulvinar non
          rutrum risus dui, risus. Purus massa vel facilisis.
        </Text>
      </View>

      {/* Benefits section */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitText}>📹14 hours on-demand video</Text>
        <Text style={styles.benefitText}>🌐Native teacher</Text>
        <Text style={styles.benefitText}>📝100% free document</Text>
        <Text style={styles.benefitText}>⏰Full lifetime access</Text>
        <Text style={styles.benefitText}>✅Certificate of completion</Text>
        <Text style={styles.benefitText}>✔️24/7 support</Text>
      </View>

      {/* Similar courses */}
      <Text style={styles.similarCoursesTitle}>Similar Courses</Text>
      <ScrollView horizontal style={styles.similarCoursesContainer}>
        <View style={styles.courseCard}>
          <Image
            style={styles.courseImage}
            source={require('../assets/image/courseDetailsOverView_img/ProductDesign.jpg')} // Replace with the real image URL
          />
          <Text style={styles.courseTitle}>Product Design</Text>
          <Text style={styles.courseTeacher}>Dennis Vareey</Text>
          <Text style={styles.coursePrice}>$90</Text>
        </View>
        <View style={styles.courseCard}>
          <Image
            style={styles.courseImage}
            source={require('../assets/image/courseDetailsOverView_img/PalettersYourApp.png')} // Replace with the real image URL
          />
          <Text style={styles.courseTitle}>Palettes for Your App</Text>
          <Text style={styles.courseTeacher}>Ramona Wuschler</Text>
          <Text style={styles.coursePrice}>$59</Text>
        </View>
        <View style={styles.courseCard}>
          <Image
            style={styles.courseImage}
            source={require('../assets/image/courseDetailsOverView_img/MobileUI_Design.jpg')} // Replace with the real image URL
          />
          <Text style={styles.courseTitle}>Mobile UI Design</Text>
          <Text style={styles.courseTeacher}>Ramona Wuschler</Text>
          <Text style={styles.coursePrice}>$32</Text>
        </View> 
      </ScrollView>
    </ScrollView>

     {/* Price and button */}
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

  teacherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  teacherImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  teacherName: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  teacherRole: {
    marginLeft: 10,
    color: 'gray',
  },

  teacherFollow: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 5,
    marginLeft: 30,
  },

  teacherFollowText: {
     color: '#fff',
    fontSize: 14,
  },

  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionText: {
    marginTop: 5,
    color: 'gray',
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitText: {
    marginBottom: 5,
    color: 'black',
  },
  similarCoursesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  similarCoursesContainer: {
    flexDirection: 'row',
  },
  courseCard: {
    width: 150,
    marginRight: 10,
  },
  courseImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  courseTeacher: {
    fontSize: 14,
    color: 'gray',
  },
  coursePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
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

export default CourseDetails;
