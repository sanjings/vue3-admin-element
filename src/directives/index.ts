import { type App } from 'vue';
import { perm } from './permission';

/** 挂载自定义指令 */
export function loadDirectives(app: App<Element>) {
  app.directive('perm', perm);
}
