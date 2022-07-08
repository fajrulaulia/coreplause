import React, { useRef, useState } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import ServiceHistory from '../services/histories'
import ServiceSend from '../services/Send'

import Storage from '../storage/AsynStorage'
import { w3cwebsocket as W3CWebSocket } from 'websocket'
import Config from '../services/config'
import Icons from 'react-native-vector-icons/FontAwesome'

const client = new W3CWebSocket(Config.WEBSOCKET, 'echo-protocol')

const Chatt = () => {
  const scrollViewRef = useRef()

  const [messages, setMessages] = useState([])
  const [nickName, SetNickName] = React.useState('')
  const [InputTextMessage, SetInputTextMessage] = React.useState('')
  const [IsActive, setIsActive] = React.useState(false)

  client.onopen = () => {
    console.log('WebSocket Client Connected')
  }
  client.onmessage = e => {
    console.log('WebSocket Client updated code :', e.data)
    loadHistory()
  }

  React.useEffect(() => {
    Storage.getUserData()
      .then(res => res !== null && SetNickName(res))
      .catch(err => console.log('Storage.getUserData().Error() :', err))
    loadHistory()
  }, [])

  const loadHistory = () => ServiceHistory.getListHistory()
    .then(result => {
      // const newMsg = messages
      // newMsg.push(result.data?.payload[result.data?.payload.length - (1)])
      // setMessages(newMsg)
      setMessages(result.data?.payload)
    })
    .catch((err) => console.log(' ServiceHistory.getListHistory().Error() :', err))

  const onChangeText = (e) => {
    SetInputTextMessage(e)
    if (e.length > 0) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  const SendMessage = () => {
    setIsActive(false)
    ServiceSend.SendMessage({ message: InputTextMessage, owner: nickName })
      .catch((err) => console.log(' ServiceHistory.getListHistory().Error() :', err))
    SetInputTextMessage('')
  }

  const handleKeyDown = () => SendMessage()

  return (
    <View style={styles.container}>

      <FlatList
        style={styles.bubble}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
        data={messages}
        keyExtractor={(_e, idx) => idx.toString()}
        renderItem={({ item }) => ((
          <View style={[styles.bubbleMini, item.owner === nickName && styles.bubbleMiniOwn]}>
            <Text style={{ color: 'black', fontSize: 10, paddingBottom: 5 }}>{item.owner}</Text>
            <Text style={{ color: 'black' }}>{item.message}</Text>
            <Text style={{ color: 'black', fontSize: 10, paddingTop: 5 }}>{item.timestamp}</Text>
          </View>
        ))}
        ListEmptyComponent={() => ((
          <ActivityIndicator />
        ))}
        enableEmptySections={true}
      />

      <View style={styles.footerFixed}>
        <TextInput
          value={InputTextMessage}
          onChangeText={onChangeText}
          onSubmitEditing={handleKeyDown}
          style={styles.textField}
        />
        <TouchableOpacity disabled={!IsActive} onPress={() => SendMessage()} >
            <Icons name='paper-plane' size={34} color={!IsActive ? 'gray' : 'blue'} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#370665'
  },
  bubble: {
    marginBottom: 100

  },
  bubbleMini: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 7,
    width: '50%',
    borderRadius: 20
  },
  bubbleMiniOwn: {
    backgroundColor: '#ccc',
    width: '50%',
    alignSelf: 'flex-end'

  },
  textField: {
    height: 40,
    color: '#000',
    justifyContent: 'center',
    maxWidth: '100%',
    flex: 1,
    paddingHorizontal: 15
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#370665'
  },

  button: {
    padding: 15,
    width: 200,
    backgroundColor: '#dc3545'
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  footerFixed: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    left: 0,
    right: 100,
    bottom: 0,
    backgroundColor: '#fff'

  }

})

export default Chatt
