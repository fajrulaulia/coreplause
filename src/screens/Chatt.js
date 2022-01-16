import React, { useRef, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, FlatList } from 'react-native'
import ServiceHistory from '../services/histories'
import ServiceSend from '../services/Send'

import Storage from '../storage/AsynStorage'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Config from '../services/config';

var client = new W3CWebSocket(Config.WEBSOCKET, 'echo-protocol');


const Chatt = () => {
    const scrollViewRef = useRef();

    const [msgList, setMessageList] = useState([])
    const [nickName, SetNickName] = React.useState("");
    const [msgTxt, SetMsgTxt] = React.useState("");
    const [IsActive, setIsActive] = React.useState(false);

    client.onopen = () => {
        console.log('WebSocket Client Connected');

    }
    client.onmessage = e => {
        console.log('WebSocket Client updated code :', e.data);
        loadHistory()
    };


    React.useEffect(() => {
        Storage.getUserData()
            .then(res => res !== null && SetNickName(res))
            .catch(err => console.log("Storage.getUserData().Error() :", err));
        loadHistory()
    }, [msgList])

    const loadHistory = () => {
        ServiceHistory.getListHistory().then(result => {
            setMessageList(result.data?.payload)
        }).catch((err) => console.log(" ServiceHistory.getListHistory().Error() :", err))
    }

    const onChangeText = (e) => {
        SetMsgTxt(e)
        console.log("keep write lentgh,",e.length )
        if (e.length > 0) {
            setIsActive(true)
        }else{
            setIsActive(false)

        }
    }

    const SendMessage = () => {
        setIsActive(false)
        ServiceSend.SendMessage(
            {
                message: msgTxt,
                owner: nickName
            }
        ).then(result => {
            setMessageList(result.data?.payload)
        }).catch((err) => console.log(" ServiceHistory.getListHistory().Error() :", err))
        SetMsgTxt("")
    }


    return (
        <View style={styles.container}>
            {
                msgList.length > 0 ? <FlatList
                    style={styles.bubble}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                    data={msgList}
                    renderItem={({ item }) => ((
                        <View style={[styles.bubbleMini, item.owner === nickName && styles.bubbleMiniOwn]}>
                            <Text style={{ color:'black',fontSize: 10, paddingBottom: 5 }}>{item.owner}</Text>
                            <Text style={{color:'black'}}>{item.message}</Text>
                            <Text style={{ color:'black',fontSize: 10, paddingTop: 5 }}>{item.timestamp}</Text>
                        </View>
                    ))}
                    enableEmptySections={true}
                /> : <Text>Loading</Text>
            }

            <View style={styles.footerFixed}>
                <TextInput
                    value={msgTxt}
                    onChangeText={(e) => onChangeText(e)}
                    style={styles.textField}
                />
                <Button disabled={!IsActive} title='Send' onPress={() => SendMessage()} />
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