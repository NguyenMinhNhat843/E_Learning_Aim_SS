
import React, { Fragment, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faMagnifyingGlass, faBusinessTime, faPenNib, faCode, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Recommen_course from '../Home/Recomment_course';
import Footer from '../Home/Footer';
import Data_All_Course from '../../data/Data_All_Course';
import Search_result from './Search_result';

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
];

const Search_page = () => {
    const [searchText, setSearchText] = useState(''); // text search
    const [data_SearchResult, setData_SearchResult] = useState([]); // data search result
    const [searchResultView, setSearchResultView] = useState(false); // true: view search result, false: view home page
    const [searchTopics, setSearchTopics] = useState([]); // topics search

    // hàm tìm theo text
    const searchByText = () => {
        if (searchText.trim() === '' && searchTopics.length === 0) {
            // alert('Vui lòng nhập nội dung tìm kiếm.');
            return false;
        } else {
            const result = Data_All_Course.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setData_SearchResult(result);
            return true;
        }
    };

    // hàm tìm theo topics
    const saveTopics = (topic) => {
        if (searchTopics.includes(topic)) {
            const newTopics = searchTopics.filter((item) => item !== topic);
            setSearchTopics(newTopics);
        } else {
            const newTopics = [...searchTopics, topic];
            setSearchTopics(newTopics);
        }
    };

    const searchByTopics = (topic) => {
        saveTopics(topic);
        const result = Data_All_Course.filter((item) => item.topics.includes(topic));
        setData_SearchResult(result);
    };

    // thay đổi sang view kết quả tìm kiếm
    const changeView = () => {
        if (!searchByText()) {
        } else {
            setSearchResultView(!searchResultView);
        }
    };

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
                                        onPress={() => searchByTopics(item.title)}
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
                                <TouchableOpacity>
                                    <Text style={{ color: 'cyan' }}>View more</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingTop: 16 }}>
                                <FlatList
                                    data={data_category}
                                    renderItem={({ item }) => (
                                        <View style={styles.category_item}>
                                            <View style={{ padding: 8 }}>{item.icon}</View>
                                            <Text style={{ flex: 1, fontSize: 16 }}>{item.name}</Text>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </View>
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </View>
                        </View>

                        {/* Recommen course */}
                        <Recommen_course style={{ padding: 0 }} />
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
        flex:1,
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
    }
});

export default Search_page;
