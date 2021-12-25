/*
* api管理
* */
import request from '../utils/request'

export default {
    login(params) {
        return request({
            method: 'post',
            url: '/user/login',
            data: params,
        })
    }
}