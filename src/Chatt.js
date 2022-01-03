import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ScrollView, FlatList } from 'react-native'
const Chatt = () => {
    const scrollViewRef = useRef();

    const [msgList, setMessageList] = useState([
        {
            name: "fajrul",
            message: "Hallo",
            time: "2018-02-04T17:00:00.000Z"
        },
        {
            name: "Alfin",
            message: "Hallo Jg",
            time: "2018-02-04T17:01:00.000Z"
        },
        {
            name: "Rifal",
            message: "Kamu kok ga bales DM",
            time: "2018-02-04T17:02:00.000Z"
        },
        {
            name: "Alfin",
            message: "ga jelas",
            time: "2018-02-04T17:03:00.000Z"
        },
        {
            name: "Dimas",
            message: "Woi",
            time: "2018-02-04T17:04:00.000Z"
        },
        {
            name: "Andri",
            message: "Rf",
            time: "2018-02-04T17:05:00.000Z"
        },

    ])

    const onSendHandler=()=>{
        
    }

    return (
        <View style={styles.container}>

            <FlatList
                style={styles.bubble}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                data={msgList}
                renderItem={({ item }) => ((
                    <View style={[styles.bubbleMini, item.name === "fajrul" && styles.bubbleMiniOwn]}>
                        <Text style={{ fontSize: 10, paddingBottom: 5 }}>{item.name}</Text>
                        <Text>{item.message}</Text>
                        <Text style={{ fontSize: 10, paddingTop: 5 }}>{item.time}</Text>
                    </View>
                ))}
            />
            <View style={styles.footerFixed}>
                <TextInput
                    style={styles.textField}
                />
                <Button title='Send' />
            </View>
        </View>
    )

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: 'center',
        color: '#370665'
    },
    bubble: {
        marginBottom: 70,
    },
    bubbleMini: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 7,
        width: '50%',
        borderRadius: 30
    },
    bubbleMiniOwn: {
        backgroundColor: '#ccc',
        width: '50%',
        alignSelf: 'flex-end',

    },
    textField: {
        height: 40,
        color: '#000',
        justifyContent: 'center',
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
        color: '#370665',
    },

    button: {
        padding: 15,
        width: 200,
        backgroundColor: '#dc3545',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    footerFixed: {
        position: 'absolute',
        left: 0, right: 0, bottom: 0,
        backgroundColor: '#fff'

    }

});

export default Chatt