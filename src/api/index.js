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
            mock: false
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
    //查询所有角色列表--只返回id和角色名称
    getRoleAllList() {
        return request({
            method: 'get',
            url: '/roles/allList',
            data: {},
            mock: false
        })
    },
    //查询角色列表
    getRoleList(params) {
        return request({
            method: 'get',
            url: '/roles/list',
            data: params,
            mock: false
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
    //用户新增/创建
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
    //角色新增/创建/删除
    roleOperate(params) {
        return request({
            method: 'post',
            url: '/roles/operate',
            data: params,
            mock: false
        })
    },
    updatePermission(params){
        return request({
            method: 'post',
            url: '/roles/update/permission',
            data: params,
            mock: false
        })
    }
}