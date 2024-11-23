import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Đường dẫn đúng tới file firebaseConfig.js
import { useRoute } from '@react-navigation/native';

const Data_Course = () => {
    const [Data_Course, setData_Course] = useState([]); // Quản lý state cho dữ liệu

    // Hàm fetch data từ Firebase
    const fetchData_Course = async () => {
        try {
            const courseRef = ref(database, `Courses`);
            const snapshot = await get(courseRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Firebase trả về dạng object, bạn cần chuyển thành array nếu cần
                const coursesArray = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...value,
                }));
                setData_Course(coursesArray); // Cập nhật state
                console.log('Data available:', JSON.stringify(coursesArray.splice(0, 1), null, 4));
            } else {
                console.log('No data available');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData_Course();
    }, []);
};

export default Data_Course;
