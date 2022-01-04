<template>
    <el-breadcrumb :separator-icon="elIcons.ArrowRight">
        <el-breadcrumb-item v-for="(item,index) in matched" :key="item.path">
            <router-link to="/" v-if="index === 0">{{ item.meta.title }}</router-link>
            <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup>
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const router = useRouter()
//需要使用computed重新包装，如果在setup直接写，无法做到切换菜单，面包屑同时更改，因为setup只执行一次
const matched = computed(() => {
//路由跳转位置层级
    return router.currentRoute.value.matched
})
</script>
<style scoped>
</style>
<!--
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index == 0">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "BreadCrumb",
  computed: {
    breadList() {
      return this.$route.matched;
    },
  },
};
</script>
-->