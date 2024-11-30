import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const icon_category = [
    { id: 1, name: 'Business', color: '#1abc9c', icon: '📊' },
    { id: 2, name: 'Design', color: '#9b59b6', icon: '✏️' },
    { id: 3, name: 'Code', color: '#e74c3c', icon: '💻' },
    { id: 4, name: 'Writing', color: '#3498db', icon: '📄' },
    { id: 5, name: 'Movie', color: '#8e44ad', icon: '🎬' },
    { id: 6, name: 'Language', color: '#e67e22', icon: '🌍' },
];
const Category = ({ navigation }) => {
    return (
        <View style={styles.category_container}>
            <View style={styles.category_header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#007BFF' }}>View more</Text>
                </TouchableOpacity>
            </View>
            {/* Hiển thị danh mục dưới dạng lưới */}
            <View style={styles.grid}>
                {icon_category.map((category) => (
                    <TouchableOpacity key={category.id} style={[styles.categoryItem]} 
                        onPress={() => navigation.navigate('Category Detail', {categoryName: category.name})}
                    >
                        <Text style={styles.icon}>{category.icon}</Text>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    category_container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    category_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    categoryItem: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        width: '47%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        fontSize: 30,
        marginBottom: 8,
        paddingRight: 8,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default Category;