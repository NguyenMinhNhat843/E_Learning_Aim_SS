// components/ProgressBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.filled, { flex: progress }]} />
      <View style={[styles.unfilled, { flex: 1 - progress }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  filled: {
    backgroundColor: '#52a9ff', // Màu của phần đã hoàn thành
  },
  unfilled: {
    backgroundColor: '#e0e0e0', // Màu của phần chưa hoàn thành
  },
});

export default ProgressBar;
