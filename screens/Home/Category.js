import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Category = () => {
    const navigation = useNavigation();
    const handleCategory = (name_category) => {
        navigation.navigate('Search', { nameCategory: name_category });
    };

    return (
        <View style={styles.category_container}>
            <View style={styles.category_header}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#007BFF' }}>View more</Text>
                </TouchableOpacity>
            </View>
            {/* Hiển thị danh mục dưới dạng lưới */}
            {/* <View style={styles.grid}>
                {data_category.map((category) => (
                    <TouchableOpacity key={category.id} style={[styles.categoryItem]} onPress={() => handleCategory(category.name)}>
                        <Text style={styles.icon}>{category.icon}</Text>
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View> */}
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
