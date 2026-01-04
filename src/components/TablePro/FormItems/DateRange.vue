template
<script setup lang="ts">
  import { DEFAULT_DATE_RANGE_TIME, DATE_RANGE_SHORTCUTS } from '@/contansts/element-plus';
  import type { ISearchFormItem, IDateAttrs } from '../type';

  defineOptions({
    name: 'DateRange'
  });
  const { attrs, params, transform } = defineProps<{
    params: Recordable;
    attrs: IDateAttrs;
    transform: ISearchFormItem['transform'];
  }>();

  const date = defineModel({ default: [] });
</script>

<template>
  <el-date-picker
    v-model="date"
    v-bind="attrs"
    style="width: 100%"
    type="daterange"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    :value-format="attrs?.valueFormat ?? 'YYYY-MM-DD HH:mm:ss'"
    :shortcuts="DATE_RANGE_SHORTCUTS"
    :default-time="DEFAULT_DATE_RANGE_TIME"
    :editable="attrs?.editable ?? true"
    :clearable="attrs?.clearable ?? true"
    @change="(dateArr: [string, string] | null) => transform?.(dateArr, params)"
  />
</template>
