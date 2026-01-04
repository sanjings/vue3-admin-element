import { type Directive, type DirectiveBinding } from 'vue';
import { hasPerm } from '@/utils/permission';

/** 权限指令 */
export const perm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const key = binding.value || binding.arg;
    if (key) {
      if (!hasPerm(key)) {
        el.parentNode ? el.parentNode.removeChild(el) : (el.style.display = 'none');
      }
    } else {
      throw new Error(`need roles! Like v-perm="'sys:user:create'" or v-perm:sys:user:update `);
    }
  }
};
