<template>
    <div class="basic-layout">
        <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
            <!-- 系统LOGO -->
            <div class="logo">
                <img src="./../assets/logo.png" alt=""/> <span>Manager</span>
            </div>
            <!-- 导航菜单 -->
            <el-menu
                    :default-openeds="['/system']"
                    :default-active="activeMenu"
                    background-color="#001529"
                    text-color="#fff"
                    router
                    :collapse="isCollapse"
                    class="nav-menu"
            >
                <tree-menu :userMenu="userMenu"/>
            </el-menu>
        </div>
        <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
            <div class="nav-top">
                <div class="nav-left">
                    <div class="menu-fold" @click="toggle">
                        <!--<i class="el-icon-s-fold"></i>-->
                        <el-icon>
                            <Fold></Fold>
                        </el-icon>
                    </div>
                    <div class="bread">
                        <BreadCrumb/>
                    </div>
                </div>
                <div class="user-info">
                    <el-badge
                            :is-dot="noticeCount > 0 ? true : false"
                            class="notice"
                            type="danger"
                    >
                        <el-icon>
                            <Bell></Bell>
                        </el-icon>
                    </el-badge>
                    <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <i class="el-icon--right"></i>
            </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="email"
                                >邮箱：{{ userInfo.userEmail }}
                                </el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import BreadCrumb from "@/components/BreadCrumb.vue";
// import TreeMenu from '../components/TreeMenu.vue'
import TreeMenu from "@/components/TreeMenu.vue";
import {Fold, Bell} from "@element-plus/icons-vue"; //手动导入图标

import {
    computed,
    ref,
    getCurrentInstance,
    onMounted,
    reactive,
    toRefs,
    provide,
} from "vue";

const {proxy} = getCurrentInstance();

import {useStore} from "vuex";

const store = useStore();

import {useRouter} from "vue-router";

const router = useRouter();

//获取用户信息
// const userInfo = computed(()=>store.state.userInfo)
const userInfo = store.state.userInfo;

//切换侧边菜单
const isCollapse = ref(false);
//消息推送
const noticeCount = ref(0);
//菜单列表
const userMenu = ref([]);
// userMenu.value = [111234, 266, 273]
//切换侧边菜单
const toggle = () => {
    isCollapse.value = !isCollapse.value;
};

//当前选中侧边菜单
const activeMenu = router.currentRoute.value.path;

//判断如果是点击邮箱就什么都不做，如果是点击Logout，就退出
const handleLogout = (key) => {
    if (key === "email") return;
    store.commit("saveUserInfo", "");
    userInfo.value = null;
    router.push("/login");
};

//获取通知数
const getNoticeCount = async () => {
    try {
        const count = await proxy.$api.noticeCount();
        noticeCount.value = count;
    } catch (error) {
        console.log(error);
    }
};

//获取侧边菜单
const getMenuList = async () => {
    try {
        const list = await proxy.$api.getMenuList();
        userMenu.value = list;
    } catch (error) {
        console.log(error);
    }
};

provide("getMenuListHome", getMenuList)

onMounted(() => {
    getNoticeCount();
    getMenuList();
});
</script>
<style lang="scss">
.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;

    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;

      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }

    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }

    // 合并
    &.fold {
      width: 64px;
    }

    // 展开
    &.unfold {
      width: 200px;
    }
  }

  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }

    // 展开
    &.unfold {
      margin-left: 200px;
    }

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .nav-left {
        display: flex;
        align-items: center;

        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }

      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }

        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }

    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);

      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
