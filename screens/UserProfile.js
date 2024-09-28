
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

const coursesData = [
  { id: '1', title: 'Product Design', author: 'Dennis Sweeney', price: '$190', rating: '4.5', lessons: '12 lessons', image: require('../assets/image/userProfile_img/ProductDesign.jpg') 
  },
  { id: '2', title: 'Website Design', author: 'Ramono Wultschner', price: '$59', rating: '4.5', lessons: '12 lessons', image: require('../assets/image/userProfile_img/WebsiteDesign.jpg') 
  },
  { id: '3', title: 'Mobile UI Design', author: 'Ramono Wultschner', price: '$320', rating: '4.5', lessons: '12 lessons', image: require('../assets/image/userProfile_img/MobileUI_Design.jpg') 
  },
  { id: '4', title: 'Digital Portrait', author: 'Ramono Wultschner', price: '$67', rating: '4.5', lessons: '12 lessons', image: require('../assets/image/userProfile_img/digital_Portrait.jpg') 
  }
];

const UserProfile = () => {
  const [displayedCourses, setDisplayedCourses] = useState(coursesData.slice(0, 1000));

  const loadMoreCourses = () => {
    setDisplayedCourses(coursesData);
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Image source={item.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseAuthor}>{item.author}</Text>
        <Text style={styles.coursePrice}>{item.price}</Text>
        <View style={styles.courseMeta}>
          <Text style={styles.courseRating}>⭐ {item.rating} ({item.lessons})</Text>
        </View>
      </View>
      <FontAwesome name="bookmark-o" size={24} color="gray" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
      <Image 
        source = {require('../assets/image/userProfile_img/background_profile.png')}
        style={styles.backgroundImage}
      />
        <Image
          source={require('../assets/image/userProfile_img/Face_profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Mai Chiến Nô</Text>
        <Text style={styles.profileRole}>UX/UI Designer</Text>

        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Save</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>On Going</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>
      </View>

      {/* Saved Courses List */}
      <Text style={styles.savedCoursesTitle}>Saved courses</Text>

      <ScrollView>
         <FlatList
          data={displayedCourses}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 50
  },
  backgroundImage: {
    height: 130,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    position: 'absolute',
    top: 85
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 70
  },
  profileRole: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    marginLeft: 30
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  savedCoursesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseAuthor: {
    fontSize: 14,
    color: 'gray',
  },
  coursePrice: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 5,
  },
  courseMeta: {
    marginTop: 5,
  },
  courseRating: {
    fontSize: 14,
    color: 'gray',
  },
});

export default UserProfile;
