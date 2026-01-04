<script setup lang="ts">
  import type { IDateAttrs } from '../type';

  defineOptions({
    name: 'DatePicker'
  });
  const { attrs } = defineProps<{
    attrs: IDateAttrs;
  }>();
  const value = defineModel<string | number | Date>();
</script>

<template>
  <el-date-picker
    v-model="value"
    v-bind="attrs"
    :value-format="attrs?.valueFormat ?? 'YYYY-MM-DD'"
    :placeholder="attrs?.placeholder || '请选择'"
    :clearable="attrs?.clearable ?? true"
    :editable="attrs?.editable ?? true"
    style="width: 100%"
  />
</template>
