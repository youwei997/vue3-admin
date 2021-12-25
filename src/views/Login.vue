<template>
	<div class="login-wrapper">
		<div class="model">
			<el-form :model="user" status-icon :rules="rules" ref="loginFormRef">
				<div class="title">火星</div>
				<el-form-item prop="userName">
					<el-input type="text" :prefix-icon="elIcons.User" v-model="user.userName"/>
				</el-form-item>
				<el-form-item prop="userPwd">
					<el-input type="password" :prefix-icon="elIcons.Lock" v-model="user.userPwd"/>
				</el-form-item>
				<el-form-item>
					<el-button class="btn-login" type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup>
import {useRouter} from "vue-router";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {useStore} from "vuex"

//获取路由实例
const router = useRouter()
const store = useStore()

//全局属性
const {proxy} = getCurrentInstance()

//跳转home页
const goHome = () => {
	router.push({
		path: '/welcome'
	})
}

//定义用户信息
const user = reactive({
	userName: '',
	userPwd: ''
})


//定义登录表单校验
const rules = reactive({
	userName: [
		{
			required: true,
			message: '请输入用户名',
			trigger: "blur",
		}
	],
	userPwd: [
		{
			required: true,
			message: '请输入密码',
			trigger: "blur",
		}
	]
})

//获取表单的ref
const loginFormRef = ref()

//登录方法
const login = () => {
	loginFormRef.value.validate(valid => {
		proxy.$api.login(user).then(res => {
			store.commit("saveUserInfo", res)
			router.push('/welcome')
		})
	})
}
</script>
<style scoped lang="scss">
.login-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f9fcff;
	width: 100vw;
	height: 100vh;

	.model {
		width: 500px;
		padding: 20px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0px 0px 5px 3px #ccc;

		.title {
			font-size: 50px;
			line-height: 1.5;
			text-align: center;
			margin-bottom: 30px;
		}

		.btn-login {
			width: 100%;
		}
	}

}
</style>