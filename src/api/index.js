/*
* api管理
* */
import request from '../utils/request'

export default {
    //登录
    login(params) {
        return request({
            method: 'post',
            url: '/users/login',
            data: params,
            mock:false
        })
    },
    //获取右上角通知数
    noticeCount(params) {
        return request({
            method: 'get',
            url: '/leave/count',
            data: {},
            mock: true
        })
    },
    //获取菜单列表
    getMenuList(params) {
        return request({
            method: 'get',
            url: '/menu/list',
            data: params,
            mock: false
        })
    },
    //获取用户列表
    getUserList(params) {
        return request({
            method: 'get',
            url: '/users/list',
            data: params,
            mock: false
        })
    },
    //删除用户
    userDelete(params) {
        return request({
            method: 'post',
            url: '/users/delete',
            data: params,
            mock: false
        })
    },
    //查询角色列表
    getRoleList() {
        return request({
            method: 'get',
            url: '/roles/allList',
            data: {},
            mock: true
        })
    },
    //查询部门列表
    getDeptList() {
        return request({
            method: 'get',
            url: '/dept/list',
            data: {},
            mock: true
        })
    },
    //新增用户
    userSubmit(params) {
        return request({
            method: 'post',
            url: '/users/operate',
            data: params,
            mock: false
        })
    },
    //新增菜单
    menuSubmit(params) {
        return request({
            method: 'post',
            url: '/menu/operate',
            data: params,
            mock: false
        })
    },
}