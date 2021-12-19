<template>
	<h1>主界面</h1>
	<el-button @click="goLogin">去登录</el-button>
</template>
<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const goLogin = ()=>{
	router.push({
		path:'/login'
	})
}
</script>
<style scoped>
</style>