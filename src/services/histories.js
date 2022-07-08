import Axios from 'axios'
import Config from './config'
const Service = {
  getListHistory: () => Axios.get(Config.HOSTNAME + '/histories')
}

export default Service
