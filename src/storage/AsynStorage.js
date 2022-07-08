import AsyncStorage from '@react-native-async-storage/async-storage'

const Storage = {

  getUserData: async () => {
    return await AsyncStorage.getItem('@USER')
  },

  storeUserData: (user) => {
    return AsyncStorage.setItem('@USER', user)
  },
  CleanAllData: () => {
    return AsyncStorage.clear()
  }
}

export default Storage
