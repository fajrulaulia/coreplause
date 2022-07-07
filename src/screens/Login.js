import React from 'react';
import Storage from '../storage/AsynStorage'

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import ServiceValidate from '../services/validate'

const Login = ({ navigation }) => {
    const [user, setUser] = React.useState('Fajrul Aulia');
    const [loading, setLoading] = React.useState('');

    React.useEffect(() => {
        Storage.getUserData()
            .then(res => res !== null && navigation.replace('Home'))
            .catch(err => console.log("Storage.getUserData().Error() :", err))
    })

    const onClick = () => {
        if (user === "" || user === null || user === undefined) {
            setLoading("Username is empty")
            return
        }

        const usernameRegex = /^[a-zA-Z0-9]+$/;

        if (!usernameRegex.test(user)) {
            setLoading("Username is invalid, user a-z A-Z 0-9")
            return
        }
        console.log("usernameRegex.test(user)",usernameRegex.test(user))

        setLoading("Loading...")

        ServiceValidate.validate({ user: user }).then((result) => {
            if (result.data?.success) {
                storeData(user);
            } else {
                setLoading(`username with "${user}"  has registered, use another username`)
            }
        }).catch((err)=>{
            if (err?.message?.includes("Network Error")){
                setLoading(`failed to connect server, maybe server down or you connection down`)
                console.log(err.message)
            }
            console.log(err.message)
        })
        setTimeout(() => { setLoading("") }, 5000);
    }
    const storeData = (user) => {
        Storage.storeUserData(user)
            .then(() => navigation.replace('Home'))
            .catch((err) => {
                setLoading("Storage.storeUserData(user).Error() :", err)
            })
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
                    onChangeText={v => setUser(v)}
                    defaultValue={user}
                    underlineColorAndroid='blue'
                    maxLength={30} z
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
        width:300,
        textAlign: 'center'
    }

});

export default Login;
