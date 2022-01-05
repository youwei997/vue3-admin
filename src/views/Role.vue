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
                <el-button type="primary" @click="handleCreate">创建</el-button>
            </div>
            <el-table
                :data="roleList"
                row-key="_id"
            >
                <!--:formatter="item.formatter"-->
                <el-table-column
                    v-for="item in columns"
                    :key="item.prop"
                    :prop="item.prop"
                    :label="item.label"
                >
                </el-table-column>
                <el-table-column label="操作" width="240">
                    <template #default="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini">设置权限</el-button>
                        <el-button
                            type="danger"
                            size="mini" @click="handleDelete(scope.row._id)">删除
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
        <el-dialog title="用户新增" v-model="showModal">
            <el-form
                ref="dialogForm"
                :model="roleForm"
                label-width="100px"
                :rules="rules"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleForm.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" rows="2" v-model="roleForm.remark" placeholder="请输入备注"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="handleSubmit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>

import utils from "../utils/utils";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";

const {proxy} = getCurrentInstance()

//搜索表单
const queryForm = reactive(
    {
        roleName: '',
        remark: ''
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

//弹窗表单
const roleForm = reactive({
    roleName: '', //角色名称
    remark: '',//备注
})

//弹窗显示
const showModal = ref(false)

//表单校验
const rules = reactive({
    roleName: [
        {
            required: true,
            message: '请输入角色名称'
        }
    ]
})

const action = ref('')

//表单的ref
const dialogForm = ref(null)

onMounted(() => {
    getRoleList()
})

//创建表单弹窗
const handleCreate = () => {
    showModal.value = true
    action.value = 'create'
}

//编辑表单弹窗
const handleEdit = (row) => {
    showModal.value = true
    action.value = 'edit'
    proxy.$nextTick(() => {
        Object.assign(roleForm, row)
    })
}

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

const handleDelete = (id) => {
    const params = {
        id,
        action: 'delete'
    }
    proxy.$api.roelOperate(params).then(res => {
        proxy.$message.success('删除成功')
        getRoleList()
    });
}

//表单确认提交
const handleSubmit = () => {
    dialogForm.value.validate((valid) => {
        if (valid) {
            const params = {
                action: action.value,
                ...roleForm
            }
            proxy.$api.roelOperate(params).then(res => {
                if (action.value === 'create') {
                    proxy.$message.success('创建成功')
                } else {
                    proxy.$message.success('编辑成功')
                }
                handleClose()
                getRoleList()
            });
        }
    })
}

</script>

<style lang="scss">
</style>