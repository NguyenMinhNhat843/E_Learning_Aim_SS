import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Hàm xóa item khỏi giỏ hàng
    const removeItem = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };

    // Hàm thêm item vào giỏ hàng
    const addToCart = (course) => {
        // Kiểm tra khóa học đã tồn tại chưa
        const existingItem = cartItems.find((item) => item.id === course.id);
        if (existingItem) {
            // Nếu đã tồn tại, hiển thị thông báo
            Alert.alert('Thông báo', 'Khóa học này đã có trong giỏ hàng!');
        } else {
            // Nếu chưa tồn tại, thêm vào giỏ hàng
            setCartItems((prevItems) => [...prevItems, { ...course }]);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, removeItem, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
