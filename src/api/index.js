/*
* api管理
* */
import request from '../utils/request'
export default {
    login(params) {
        return request({
            method: 'post',
            url: '/users/login',
            data: params,
        })
    },
    noticeCount(params) {
        return request({
            method: 'get',
            url: '/leave/count',
            data: {},
            mock:true
        })
    },
    getMenuList(params) {
        return request({
            method: 'get',
            url: '/menu/list',
            data: {},
            mock:true
        })
    }
}