import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMagnifyingGlass, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
    {
        id: 1,
        icon: faHouse,
        name: 'Home',
    },
    {
        id: 2,
        icon: faMagnifyingGlass,
        name: 'Search',
    },
    {
        id: 3,
        icon: faBookOpen,
        name: 'My Course',
    },
    {
        id: 4,
        icon: faUser,
        name: 'Profile',
    },
];

const Render_item = ({ item, pageSelected, handlePageSelected }) => {
    const page = item.name.toUpperCase();
    return (
        <TouchableOpacity style={styles.item} onPress={() => handlePageSelected(page)}>
            <FontAwesomeIcon style={{ color: pageSelected === page && 'cyan' }} icon={item.icon} />
            <Text style={{ marginLeft: 8, color: pageSelected === page && 'cyan' }}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const Footer = () => {
    const navigation = useNavigation();
    const [pageSelected, setPageSelected] = React.useState('HOME');
    const handlePageSelected = (page) => {
        setPageSelected(page);
        if (page === 'HOME') page = 'Home';
        if (page === 'SEARCH') page = 'Search';
        if (page === 'MY COURSE') page = 'CourseInfo';
        if (page === 'PROFILE') page = 'Profile';
        navigation.navigate(page);
    };

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
});

export default Footer;
