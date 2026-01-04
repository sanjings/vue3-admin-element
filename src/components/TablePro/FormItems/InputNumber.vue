<script setup lang="ts">
  import type { ISearchFormItem } from '../type';

  defineOptions({
    name: 'InputNumber'
  });
  const { attrs } = defineProps<{
    attrs: ISearchFormItem['attrs'];
  }>();
  const value = defineModel<number>();
</script>

<template>
  <el-input-number v-model="value" v-bind="attrs" :placeholder="attrs?.placeholder || '请输入'" class="input-number">
    <template #decrease-icon>
      <el-icon>
        <Minus />
      </el-icon>
    </template>
    <template #increase-icon>
      <el-icon>
        <Plus />
      </el-icon>
    </template>
  </el-input-number>
</template>

<style lang="scss" scoped>
  .input-number {
    width: 100%;

    :deep(.el-input__inner) {
      text-align: left;
    }
  }
</style>
