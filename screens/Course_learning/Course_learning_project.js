import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';

// render item project
const data_project = [
    {
        id: 1,
        image_project: require('../../assets/image/course_info/banner.jpg'),
        name_project: 'wireframe',
        author: 'John Doe',
    },
    {
        id: 2,
        image_project: require('../../assets/image/course_info/banner.jpg'),
        name_project: 'wireframe',
        author: 'John Doe',
    },
    {
        id: 3,
        image_project: require('../../assets/image/course_info/banner.jpg'),
        name_project: 'wireframe',
        author: 'John Doe',
    },
    {
        id: 4,
        image_project: require('../../assets/image/course_info/banner.jpg'),
        name_project: 'wireframe',
        author: 'John Doe',
    },
];

// Render item project
const Render_item_project = ({ item }) => {
    return (
        <View style={styles.project_item}>
            <Image source={item.image_project} style={{ width: 200, height: 100, borderRadius: 16 }} />
            <Text style={{ paddingTop: 8, paddingBottom: 8, fontSize: 18 }}>{item.name_project}</Text>
            <Text style={{ color: '#333' }}>{item.author}</Text>
        </View>
    );
};

// render item resource
const data_resource = [
    {
        id: 1,
        name_resource: 'wireframe.txt',
        file_size: '1.2MB',
    },
    {
        id: 2,
        name_resource: 'wireframe.txt',
        file_size: '1.2MB',
    },
    {
        id: 3,
        name_resource: 'wireframe.txt',
        file_size: '1.2MB',
    },
];

const Render_item_resource = ({ item }) => {
    return (
        <View style={styles.item_resource}>
            <FontAwesomeIcon style={{ height: '100%', width: 36 }} icon={faFile} />
            <TouchableOpacity style={{ flex: 1, paddingLeft: 16 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 8 }}>{item.name_resource}</Text>
                <Text style={{ color: '#ccc' }}>{item.file_size}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <FontAwesomeIcon style={{ width: 24, height: '100%', color: '#333' }} icon={faDownload} />
            </TouchableOpacity>
        </View>
    );
};

const ReadMoreText = ({ text, maxLength }) => {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <View>
            <Text style={styles.text}>{showMore ? text : `${text.slice(0, maxLength)}...`}</Text>
            <TouchableOpacity onPress={toggleShowMore}>
                <Text style={{ color: 'cyan' }}>{showMore ? 'See less' : 'See more'}</Text>
            </TouchableOpacity>
        </View>
    );
};

// Đổi tên component thành PascalCase
const CourseInfoProject = () => {
    const project_description_full_text =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quo ad praesentium quod omnis nam nisi ducimus aliquam totam quas accusamus eveniet reprehenderit, iste commodi sequi doloremque dolorum pariatur. Accusantium.';

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Upload your project</Text>
                <TouchableOpacity style={styles.button_up_project}>
                    <FontAwesomeIcon style={{ color: 'cyan', width: 24, height: 24 }} icon={faUpload} />
                    <Text style={styles.buttonText}>Upload your project here</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.student_project}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>12 Student Project</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 16, color: 'cyan' }}>View more</Text>
                    </TouchableOpacity>
                </View>
                {/* student project section */}
                <FlatList
                    data={data_project}
                    renderItem={({ item }) => <Render_item_project item={item} />}
                    keyExtractor={(item) => item.id.toString()} // Convert to string
                    horizontal={true}
                />
                {/* Project description section */}
                <View style={{ paddingTop: 32 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, paddingBottom: 16 }}>Project description</Text>
                    <ReadMoreText text={project_description_full_text} maxLength={100} />
                </View>
                {/* resource section */}
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 24, paddingTop: 32 }}>Resources</Text>
                    <FlatList
                        data={data_resource}
                        renderItem={({ item }) => <Render_item_resource item={item} />}
                        keyExtractor={(item) => item.id.toString()} // Convert to string
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    button_up_project: {
        backgroundColor: '#F0F0F0',
        padding: 15,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        marginTop: 10,
        borderStyle: 'dashed',
        borderColor: 'cyan',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#333333',
        fontSize: 16,
        paddingLeft: 8,
    },
    student_project: {
        paddingTop: 32,
    },
    project_item: {
        padding: 16,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 16,
    },
    item_resource: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 16,
        marginTop: 16,
    },
});

export default CourseInfoProject; 
