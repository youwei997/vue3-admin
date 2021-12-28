import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as elIcons from '@element-plus/icons-vue'
// import request from './utils/request'
// import axios from 'axios'
import storage from './utils/storage'
import store from './store'
import api from './api'
const app = createApp(App);

//全局配置
// app.provide('axios',axios) //使用provide，子孙组件都可以使用inject获取到
// app.config.globalProperties.$request = request; //使用getCurrentInstance可以取到
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$api = api;
app.config.globalProperties.elIcons = elIcons;
app.use(ElementPlus,{
    size:'small'
}).use(store).use(router).mount('#app')
