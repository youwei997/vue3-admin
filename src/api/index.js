/*
* api管理
* */
import request from '../utils/request'
//https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api/menu/list
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
        })
    },
    getMenuList(params) {
        return request({
            method: 'get',
            url: '/menu/list',
            data: {},
        })
    }
}