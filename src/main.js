import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './utils/request'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
//全局配置
app.config.globalProperties.$http=axios;
app.use(ElementPlus).use(router).mount('#app')
