import axios from 'axios'

// 创建 Axios 实例
const instance = axios.create({
  baseURL: '/',
  // 设置请求超时时间
  timeout: 10000,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么，比如显示加载指示器
  return config;
}, function (error) {
  // 对请求错误做些什么
  if (axios.isAxiosError(error)) {
    // 处理 Axios 错误
    console.error(error.message)
  }
  return Promise.reject(error)
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么，比如隐藏加载指示器
  console.log(response)
  return response
}, function (error) {
  // 对响应错误做点什么
  if (axios.isAxiosError(error)) {
    // 处理 Axios 错误
    console.error(error.message)
  }
  return Promise.reject(error)
});

// 导出 Axios 实例
export default instance
