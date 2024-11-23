import React, { Fragment, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faFilter,
    faMagnifyingGlass,
    faBusinessTime,
    faPenNib,
    faCode,
    faAngleRight,
    faLanguage,
    faPenToSquare,
} from '@fortawesome/free-solid-svg-icons';
import Recommen_course from '../Home/Recomment_course';
import Footer from '../Home/Footer';
import Search_result from './Search_result';
import { ref, get } from 'firebase/database';
import { database } from '../../firebaseConfig'; // Đường dẫn đúng tới file firebaseConfig.js
import { useRoute } from '@react-navigation/native';

const data_hot_topics = [
    {
        id: 1,
        title: 'Python',
    },
    {
        id: 2,
        title: 'Java',
    },
    {
        id: 3,
        title: 'Design',
    },
    {
        id: 4,
        title: 'AI',
    },
    {
        id: 5,
        title: 'JS',
    },
    {
        id: 6,
        title: 'React',
    },
    {
        id: 7,
        title: 'test',
    },
];

const data_category = [
    {
        id: 1,
        icon: <FontAwesomeIcon icon={faBusinessTime} />,
        name: 'Bussiness',
    },
    {
        id: 2,
        icon: <FontAwesomeIcon icon={faPenNib} />,
        name: 'Design',
    },
    {
        id: 3,
        icon: <FontAwesomeIcon icon={faCode} />,
        name: 'Code',
    },
    {
        id: 4,
        icon: <FontAwesomeIcon icon={faLanguage} />,
        name: 'Language',
    },
    {
        id: 5,
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        name: 'Write',
    },
    {
        id: 6,
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        name: 'Movie',
    },
];

const Search_page = ({ navigation }) => {
    const route = useRoute();

    // ======================= fetch data ========================
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

    // ======================= search ========================
    const [searchText, setSearchText] = useState(''); // text search
    const [data_SearchResult, setData_SearchResult] = useState([]); // data search result
    const [searchResultView, setSearchResultView] = useState(false); // true: view search result, false: view home page
    const [searchTopics, setSearchTopics] = useState([]); // topics search

    // hàm tìm theo text
    const searchByText = () => {
        if (searchText.trim() === '') {
            return false;
        } else {
            const result = Data_Course.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setData_SearchResult(result);
            return true;
        }
    };

    // search theo category
    const searchByCategory = (category) => {
        const result = Data_Course.filter((item) => item.category.toLowerCase() === category.toLowerCase());
        setData_SearchResult(result);
        setSearchResultView(!searchResultView);
    };

    useEffect(() => {
        console.log(route.params?.nameCategory);
        if (route.params?.nameCategory) {
            searchByCategory(route.params.nameCategory);
        }
    }, []);

    // lưu topic đã chọn vào mảng searchTopics
    const saveTopics = (topic) => {
        if (searchTopics.includes(topic)) {
            const newTopics = searchTopics.filter((item) => item !== topic);
            setSearchTopics(newTopics);
        } else {
            const newTopics = [...searchTopics, topic];
            setSearchTopics(newTopics);
        }
    };

    // hàm tìm theo topics
    const searchByTopics = () => {
        if (searchTopics.length === 0) {
            return false;
        } else {
            const result = Data_Course.filter((item) => item.topics.some((i) => searchTopics.includes(i)));
            setData_SearchResult(result);
            return true;
        }
    };

    // thay đổi sang view kết quả tìm kiếm
    const changeView = () => {
        if (searchByText() || searchByCategory()) {
            setSearchResultView(!searchResultView);
        }
    };

    // ======================= show all ========================
    const [showAllCategory, setShowAllCategory] = useState(false);

    return (
        <View style={styles.container}>
            {/* search input section */}
            <View style={styles.search_section}>
                <View style={styles.search_input}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search Course"
                        placeholderTextColor={'#f5f5f5'}
                        value={searchText}
                        onChangeText={(newText) => setSearchText(newText)}
                    />
                </View>
                <TouchableOpacity style={styles.filter_button} onPress={changeView}>
                    <FontAwesomeIcon icon={faFilter} />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* body */}
            <ScrollView style={{ flex: 1 }}>
                {searchResultView ? (
                    <Search_result data={data_SearchResult} />
                ) : (
                    <Fragment>
                        <View style={styles.hot_topics_section}>
                            <Text style={styles.hot_topics_text}>Hot Topics</Text>
                            <View style={styles.hot_topics_list}>
                                {data_hot_topics.map((item, index) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.hot_topics_item,
                                            { backgroundColor: searchTopics.includes(item.title) ? 'cyan' : 'white' },
                                        ]}
                                        key={index}
                                        onPress={() => saveTopics(item.title)}
                                    >
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Category section */}
                        <View style={styles.category_section}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Category</Text>
                                <TouchableOpacity onPress={() => setShowAllCategory(!showAllCategory)}>
                                    <Text style={{ color: 'cyan' }}>{showAllCategory ? 'View less' : 'View more'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingTop: 16 }}>
                                <FlatList
                                    data={showAllCategory ? data_category : data_category.slice(0, 3)}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.category_item} onPress={() => searchByCategory(item.name)}>
                                            <View style={{ padding: 8 }}>{item.icon}</View>
                                            <Text style={{ flex: 1, fontSize: 16 }}>{item.name}</Text>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        </View>

                        {/* Recommen course */}
                        <Recommen_course style={{ padding: 0 }} navigation={navigation} />
                    </Fragment>
                )}
                {/* Hot topic section */}
            </ScrollView>

            {/* Footer */}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 56,
        flex: 1,
        backgroundColor: 'white',
    },
    search_section: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    search_input: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        color: '#f5f5f5',
        backgroundColor: '#ccc',
        borderRadius: 8,
        paddingLeft: 16,
    },
    input: {
        flex: 1,
        padding: 12,
        color: '#424242',
        outline: 'none',
    },
    filter_button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00c2d9',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        marginLeft: 16,
    },
    filterText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 16,
    },
    // hot topics section
    hot_topics_list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    hot_topics_section: {
        padding: 16,
    },
    hot_topics_text: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 16,
    },
    hot_topics_item: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'cyan',
        borderRadius: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    // category section
    category_section: {
        padding: 16,
        paddingTop: 0,
    },
    category_item: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
    },
});

export default Search_page;
