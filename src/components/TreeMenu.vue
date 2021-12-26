<template>
	<template v-for="menu in userMenu">
		<el-sub-menu
			v-if="
        menu.children &&
        menu.children.length > 0 &&
        menu.children[0].menuType == 1
      "
			:key="menu._id"
			:index="menu.path"
		>
			111111111111
			<template #title>
				<el-icon><Menu /></el-icon>
				<span>{{ menu.menuName }}</span>
			</template>
			<tree-menu :userMenu="menu.children" />
		</el-sub-menu>
		<el-menu-item
			v-else-if="menu.menuType == 1"
			:index="menu.path"
			:key="menu._id"
		>{{ menu.menuName }}</el-menu-item
		>
	</template>
</template>
<script setup>
//vue3写法
import {Menu} from '@element-plus/icons-vue'//手动导入图标
import {toRefs} from "vue";

//defineProps不能直接解构，会失去响应式，值无法及时更新
const props =  defineProps({
	userMenu:{
		type:Array,
		default() {
			return [];
		},
	},
})

const {userMenu} = toRefs(props)
</script>
<!--<script>
//vue2写法
import {Menu} from '@element-plus/icons-vue' //手动导入图标
export default {
	name: "TreeMenu",
	components:{
		Menu
	},
	props: {
		userMenu: {
			type: Array,
			default() {
				return [];
			},
		},
	},
};
</script>-->
<style scoped>
</style>