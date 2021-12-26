<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form>
        <el-form-item>
          <el-input v-model="userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item>
          <el-select>
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
		 <el-form-item>
          <el-button type="">查询</el-button>
          <el-button type="">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "User",
};
</script>
<style scoped lang="scss"></style>
