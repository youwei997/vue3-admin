
<template>
	<router-view></router-view>
</template>
<script setup>
import {getCurrentInstance, onMounted} from "vue";

const {proxy} = getCurrentInstance()

onMounted(()=>{
	proxy.$storage.setItem('userInfo',{name:'zs',age:'15'})
	console.log(proxy.$storage.getItem('userInfo'))
	proxy.$storage.clearAll()
})
</script>

<style>
</style>
