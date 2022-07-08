import Axios from 'axios'
import Config from './config'
const Service = {
  validate: (payload) => Axios.post(Config.HOSTNAME + '/validate', payload)
}

export default Service
