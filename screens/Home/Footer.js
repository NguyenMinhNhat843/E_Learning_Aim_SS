import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMagnifyingGlass, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Danh sách các trang trong footer
const data = [
    { id: 1, icon: faHouse, name: 'Home' },
    { id: 2, icon: faMagnifyingGlass, name: 'Search' },
    { id: 3, icon: faBookOpen, name: 'My Course' },
    { id: 4, icon: faUser, name: 'Profile' },
];

// Component hiển thị từng mục trong Footer
const RenderItem = ({ item, pageSelected, handlePageSelected }) => {
    const page = item.name.toUpperCase();
    const color = pageSelected === page ? 'cyan' : 'black'; // Đổi màu khi được chọn

    return (
        <TouchableOpacity style={styles.item} onPress={() => handlePageSelected(page)}>
            <FontAwesomeIcon icon={item.icon} style={{ color: color }} />
            <Text style={{ marginLeft: 8, color: color }}>{item.name}</Text>
        </TouchableOpacity>
    );
};

// Component Footer
const Footer = ({ user }) => {
    const navigation = useNavigation();
    const [pageSelected, setPageSelected] = React.useState('HOME');

    const handlePageSelected = (page) => {
        setPageSelected(page); // Cập nhật trạng thái trang được chọn

        let targetPage = page;
        if (page === 'HOME') targetPage = 'Home';
        else if (page === 'SEARCH') targetPage = 'Search';
        else if (page === 'MY COURSE') targetPage = 'My Course';
        else if (page === 'PROFILE') targetPage = 'Profile';
        
        navigation.navigate(targetPage); // Điều hướng đến các trang khác
    };

    // Theo dõi và cập nhật trang được chọn khi điều hướng
    useFocusEffect(
        React.useCallback(() => {
            const currentRoute = navigation.getState().routes[navigation.getState().index].name;
            setPageSelected(currentRoute.toUpperCase()); // Cập nhật màu sắc dựa trên trang hiện tại
        }, [navigation])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <RenderItem
                        item={item}
                        pageSelected={pageSelected}
                        handlePageSelected={handlePageSelected}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

// Style cho Footer
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    userText: {
        fontSize: 14,
        color: 'gray',
        marginHorizontal: 10,
    },
});

export default Footer;
