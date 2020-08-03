import axios from 'axios'
import { message } from 'antd';
import getUrl from './commonUrl';
const service = axios.create({
  baseURL: getUrl(),
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    config.headers['content-type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    let data = res.data || {}
    return data
  },
  error => {
    let msg = ''
    let data = error.response && error.response.data ?error.response.data : {};
    if (error == 'Error: timeout of 5000ms exceeded') {
      msg = '无效请求！请求超时！'
    } else {
      msg = data.message
    }
    // message.error(msg,2)
    return Promise.reject(error)
  }
)

export default service
