<script setup lang="ts">
  import type { ISearchFormItem } from '../type';

  defineOptions({
    name: 'NumberRange'
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
  <div class="number-range">
    <el-input-number
      v-model="values[0]"
      v-bind="attrs"
      :max="values[1] ?? Infinity"
      placeholder="最小值"
      controls-position="right"
      class="input-number"
      @change="() => transform?.(values, params)"
    >
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
    <span style="margin-inline: 5px">-</span>
    <el-input-number
      v-model="values[1]"
      v-bind="attrs"
      :min="values[0] ?? -Infinity"
      placeholder="最大值"
      controls-position="right"
      class="input-number"
      @change="() => transform?.(values, params)"
    >
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
  </div>
</template>

<style lang="scss" scoped>
  .number-range {
    display: flex;
    align-items: center;
    width: 100%;

    .input-number {
      flex: 1;

      :deep(.el-input__inner) {
        text-align: left;
      }
    }
  }
</style>
