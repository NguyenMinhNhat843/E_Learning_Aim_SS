import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMagnifyingGlass, faBookOpen, faUser } from '@fortawesome/free-solid-svg-icons';

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

const Render_item = ({ item }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };
    return (
        <TouchableOpacity style={styles.item} onPress={handleFocus}>
            <FontAwesomeIcon style={{ color: isFocused && 'cyan' }} icon={item.icon} />
            <Text style={{ marginLeft: 8, color: isFocused && 'cyan' }}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const Footer = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Render_item item={item} />}
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
