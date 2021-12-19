<template>
	<h1>Login</h1>
	<el-button @click="goHome">回首页</el-button>
</template>
<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
const goHome = ()=>{
	router.push({
		path:'/welcome'
	})
}
</script>
<style scoped>
</style>