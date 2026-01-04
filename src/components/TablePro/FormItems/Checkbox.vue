<script setup lang="ts">
  import type { ICheckboxAttrs, ISearchFormItem } from '../type';

  defineOptions({
    name: 'Checkbox'
  });

  const { params, attrs, transform } = defineProps<{
    params: Recordable;
    attrs: ICheckboxAttrs;
    transform: ISearchFormItem['transform'];
  }>();

  const value = defineModel<Array<string | number>>({ default: [] });
</script>

<template>
  <el-checkbox-group v-model="value" @change="() => transform?.(value, params)">
    <el-checkbox v-for="(item, index) of attrs?.options || []" :key="index" :label="item.label" :value="item.value" />
  </el-checkbox-group>
</template>
