<template>
	<h1>Login</h1>
	<el-button @click="goHome">回首页</el-button>
</template>
<script setup>
import {useRouter} from "vue-router";
import {getCurrentInstance, onMounted} from "vue";

const router = useRouter()
const goHome = () => {
	router.push({
		path: '/welcome'
	})
}

const {proxy} = getCurrentInstance()

onMounted(() => {
	proxy.$request.get('http://127.0.0.1:4523/mock/482937/pet/1',{name:'zs'},{loading:true}).then((res)=>{
		console.log(res)
	})
})
</script>
<style scoped>
</style>