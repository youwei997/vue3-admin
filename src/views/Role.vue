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
            <el-table :data="roleList" row-key="_id">
                <!--:formatter="item.formatter"-->
                <el-table-column
                        v-for="item in columns"
                        :key="item.prop"
                        :prop="item.prop"
                        :label="item.label"
                        :formatter="item.formatter"
                ></el-table-column>
                <el-table-column label="操作" width="240">
                    <template #default="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)"
                        >编辑
                        </el-button
                        >
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleOpenPermission(scope.row)"
                        >设置权限
                        </el-button
                        >
                        <el-button
                                type="danger"
                                size="mini"
                                @click="handleDelete(scope.row._id)"
                        >删除
                        </el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                    :page-size="pager.pageSize"
                    :total="pager.total"
                    background
                    class="pagination"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
        <el-dialog title="用户新增" v-model="showModal">
            <el-form
                    ref="dialogForm"
                    :model="roleForm"
                    label-width="100px"
                    :rules="rules"
            >
                <el-form-item label="角色名称" prop="roleName">
                    <el-input
                            v-model="roleForm.roleName"
                            placeholder="请输入角色名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input
                            type="textarea"
                            rows="2"
                            v-model="roleForm.remark"
                            placeholder="请输入备注"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
            </template>
        </el-dialog>
        <!--权限弹窗-->
        <el-dialog title="权限设置" v-model="showPermission">
            <el-form label-width="100px">
                <el-form-item label="角色名称">{{ curRoleName }}</el-form-item>
                <el-form-item label="选择权限">
                    <el-tree
                            ref="permissionTree"
                            :data="menuList"
                            show-checkbox
                            node-key="_id"
                            default-expand-all
                            :props="{ label: 'menuName' }"
                    ></el-tree>
                </el-form-item>
            </el-form>
            <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePermissionClose">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit"
          >确 定</el-button
          >
        </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import utils from "../utils/utils";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";

const {proxy} = getCurrentInstance();

//搜索表单
const queryForm = reactive({
    roleName: "",
    remark: "",
});
//角色列表
const roleList = ref([]);
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
        prop: "permissionList",
        formatter(row, column, value) {
            let names = [];
            let list = value.halfCheckedKeys || [];
            list.map((key) => {
                let name = actionMap[key]
                if (key && name) {
                    names.push(actionMap[key]);
                }
            });
            return names.join(",");
        },
    },
    {
        label: "更新时间",
        prop: "updateTime",
        formatter(row, column, value) {
            return utils.formatDate(new Date(value));
        },
    },
    {
        label: "创建时间",
        prop: "createTime",
        formatter(row, column, value) {
            return utils.formatDate(new Date(value));
        },
    },
]);
//分页数据
const pager = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
});

//弹窗表单
const roleForm = reactive({
    roleName: "", //角色名称
    remark: "", //备注
});

//弹窗显示
const showModal = ref(false);

//权限弹窗
const showPermission = ref(false);
const curRoleName = ref("");
const curRoleId = ref("");

//菜单树
const menuList = ref([]);

//表单校验
const rules = reactive({
    roleName: [
        {
            required: true,
            message: "请输入角色名称",
        },
    ],
});

//编辑还是新增
const action = ref("");

//表单的ref
const dialogForm = ref(null);
// 权限树的ref
const permissionTree = ref(null);

const actionMap = reactive({});

onMounted(() => {
    getRoleList();
    getMenuList();
});

//获取菜单列表
const getMenuList = async () => {
    try {
        let list = await proxy.$api.getMenuList();
        menuList.value = list;
        getActionMap(list);
    } catch (e) {
        throw new Error(e);
    }
};

//创建表单弹窗
const handleCreate = () => {
    showModal.value = true;
    action.value = "create";
};

//编辑表单弹窗
const handleEdit = (row) => {
    showModal.value = true;
    action.value = "edit";
    let params = {
        _id: row._id,
        roleName: row.roleName,
        remark: row.remark,
    };
    proxy.$nextTick(() => {
        Object.assign(roleForm, params);
    });
};

//获取角色列表
const getRoleList = async () => {
    try {
        let {list, page} = await proxy.$api.getRoleList({
            ...queryForm,
            ...pager,
        });
        roleList.value = list;
        pager.total = page.total;
    } catch (e) {
        throw new Error(e);
    }
};
// 表单重置
const handleReset = (form) => {
    proxy.$refs[form].resetFields();
};

//页码切换调用方法
const handleCurrentChange = (current) => {
    pager.pageNum = current;
    getRoleList();
};

// 弹框关闭
const handleClose = () => {
    showModal.value = false;
    handleReset("dialogForm");
};

//删除角色
const handleDelete = (_id) => {
    proxy
        .$confirm("是否确认删除角色", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
        .then(() => {
            const params = {
                _id,
                action: "delete",
            };
            proxy.$api.roleOperate(params).then((res) => {
                proxy.$message.success("删除成功");
                getRoleList();
            });
        })
        .catch(() => {
            console.log("取消");
        });
};

//表单确认提交
const handleSubmit = () => {
    dialogForm.value.validate((valid) => {
        if (valid) {
            const params = {
                action: action.value,
                ...roleForm,
            };
            proxy.$api.roleOperate(params).then((res) => {
                if (action.value === "create") {
                    proxy.$message.success("创建成功");
                } else {
                    proxy.$message.success("编辑成功");
                }
                handleClose();
                getRoleList();
            });
        }
    });
};

//关闭权限弹窗
const handlePermissionClose = () => {
    showPermission.value = false;
};

//打开权限弹窗
const handleOpenPermission = (row) => {
    curRoleName.value = row.roleName;
    curRoleId.value = row._id;
    showPermission.value = true;
    const {checkedKeys} = row.permissionList;
    proxy.$nextTick(() => {
        permissionTree.value.setCheckedKeys(checkedKeys);
    });
};

//权限弹窗提交
const handlePermissionSubmit = async () => {
    //选择的
    let nodes = permissionTree.value.getCheckedNodes();
    //半选中的父级
    let halfKeys = permissionTree.value.getHalfCheckedKeys();
    let checkedKeys = [];
    let parendKeys = [];
    nodes.map((node) => {
        if (!node.children) {
            checkedKeys.push(node._id);
        } else {
            parendKeys.push(node._id);
        }
    });

    let params = {
        _id: curRoleId.value,
        permissionList: {
            checkedKeys: checkedKeys,
            halfCheckedKeys: parendKeys.concat(halfKeys),
        },
    };
    let res = await proxy.$api.updatePermission(params);
    showPermission.value = false;
    proxy.$message.success("操作成功");
    getRoleList();
};

const getActionMap = (list) => {
    let actionArr = {};
    const deep = (arr) => {
        while (arr.length) {
            let item = arr.pop();
            if (item.children && item.action) {
                actionArr[item._id] = item.menuName;
            }
            if (item.children && !item.action) {
                deep(item.children);
            }
        }
    };
    deep(JSON.parse(JSON.stringify(list)));
    Object.assign(actionMap, actionArr);
};
</script>

<style lang="scss"></style>
