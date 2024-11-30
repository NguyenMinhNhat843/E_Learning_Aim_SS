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

    // Hàm để cập nhật course_learning khi có khóa học mới
    const addCourseToLearning = async (newCourse) => {
        if (user) {
            // Kiểm tra xem khóa học đã tồn tại trong course_learning hay chưa
            const courseExists = user.course_learning.some(course => course.courseID === newCourse.courseID);
    
            if (!courseExists) {
                // Nếu khóa học chưa tồn tại, thêm khóa học vào danh sách
                const updatedUser = {
                    ...user,
                    course_learning: [...user.course_learning, newCourse] // Thêm khóa học mới vào course_learning
                };
    
                try {
                    // Cập nhật lại dữ liệu trong Firebase
                    const userRef = ref(database, `Users/${user.id}`);
                    await update(userRef, {
                        course_learning: updatedUser.course_learning
                    });
    
                    // Cập nhật lại user trong state và AsyncStorage
                    setUser(updatedUser);
                    await AsyncStorage.setItem('user', JSON.stringify(updatedUser)); // Lưu lại vào AsyncStorage
    
                    // Hiển thị thông báo thành công
                    Alert.alert('Thông báo', 'Khóa học đã được thêm vào danh sách học!');
                } catch (error) {
                    console.error('Error updating course in Firebase:', error);
                    Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình cập nhật khóa học.');
                }
            } else {
                // Nếu khóa học đã có, thông báo cho người dùng
                Alert.alert('Thông báo', 'Khóa học này đã có trong danh sách học!');
            }
        } else {
            Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng!');
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser: saveUser, addCourseToLearning }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider; // Đảm bảo export default đúng cách
