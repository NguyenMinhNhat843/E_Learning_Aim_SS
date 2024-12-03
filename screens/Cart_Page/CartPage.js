import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../Login_Logout/UserContext';
import { ref, get, update } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Cập nhật đúng đường dẫn đến file firebaseConfig của bạn


const CartScreen = ({ route }) => {
    const { user, setUser } = useUser(); // Lấy thông tin người dùng từ context

    // lấy item giỏ hàng từ context
    const { cartItems, removeItem, setCartItems } = useContext(CartContext);
    // console.log(cartItems);

    // navigation
    const navigation = useNavigation();

    // tính tổng tiền
    const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price, 0);

    // xử lý thanh toán
    const handleCheckout = async () => {
        if (!user || !cartItems || cartItems.length === 0) {
            Alert.alert('Lỗi', 'Giỏ hàng trống hoặc không tìm thấy người dùng!');
            return;
        }

        try {
            // Lấy thông tin người dùng từ Firebase
            const userRef = ref(database, `Users/${user.id}`);
            const userSnapshot = await get(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();

                // Cập nhật course_learning của người dùng với các khóa học trong giỏ hàng
                const newCourses = cartItems.map(item => ({
                    courseID: String(parseInt(item.id) - 1),  // ID khóa học
                    image: item.image.url,  // URL ảnh
                    name: item.name,  // Tên khóa học
                    progress: 0,  // Mới thanh toán, bắt đầu từ 0
                    time: item.time || '0 mins'  // Thời gian khóa học
                }));

                // Cập nhật lại danh sách khóa học học của người dùng
                const updatedCourses = [...userData.course_learning, ...newCourses];

                // Cập nhật dữ liệu người dùng vào Firebase
                await update(userRef, {
                    course_learning: updatedCourses
                });

                // Cập nhật dữ liệu user trong UserContext (state của ứng dụng)
                const updatedUser = { ...userData, course_learning: updatedCourses };
                setUser(updatedUser);  // Cập nhật dữ liệu người dùng trong UserContext

                // Xóa các sản phẩm trong giỏ hàng
                setCartItems([]);  // Xóa giỏ hàng

                // Thông báo thanh toán thành công
                Alert.alert('Thanh toán thành công', 'Khóa học đã được thêm vào danh sách học của bạn!');
            } else {
                Alert.alert('Lỗi', 'Không tìm thấy người dùng!');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình thanh toán!');
            console.error(error);
        }
    };

    // Xử lý xóa item
    const handleRemoveItem = (itemId) => {
        // Cảnh báo trước khi xóa item
        Alert.alert(
            'Xóa sản phẩm',
            'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => removeItem(itemId) },  // Gọi hàm removeItem để xóa
            ]
        );
    };

    //render item
    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.image.url }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)} // Gọi hàm xóa
            >
                <FontAwesomeIcon icon={faTrashAlt} size={20} color="red" />
            </TouchableOpacity>
        </View>
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
    removeButton: {
        padding: 10,
    },

    //footer
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
