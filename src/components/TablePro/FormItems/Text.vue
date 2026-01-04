<script setup lang="ts">
  import type { ISearchFormItem } from '../type';

  defineOptions({
    name: 'Text'
  });
  const { attrs } = defineProps<{
    attrs: ISearchFormItem['attrs'];
  }>();
  const value = defineModel<string>();
</script>

<template>
  <el-input
    v-model="value"
    v-bind="attrs"
    :placeholder="attrs?.placeholder || '请输入'"
    :clearable="attrs?.clearable ?? true"
  />
</template>
