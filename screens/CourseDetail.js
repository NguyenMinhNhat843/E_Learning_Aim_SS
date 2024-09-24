import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For icons like star or play button


const UXDesignCourse = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.lessonContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="menu-outline" size={24} color="black" />
        <Text style={styles.headerText}>Course details</Text>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </View>

      {/* Course Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: 'https://example.com/course-image.png' }} // Use your course image URI
          style={styles.courseImage}
        />
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play-circle-outline" size={64} color="white" />
        </TouchableOpacity>
      </View>

      {/* Course Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>UX Foundation: Introduction to UX Design</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="gold" />
          <Text style={styles.ratingText}>4.5 (1233) • 12 lessons</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={styles.tabText}>OVERVIEW</Text>
        <Text style={[styles.tabText, styles.activeTab]}>LESSONS</Text>
        <Text style={styles.tabText}>REVIEW</Text>
      </View>

      {/* Lesson List */}
      <View style={styles.lessionList}>
        <TouchableOpacity onPress={() => toggleSection(1)} style={styles.sectionHeader}>
          <Text style={styles.sectionText}>I - Introduction</Text>
          <Ionicons name={expandedSection === 1 ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>

        {expandedSection === 1 && (
          <>
            <LessonItem number="01" title="Amet adipisicing consectetur" duration="01:23 mins" completed />
            <LessonItem number="02" title="Adipisicing dolor amet occaec" duration="01:23 mins" playing />
          </>
        )}

        <TouchableOpacity onPress={() => toggleSection(2)} style={styles.sectionHeader}>
          <Text style={styles.sectionText}>III - Plan for your UX Research</Text>
          <Ionicons name={expandedSection === 2 ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>

        {expandedSection === 2 && (
          <>
            <LessonItem number="03" title="Exercitation elit incididunt esse" duration="01:23 mins" locked />
            <LessonItem number="04" title="Duis esse ipsum laboris" duration="01:23 mins" locked />
            <LessonItem number="05" title="Labore minim reprehenderit pariatur ea deserunt" duration="01:23 mins" locked />
          </>
        )}

        <TouchableOpacity onPress={() => toggleSection(3)} style={styles.sectionHeader}>
          <Text style={styles.sectionText}>III - Conduct UX research</Text>
          <Ionicons name={expandedSection === 3 ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleSection(4)} style={styles.sectionHeader}>
          <Text style={styles.sectionText}>IV - Articulate findings</Text>
          <Ionicons name={expandedSection === 4 ? 'chevron-up' : 'chevron-down'} size={18} />
        </TouchableOpacity>
      </View>

      {/* Pricing Section */}
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>$259</Text>
        <Text style={styles.discountText}>80% Disc. <Text style={styles.originalPrice}>$1020</Text></Text>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.cartButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
       </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a060f6',
    paddingVertical: 30,
  },
  courseImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },

  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    color: '#00C4CC',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#00C4CC',
  },
  lessonContainer: {
    flex: 1,
    // paddingHorizontal: 16,
  },
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
  priceContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 14,
    color: '#888',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  cartButton: {
    backgroundColor: '#00C4CC',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UXDesignCourse;
