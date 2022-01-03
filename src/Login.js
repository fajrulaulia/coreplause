import React from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';


const Login = ({ navigation }) => {
    const [text, setText] = React.useState('Fajrul Aulia');
    const [loading, setLoading] = React.useState('');

    React.useEffect(() => {
        getData()
    })

    const onClick = () => {
        if (text === "" || text === null || text === undefined) {
            setLoading("Nickname is empty")
            return
        }
        setLoading("Loading...")
        storeData(text);

    }

    const storeData = (user) => {
        AsyncStorage.setItem('@USER', user).then(() => {
            navigation.replace('Home');
        }).catch(() => {
            setLoading("AsyncStorage.setItem Error")

        })
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@USER')
            if (value !== null) {
                navigation.replace('Home');
            }
        } catch (e) {
            console.log("AsyncStorage.getItem error :", e)
        }
    }

    return (
        <View style={styles.container}>
            <Text
                style={styles.title}>
                Welcome to Coreplause</Text>
            <Text
                style={styles.subtitle}>
                Region Session Chatt for everyone</Text>
            <View>
                <TextInput
                    style={styles.textField}
                    placeholder="Fill new Nickname"
                    onChangeText={text => setText(text)}
                    defaultValue={text}
                    underlineColorAndroid='blue'
                    maxLength={30}
                />
                <Text style={styles.textLoading}>{loading}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { onClick() }}>
                    <Text style={styles.buttonText} >Join with Room Chatt</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 2,
        textAlign: 'center',
        color: '#370665'
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
        color: '#370665',
    },
    textField: {
        height: 40,
        color: '#000',
        marginBottom: 10,
        justifyContent: 'center',
        width: 300,
        textAlign: 'center',
        fontSize: 18,
    },
    button: {
        padding: 20,
        width: 300,
        backgroundColor: '#370665',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    textLoading: {
        marginBottom: 10,
        textAlign: 'center'
    }

});

export default Login;
