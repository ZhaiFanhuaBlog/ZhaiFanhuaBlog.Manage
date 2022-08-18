import { createApp } from 'vue';
import App from './App.vue';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';
// 全局UI组件库
import naive from 'naive-ui';

const app = createApp(App);
app.use(naive).mount('#app');
