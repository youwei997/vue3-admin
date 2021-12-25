import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as elIcons from '@element-plus/icons-vue'
import request from './utils/request'
import storage from './utils/storage'
import api from './api'
const app = createApp(App);
//全局配置
app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$api = api;
app.config.globalProperties.elIcons = elIcons;
app.use(ElementPlus).use(router).mount('#app')
