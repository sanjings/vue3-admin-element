<script setup lang="ts">
  import { type CheckboxValueType } from 'element-plus';
  import type { ISelectAttrs } from '../type';

  defineOptions({
    name: 'Select'
  });

  const { attrs } = defineProps<{
    attrs: ISelectAttrs;
  }>();

  const value = defineModel<string | string[]>({ default: '' });

  const listData = ref(attrs?.options || []);
  const checkAll = ref(false);
  const indeterminate = ref(false);

  watch(value, (val) => {
    if (val.length === 0) {
      checkAll.value = false;
      indeterminate.value = false;
    } else if (val.length === listData.value.length) {
      checkAll.value = true;
      indeterminate.value = false;
    } else {
      indeterminate.value = true;
    }
  });

  const initOptions = async () => {
    if (attrs?.request) {
      listData.value = (await attrs.request?.()) || [];
    }
  };

  const handleCheckAll = (val: CheckboxValueType) => {
    indeterminate.value = false;
    if (val) {
      value.value = listData.value.map((_) => _.value! as string);
    } else {
      value.value = [];
    }
  };

  initOptions();
</script>

<template>
  <el-select
    v-model="value"
    v-bind="attrs"
    :empty-values="[null, undefined]"
    :value-on-clear="() => ''"
    :filterable="attrs?.filterable ?? true"
    :placeholder="attrs?.placeholder ?? '请选择'"
    :clearable="attrs?.clearable ?? true"
  >
    <template v-if="!attrs?.hideAll && attrs?.multiple" #header>
      <el-checkbox v-model="checkAll" :indeterminate="indeterminate" @change="handleCheckAll">全选</el-checkbox>
    </template>
    <el-option v-if="!attrs?.hideAll && !attrs?.multiple" label="全部" value="" />
    <el-option v-for="(option, index) in listData" :key="index" :label="option.label" :value="option.value!" />
  </el-select>
</template>
