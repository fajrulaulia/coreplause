import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Storage from '../storage/AsynStorage';
import Config from '../services/config';

const Profile = ({ navigation }) => {

    const [nickName, SetNickName] = React.useState("");
    const [status, setStatus] = React.useState("");

    React.useEffect(() => {
        Storage.getUserData()
            .then(res => res !== null && SetNickName(res))
            .catch(err => console.log("Storage.getUserData().Error() :", err));
    })


    const logoutHandler = () => {
        Storage.CleanAllData()
            .then(() => navigation.replace("Login"))
            .catch(err => console.log("AsyncStorage.clear Error", err));
    }



    const TestNetwork = () => {
        Config.testConnect().then(result => {
            console.log("result", result.data?.message)
            if (result.data?.message === "Welcome to Coreplause Service") {
                setStatus("Connected")
                setTimeout(() => {
                    setStatus("")
                }, 5000);
            }
        }).catch(err => {
            let strErr = "Koneksi Gagal Karena : "
            strErr += "MESSAGE [" + err.message + "]"
            strErr += "DESC [" + JSON.stringify(err) + "]"

            setStatus(strErr)
        })
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>{nickName}</Text>
            <Text style={styles.subtitle}>Coreplause User</Text>

            <TouchableOpacity style={styles.button} onPress={() => logoutHandler()}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => TestNetwork()}>
                <Text style={styles.buttonText2}>Network Test</Text>
            </TouchableOpacity>
            
            <Text style={styles.buttonText2}>{status}</Text>

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
    buttonText2: {
        color: 'black',
        marginTop: 10,
        textAlign: 'center'
    }

});


export default Profile