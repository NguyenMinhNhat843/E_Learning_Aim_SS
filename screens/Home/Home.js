import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Category from './Category';
import Popular_course from './Popular_course';
import Recomment_course from './Recomment_course';
import Course_inspires from './Course_inspires';
import Top_teacher from './Top_teacher';
import Footer from './Footer';

const Home = ({ navigation }) => {
    const changeToCartPage = () => {
        navigation.navigate('Cart');
    };

    return (
        <View style={styles.container}>
            {/* header */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 32, color: 'white', flex: 1 }}>Hello Roise</Text>
                    <TouchableOpacity onPress={changeToCartPage} style={{backgroundColor:'#156892', padding:10, marginRight: 10}}>
                        <FontAwesomeIcon style={{ color: 'white', paddingRight: 50 }} size={30} icon={faCartShopping} />
                    </TouchableOpacity>
                    <FontAwesomeIcon style={{ color: 'white', paddingRight: 16 }} size={30} icon={faBell} />
                </View>
                <View>
                    <Text style={{ color: 'white', paddingTop: 8, fontWeight:700 }}>What do you learn to day?</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollContent}>
                <View>
                    {/* banner */}
                    <View style={styles.banner_block}>
                        <Image style={styles.banner_img} source={require('../../assets/image/course_info/banner.jpg')} />
                        <View style={styles.banner_info}>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>PROJECT MANAGER</Text>
                            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>20% OFF</Text>
                            <TouchableOpacity style={styles.button_banner}>
                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Join now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Category navigation={navigation}/>

                    <Popular_course navigation={navigation} />

                    <Recomment_course navigation={navigation} />

                    <Course_inspires navigation={navigation} />

                    {/* top teacher */}
                    <Top_teacher navigation={navigation} />
                </View>
            </ScrollView>

            {/* Footer cố định */}
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 145,
        backgroundColor: '#23547f',
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    // banner
    banner_block: {
        height: 200,
        backgroundColor: 'cyan',
        padding: 16,
        backgroundColor: 'white',
    },
    banner_img: {
        height: '100%',
        width: '100%',
        borderRadius: 16,
    },
    banner_info: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -50 }],
        left: 16,
        borderRadius: 16,
        paddingLeft: 16,
    },
    button_banner: {
        backgroundColor: '#007BFF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        color: 'white',
        width: '60%',
        marginTop: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        flex: 1,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
    },
});

export default Home;
