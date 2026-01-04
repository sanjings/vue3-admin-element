import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import { loadPlugins } from '@/plugins';
import { loadDirectives } from './directives';
import router from './router';
import '@/router/permission';
import './styles/index.scss';

const app = createApp(App);

/** 加载插件 */
loadPlugins(app);
/** 加载自定义指令 */
loadDirectives(app);

app.use(store).use(router);

router.isReady().then(() => {
  app.mount('#app');
});
