import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faMagnifyingGlass, faBusinessTime, faPenNib, faCode, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FlatList } from 'react-native-web';
import Recommen_course from '../Home/Recomment_course';
import Footer from '../Home/Footer';

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
    return (
        <ScrollView>
            <View style={styles.container}>
                {/* search input section */}
                <View style={styles.search_section}>
                    <View style={styles.search_input}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <TextInput style={styles.input} placeholder="Search Course" placeholderTextColor={'#f5f5f5'} />
                    </View>
                    <TouchableOpacity style={styles.filter_button}>
                        <FontAwesomeIcon icon={faFilter} />
                        <Text style={styles.filterText}>Filter</Text>
                    </TouchableOpacity>
                </View>

                {/* Hot topic section */}
                <View style={styles.hot_topics_section}>
                    <Text style={styles.hot_topics_text}>Hot Topics</Text>
                    <View style={styles.hot_topics_list}>
                        {data_hot_topics.map((item, index) => (
                            <View style={styles.hot_topics_item} key={index}>
                                <Text style={styles.hot_topics_item_text}>{item.title}</Text>
                            </View>
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

                {/* Footer */}
                <Footer />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
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
});

export default Search_page;
