// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBoOeilrtllKXt4CHu3eiULNOGYYipWzvA",
//   authDomain: "datasubprojectmobile.firebaseapp.com",
//   databaseURL: "https://datasubprojectmobile-default-rtdb.firebaseio.com",
//   projectId: "datasubprojectmobile",
//   storageBucket: "datasubprojectmobile.firebasestorage.app",
//   messagingSenderId: "760533359798",
//   appId: "1:760533359798:web:88ad1af27fcd0cc36f1a17",
//   measurementId: "G-NTB51TC6ZP"
// };

// // Kiểm tra xem ứng dụng đã được khởi tạo chưa, nếu chưa thì khởi tạo
// const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);


// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Cấu hình Firebase của bạn
const firebaseConfig = {
    apiKey: "AIzaSyBoOeilrtllKXt4CHu3eiULNOGYYipWzvA",
    authDomain: "datasubprojectmobile.firebaseapp.com",
    databaseURL: "https://datasubprojectmobile-default-rtdb.firebaseio.com",
    projectId: "datasubprojectmobile",
    storageBucket: "datasubprojectmobile.firebasestorage.app",
    messagingSenderId: "760533359798",
    appId: "1:760533359798:web:88ad1af27fcd0cc36f1a17",
    measurementId: "G-NTB51TC6ZP"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
