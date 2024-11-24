import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartScreen = ({ route }) => {
    // lấy item giỏ hàng từ context
    const { cartItems } = useContext(CartContext);
    console.log(cartItems);

    // navigation
    const navigation = useNavigation();

    // tính tổng tiền
    const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);

    // xử lý thanh toán
    const handleCheckout = () => {
        Alert.alert('Thanh toán', 'Bạn đã tiến hành thanh toán thành công!');
    };

    // render item
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Image source={{ uri: item.image.url }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon style={{ paddingLeft: 8 }} size={30} icon={faChevronLeft} />
                </TouchableOpacity>
                <Text style={styles.title}>Cart List Product</Text>
            </View>
            <FlatList data={cartItems} keyExtractor={(item) => item.id} renderItem={renderItem} contentContainerStyle={styles.list} />
            <View style={styles.footer}>
                <Text style={styles.total}>Tổng tiền: ${getTotalPrice().toFixed(2)}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        paddingTop: 24,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 30,
    },
    list: {
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    details: {
        marginLeft: 10,
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    quantity: {
        fontSize: 14,
        color: '#555',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    checkoutButton: {
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CartScreen;
