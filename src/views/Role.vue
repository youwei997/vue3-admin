<template>
    <div class="role-manage">
        <div class="query-form">
            <el-form ref="form" :inline="true" :model="queryForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="queryForm.roleName" placeholder="请输入角色名称"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getRoleList">查询</el-button>
                    <el-button @click="handleReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary">创建</el-button>
            </div>
            <el-table
                :data="roleList"
                row-key="_id"
            >
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :formatter="item.formatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="240">
                    <template #default="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini">设置权限</el-button>
                        <el-button
                            type="danger"
                            size="mini">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination :page-size="pager.pageSize"
                           :total="pager.total"
                           background
                           class="pagination"
                           layout="prev, pager, next"
                           @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <!--        <el-dialog title="用户新增" v-model="showModal">
                    <el-form
                        ref="dialogForm"
                        :model="menuForm"
                        label-width="100px"
                        :rules="rules"
                    >
                        <el-form-item label="父级菜单" prop="parentId">
                            <el-cascader
                                placeholder="不选，则直接创建一级菜单"
                                v-model="menuForm.parentId"
                                :options="menuList"
                                :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
                                clearable
                            />
                        </el-form-item>
                        <el-form-item label="菜单类型" prop="menuType">
                            <el-radio-group v-model="menuForm.menuType">
                                <el-radio :label="1">菜单</el-radio>
                                <el-radio :label="2">按钮</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="菜单名称" prop="menuName">
                            <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称"/>
                        </el-form-item>
                        <el-form-item
                            label="菜单图标"
                            prop="icon"
                            v-show="menuForm.menuType == 1"
                        >
                            <el-input v-model="menuForm.icon" placeholder="请输入岗位"/>
                        </el-form-item>
                        <el-form-item
                            label="路由地址"
                            prop="path"
                            v-show="menuForm.menuType == 1"
                        >
                            <el-input v-model="menuForm.path" placeholder="请输入路由地址"/>
                        </el-form-item>
                        <el-form-item
                            label="权限标识"
                            prop="menuCode"
                            v-show="menuForm.menuType == 2"
                        >
                            <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识"/>
                        </el-form-item>
                        <el-form-item
                            label="组件路径"
                            prop="component"
                            v-show="menuForm.menuType == 1"
                        >
                            <el-input v-model="menuForm.component" placeholder="请输入组件路径"/>
                        </el-form-item>
                        <el-form-item
                            label="菜单状态"
                            prop="menuState"
                            v-show="menuForm.menuType == 1"
                        >
                            <el-radio-group v-model="menuForm.menuState">
                                <el-radio :label="1">正常</el-radio>
                                <el-radio :label="2">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                <span class="dialog-footer">
                  <el-button @click="handleClose">取 消</el-button>
                  <el-button type="primary" @click="handleSubmit">确 定</el-button>
                </span>
                    </template>
                </el-dialog>-->
    </div>
</template>
<script setup>

import utils from "../utils/utils";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";

const {proxy} = getCurrentInstance()

//搜索表单
const queryForm = reactive(
    {
        roleName: ''
    },
)
//角色列表
const roleList = ref([])
//列表头
const columns = ref([
    {
        label: "角色名称",
        prop: "roleName",
    },
    {
        label: "备注",
        prop: "remark",
    },
    {
        label: "权限列表",
        prop: "menuType",
    },
    {
        label: "创建时间",
        prop: "createTime",
        formatter(row, column, value) {
            return utils.formatDate(new Date(value));
        },
    },
],)
//分页数据
const pager = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0
})
onMounted(() => {
    getRoleList()
})

//获取菜单列表
const getRoleList = async () => {
    try {
        let {list} = await proxy.$api.getRoleList(queryForm);
        roleList.value = list;
    } catch (e) {
        throw new Error(e);
    }
}
// 表单重置
const handleReset = (form) => {
    proxy.$refs[form].resetFields();
}

//页码切换调用方法
const handleCurrentChange = (current) => {
    pager.pageNum = current
    getRoleList()
}

// 弹框关闭
const handleClose = () => {
    showModal.value = false;
    handleReset("dialogForm");
}

</script>

<style lang="scss">
</style>