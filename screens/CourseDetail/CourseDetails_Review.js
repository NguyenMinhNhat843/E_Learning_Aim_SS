import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const reviews = [
  {
    id: '1',
    name: 'Jinny Oslin',
    avatar: require('../../assets/image/courseDetailsReview_img/Commentator1.png'),
    review: 'Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint labor... ',
    rating: 5,
    time: 'A day ago',
  },
  {
    id: '2',
    name: 'Jane Barry',
    avatar: require('../../assets/image/courseDetailsReview_img/Commentator2.png'),
    review: 'Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est',
    rating: 3,
    time: 'A day ago',
  },
  {
    id: '3',
    name: 'Claire Mignard',
    avatar: require('../../assets/image/courseDetailsReview_img/Commentator3.png'),
    review: 'Magna id sint irure in cillum esse nisi dolor laboris ullamco. Consecuter proident...',
    rating: 4,
    time: 'A day ago',
  },
  {
    id: '4',
    name: 'Mai Chien No',
    avatar: require('../../assets/image/courseDetailsReview_img/Commentator4.jpg'),
    review: 'Great course, reasonable tuition, everyone should take it!',
    rating: 4,
    time: 'A day ago',
  },
  {
    id: '5',
    name: 'Khac Truong',
    avatar: require('../../assets/image/courseDetailsReview_img/Commentator5.png'),
    review: 'The course was pretty bad, I could not follow it very well!!!',
    rating: 2,
    time: 'A day ago',
  },
];

const CourseDetailsWithReviews = () => {
  // Trạng thái bộ lọc hiện tại (All, 5★, 4★,...)
  const [selectedRating, setSelectedRating] = useState('ALL');

  // Hàm lọc các đánh giá dựa trên giá trị của selectedRating
  const filterReviews = () => {
    if (selectedRating === 'ALL') {
      return reviews; // Hiển thị tất cả các đánh giá
    } else {
      return reviews.filter(review => review.rating === selectedRating);
    }
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView style={styles.subContainer}> */}
        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.ratingText}>⭐4.5/5</Text>
          <Text style={styles.reviewCount}>(1233+ reviews)</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Reviews by Stars */}
        <View horizontal style={styles.filterSection}>
          <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating('ALL')}>
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(5)}>
            <Text style={styles.filterText}>5 ★</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(4)}>
            <Text style={styles.filterText}>4 ★</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(3)}>
            <Text style={styles.filterText}>3 ★</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(2)}>
            <Text style={styles.filterText}>2 ★</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton} onPress={() => setSelectedRating(1)}>
            <Text style={styles.filterText}>1 ★</Text>
          </TouchableOpacity>
        </View>

        {/* Reviews Section */}
        <FlatList
        //   style={{height: 400}}
          data={filterReviews()} // Lọc các đánh giá
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Image style={styles.avatar} source={item.avatar} />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewerName}>{item.name}</Text>
                <Text style={styles.reviewText}>{item.review}</Text>
                <Text style={styles.ratingStars}>{'★'.repeat(item.rating)}</Text>
                <Text style={styles.reviewTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      {/* </ScrollView> */}
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
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  reviewCount: {
    color: 'gray',
  },
  viewAllButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 5,
    marginRight:15,
  },
  viewAllText: {
    color: '#fff',
    fontSize: 14,
  },
  filterSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  filterText: {
    fontSize: 14,
  },
  reviewCard: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    color: 'gray',
    marginBottom: 5,
  },
  ratingStars: {
    color: '#FFD700', // Gold color for stars
    marginBottom: 5,
  },
  reviewTime: {
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    // marginTop: 20,
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
  discount: {
    color: '#79828b',
    fontSize: 14,
    marginLeft: 10,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CourseDetailsWithReviews;
