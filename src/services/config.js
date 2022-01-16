import Axios from 'axios'


const Config = {
    HOSTNAME: "http://192.168.15.150:3000",
    WEBSOCKET: "ws://192.168.15.150:3000",

    testConnect: () => {
        return Axios.get(Config.HOSTNAME)
    }

}
export default Config