<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="user">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="user.userId" placeholder="请输入用户id"/>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="user.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" placeholder="状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="" @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection"/>
        <el-table-column v-for="item in columnList" :key="item.prop" :formatter="item.formatter"
                         :label="item.label"
                         :prop="item.prop"/>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.row)">删除</el-button>
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
    <el-dialog :before-close="handleClose" :model-value="showModel" title="新增用户">
      <el-form ref="dialogForm" :model="userForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" :disabled="action==='edit'" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userForm.userEmail" :disabled="action==='edit'" placeholder="请输入用户邮箱">
            <template #append>@email.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入用户手机号"/>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userForm.job" placeholder="请输入岗位"/>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model.number="userForm.state" placeholder="请选择状态" style="width: 100%">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select v-model="userForm.roleList" multiple placeholder="请选择用户角色" style="width: 100%">
            <el-option v-for="role in roleList" :key="role._id" :label="role.roleName"
                       :value="role._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader v-model="userForm.deptId" :options="deptList"
                       :props="{checkStrictly:true,value:'_id',label:'deptName'}" clearable
                       placeholder="请选择所属部门"
                       style="width: 100%"></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleSubmit">确定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {getCurrentInstance, onMounted, reactive, ref, toRaw} from "vue";
import utils from "../utils/utils";

const {ctx, proxy} = getCurrentInstance()
const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }
  ],
  userEmail: [
    {
      required: true,
      message: '请输入用户邮箱',
      trigger: 'blur'
    }
  ],
  mobile: [
    {
      // required: true,
      message: '请输入用户手机号',
      trigger: 'blur'
    },
    {
      pattern: /1{3-9}\d{9}/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  deptId: [
    {
      required: true,
      message: '请选择部门',
      trigger: 'blur'
    }
  ]
})
//弹窗显示对象
const showModel = ref(false)
//搜索表单
const user = reactive({})
//选中的用户列表对象
const selectionList = ref([])
//table列表数据
const tableData = ref([])
//table列头数据
const columnList = ref([
  {
    label: "用户id",
    prop: "userId"
  },
  {
    label: "用户名",
    prop: "userName"
  },
  {
    label: "用户邮箱",
    prop: "userEmail"
  },
  {
    label: "用户角色",
    prop: "role",
    formatter(roe, column, value) {
      return {0: '管理员', 1: '普通用户'}[value]
    }
  },
  {
    label: "用户状态",
    prop: "state",
    formatter(roe, column, value) {
      return {1: '在职', 2: '离职', 3: '试用期'}[value]
    }
  },
  {
    label: "注册时间",
    prop: "createTime",
    formatter(roe, column, value) {
      return utils.formatDate(new Date(value));
    }
  },
  {
    label: "最后登录时间",
    prop: "lastLoginTime",
    formatter(roe, column, value) {
      return utils.formatDate(new Date(value));
    }
  }
])
//分页数据
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
//用户新增表单
const userForm = reactive({})
//所有角色列表
const roleList = ref([])
//所有部门列表
const deptList = ref([])
//用户新增或编辑
const action = ref('add')

//获取form ref
const form = ref(null)
//获取新增表单 ref
const dialogForm = ref(null)

//dom挂载完毕
onMounted(() => {
  getUserList()
  getDeptList()
  getRoleList()
})

//获取用户列表数据
const getUserList = () => {
  const params = {...user, ...pager}
  proxy.$api.getUserList(params).then(res => {
    const {list, page} = res
    tableData.value = list
    pager.total = page.total
  }).catch(err => {
    console.log(err)
  })
}

//查询用户列表
const handleSearch = () => {
  pager.pageNum = 1
  getUserList()
}

//重置表单
const handleReset = (form) => {
  ctx.$refs[form].resetFields()
}

//页码切换调用方法
const handleCurrentChange = (current) => {
  pager.pageNum = current
  getUserList()
}

//删除用户
const handleDelete = (row) => {
  proxy.$api.userDelete({
    userIds: [row.userId]
  }).then(res => {
    if (res.nModified > 0) {
      proxy.$message.success('删除成功')
      getUserList()
    } else {
      proxy.$message.success('删除失败')
    }
  })
}

//监听表格勾选事件
const handleSelectionChange = (val) => {
  selectionList.value = val.map(item => {
    return item.userId
  })
}

//批量删除
const handlePatchDel = () => {
  if (selectionList.value.length === 0) {
    return proxy.$message.error('请选择要删除的用户')
  }
  proxy.$api.userDelete({
    userId: selectionList.value
  }).then(res => {
    proxy.$message.success('删除成功')
    getUserList()
  })
}

//用户新增
const handleCreate = () => {
  action.value = 'add'
  showModel.value = true
}

//获取部门列表
const getDeptList = () => {
  proxy.$api.getDeptList().then(res => {
    deptList.value = res
  })
}

//角色列表查询
const getRoleList = () => {
  proxy.$api.getRoleList().then(res => {
    roleList.value = res
  })
}

//用户新增弹窗关闭
const handleClose = () => {
  showModel.value = false
  handleReset('dialogForm')
}

//用户新增弹窗确认
const handleSubmit = () => {
  ctx.$refs.dialogForm.validate(valid => {
    if (valid) {
      let params = toRaw(userForm) //toRaw 转成普通对象，防止更改响应式数据
      params.userEmail += '@qq.com' //邮箱添加后缀
      params.action = action.value //判断是新增还是编辑
      proxy.$api.userSubmit(params).then(res => {
        if (action.value === 'add') {
          proxy.$message.success('用户创建成功')
        } else {
          proxy.$message.success('用户编辑成功')
        }
        handleClose('dialogForm')
        getUserList()
      })
    }
  })
}

//打开用户编辑弹窗
const handleEdit = (row) => {
  console.log(row)
  action.value = 'edit'
  showModel.value = true
  ctx.$nextTick(() => {
    //在弹窗显示完成后再赋值，弹窗的初始状态就是空，调用resetFields的方法时才能置空，
    //否则弹窗未完成就赋值，初始值就变成row里的值，关闭编辑弹窗，新增弹窗表单值会显示编辑弹窗未清空的值
    Object.assign(userForm, row)
  })
}
</script>
<style lang="scss" scoped>

</style>
