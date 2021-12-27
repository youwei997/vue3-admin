<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="user">
        <el-form-item prop="userId" label="用户id">
          <el-input v-model="user.userId" placeholder="请输入用户id"/>
        </el-form-item>
        <el-form-item prop="userName" label="用户名称">
          <el-input v-model="user.userName" placeholder="请输入用户名称"/>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="user.state" placeholder="状态">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection"/>
        <el-table-column v-for="item in columnList" :key="item.prop" :prop="item.prop" :label="item.label"/>
        <el-table-column fixed="right" label="操作">
          <template #default>
            <el-button type="text" size="small" @click="handleClick">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout="prev, pager, next" :total="pager.total"
                     :page-size="pager.pageSize"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";

const {ctx, proxy} = getCurrentInstance()
//搜索表单
const user = reactive({})
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
    label: "用户id",
    prop: "userEmail"
  },
  {
    label: "用户角色",
    prop: "role"
  },
  {
    label: "用户id",
    prop: "userId"
  },
  {
    label: "用户状态",
    prop: "state"
  },
  {
    label: "注册时间",
    prop: "createTime"
  },
  {
    label: "最后登录时间",
    prop: "lastLoginTime"
  }
])
//分页数据
const pager = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

//获取form ref
const form = ref(null)

//获取用户列表数据
const getUserList = () => {
  const params = {...user, ...pager}
  console.log(params)
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

//重置查询用户列表
const handleReset = () => {
  form.value.resetFields()
}

const handleCurrentChange = (current)=>{
  pager.pageNum = current
  getUserList()
}

onMounted(() => {
  getUserList()
})

</script>
<style scoped lang="scss">

</style>
