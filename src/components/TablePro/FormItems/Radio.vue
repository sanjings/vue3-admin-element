<script setup lang="ts">
  import type { IRadioAttrs } from '../type';

  defineOptions({
    name: 'Radio'
  });

  const { attrs } = defineProps<{
    attrs: IRadioAttrs;
  }>();

  const value = defineModel<string | number | boolean | undefined>();
</script>

<template>
  <el-radio-group v-model="value">
    <el-radio v-for="(item, index) of attrs?.options || []" :key="index" :value="item.value">{{ item.label }}</el-radio>
  </el-radio-group>
</template>
