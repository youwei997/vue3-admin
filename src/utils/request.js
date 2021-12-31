//二次封装
import axios from "axios";
import {ElMessage} from "element-plus";
import config from "../config";
import router from "../router";
import storage from './storage'

const TOKEN_INVALID = "token认证失败，请重新登陆";
const NETWORK_ERROR = "网络请求异常，请稍后再试";

//创建axios实例对象，添加全局配置
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 8000,
});

//请求拦截
service.interceptors.request.use((req) => {
    //如果是请求/users/login，就直接放行
    if (req.url === '/users/login') {
        return req
    }
    const headers = req.headers;
    const {token} = storage.getItem('userInfo')
    if (!headers.Authorization) headers.Authorization = 'Bearer ' + token;
    return req
});

service.interceptors.response.use((res) => {
    const {code, data, msg} = res.data;
    if (code === 200) {
        return data;
    } else if (code === 50001) {
        ElMessage.error(TOKEN_INVALID);
        setInterval(() => {
            router.push("/login");
        }, 1500);
        return Promise.reject(TOKEN_INVALID);
    } else {
        ElMessage.error(msg || NETWORK_ERROR);
        return Promise.reject(msg || TOKEN_INVALID);
    }
});

//请求核心函数
function request(options) {
    options.method = options.method || "get";
    if (options.method.toLowerCase() === "get") {
        options.params = options.data;
    }
    if(typeof options.mock !=='undefined') {
        config.mock = options.mock //设置局部mock
    }
    if (config.env === "prod") {
        service.defaults.baseURL = config.baseApi;
    } else {
        service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
    }
    return service(options);
}

['post', 'get', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            methods:item,
            ...options
        })
    }
})

export default request;
