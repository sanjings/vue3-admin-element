<script setup lang="ts">
  import type { ISearchFormItem } from '../type';

  defineOptions({
    name: 'SelectText'
  });
  const { params, attrs, transform } = defineProps<{
    params: Recordable;
    attrs: ISearchFormItem['attrs'];
    transform: ISearchFormItem['transform'];
  }>();
  const values = defineModel({
    default: []
  });
</script>

<template>
  <div class="text-wrapper">
    <el-select
      v-model="values[0]"
      filterable
      placeholder="请选择"
      :clearable="false"
      style="flex-basis: 40%"
      @change="() => transform?.(values, params)"
    >
      <el-option v-for="(option, index) in attrs?.options" :key="index" :label="option.label" :value="option.value" />
    </el-select>
    <el-input
      v-model="values[1]"
      v-bind="attrs"
      :placeholder="attrs?.placeholder || '请输入'"
      :clearable="attrs?.clearable ?? true"
      style="flex: 1"
      @change="() => transform?.(values, params)"
    />
  </div>
</template>

<style lang="scss" scoped>
  .text-wrapper {
    display: inline-flex;
    width: 100%;
  }
</style>
