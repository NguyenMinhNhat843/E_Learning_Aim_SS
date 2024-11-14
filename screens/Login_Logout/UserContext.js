import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tạo Context
const UserContext = createContext();

// Hook để sử dụng context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider để cung cấp thông tin người dùng toàn ứng dụng
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Lấy thông tin người dùng từ AsyncStorage khi ứng dụng khởi động
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Chuyển từ chuỗi JSON sang đối tượng
      }
    };

    fetchUser();
  }, []);

  // Lưu thông tin người dùng vào AsyncStorage và state
  const saveUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData)); // Lưu vào AsyncStorage
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; // Đảm bảo export default đúng cách
