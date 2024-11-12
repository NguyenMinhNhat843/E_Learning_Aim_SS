import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMagnifyingGlass, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const data = [
    { id: 1, icon: faHouse, name: 'Home' },
    { id: 2, icon: faMagnifyingGlass, name: 'Search' },
    { id: 3, icon: faBookOpen, name: 'My Course' },
    { id: 4, icon: faUser, name: 'Profile' },
];

const Render_item = ({ item, pageSelected, handlePageSelected }) => {
    const page = item.name.toUpperCase();
    const color = pageSelected === page ? 'cyan' : 'black'; // Đặt màu theo điều kiện

    return (
        <TouchableOpacity style={styles.item} onPress={() => handlePageSelected(page)}>
            <FontAwesomeIcon icon={item.icon} style={{ color: color }} />
            <Text style={{ marginLeft: 8, color: color }}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const Footer = () => {
    const navigation = useNavigation();
    const [pageSelected, setPageSelected] = React.useState('HOME');

    const handlePageSelected = (page) => {
        setPageSelected(page); // Cập nhật màu ngay lập tức

        let targetPage = page;
        if (page === 'HOME') targetPage = 'Home';
        else if (page === 'SEARCH') targetPage = 'Search';
        else if (page === 'MY COURSE') targetPage = 'MyCourses';
        else if (page === 'PROFILE') targetPage = 'UserProfile';

        navigation.navigate(targetPage); // Chuyển đến trang
    };

    useFocusEffect(
        React.useCallback(() => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            console.log('Current Route: ', currentRoute); // Debug
            setPageSelected(currentRoute); // Cập nhật màu sắc dựa trên trang hiện tại
        }, [navigation])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Render_item item={item} pageSelected={pageSelected} handlePageSelected={handlePageSelected} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    flatListContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
        padding: 16,
    },
    item: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
    },
});

export default Footer;
