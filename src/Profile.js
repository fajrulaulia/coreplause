import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {

    const [nickName, SetNickName] = React.useState("");

    React.useEffect(() => {
        getData()
    })


    const logoutHandler = () => {
        AsyncStorage.clear()
            .then(() => navigation.replace("Login"))
            .catch((e) => console.log("AsyncStorage.clear Error", e))
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@USER')
            if (value !== null) {
                SetNickName(value)
            }
        } catch (e) {
            console.log("AsyncStorage.getItem error :", e)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nickName}</Text>
            <Text style={styles.subtitle}>Coreplause User</Text>

            <TouchableOpacity style={styles.button} onPress={() => logoutHandler()}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )

}



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
        textAlign: 'center',
        color: '#370665'
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

});


export default Profile