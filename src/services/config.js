import Axios from 'axios'


const Config = {
    HOSTNAME: "https://coreplause-webservice.herokuapp.com",
    WEBSOCKET: "wss://coreplause-webservice.herokuapp.com",

    testConnect: () => {
        return Axios.get(Config.HOSTNAME)
    }

}
export default Config