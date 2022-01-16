import Axios from 'axios'
import Config from './config'
const Service = {
    SendMessage: (payload) => Axios.post(Config.HOSTNAME + "/send", payload)
}


export default Service;