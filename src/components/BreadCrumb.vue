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

const router = useRouter()

//路由跳转位置层级
const matched = router.currentRoute.value.matched
</script>
<style scoped>
</style>