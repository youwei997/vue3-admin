<template>
	<div class="login-wrapper">
		<div class="model">
			<el-form>
				<div class="title">火星</div>
				<el-form-item>
					<el-input type="text" :prefix-icon="elIcons.User"/>
				</el-form-item>
				<el-form-item>
					<el-input type="password"  :prefix-icon="elIcons.Lock" />
				</el-form-item>
				<el-form-item>
					<el-button class="btn-login" type="primary">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
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
	console.log(proxy.elIcons)
	// proxy.$request.get('https://api.thecatapi.com/v1/images/search?limit=1',{name:'zs'},{loading:true}).then((res)=>{
	// 	console.log(res)
	// })
})
</script>
<style scoped lang="scss">
.login-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f9fcff;
	width: 100vw;
	height: 100vh;
	.model{
		width: 500px;
		padding: 20px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0px 0px 5px 3px #ccc;
		.title{
			font-size: 50px;
			line-height: 1.5;
			text-align: center;
			margin-bottom: 30px;
		}
		.btn-login{
			width: 100%;
		}
	}

}
</style>