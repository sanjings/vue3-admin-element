<script lang="ts" setup>
  import { type CascaderValue } from 'element-plus';
  import type { ISearchFormItem, ICascaderAttrs } from '../type';

  defineOptions({
    name: 'Cascader'
  });

  const { params, attrs, transform } = defineProps<{
    params: Recordable;
    attrs?: ICascaderAttrs;
    transform: ISearchFormItem['transform'];
  }>();

  const value = defineModel<CascaderValue>({ default: [] });

  const cascaderRef = useTemplateRef('cascader');
  const listData = ref(attrs?.options || []);

  const initOptions = async () => {
    if (attrs?.request) {
      listData.value = (await attrs.request?.()) || [];
    }
  };

  const handleChange = () => {
    const checkedNodes = cascaderRef.value?.getCheckedNodes(!attrs?.checkStrictly);
    const checkedData = checkedNodes?.map?.((item) =>
      item.pathNodes?.map?.((item) => ({ label: item.label, value: item.value }))
    );
    transform?.(attrs?.multiple ? checkedData : checkedData?.[0], params);
  };

  initOptions();
</script>

<template>
  <el-cascader
    ref="cascader"
    v-bind="attrs"
    v-model="value"
    style="width: 100%"
    :options="listData"
    :props="{
      multiple: attrs?.multiple,
      emitPath: attrs?.emitPath ?? true,
      checkStrictly: attrs?.checkStrictly,
      value: attrs?.value || 'value',
      label: attrs?.label || 'label',
      children: attrs?.children || 'children'
    }"
    :separator="attrs?.separator ?? '/'"
    :show-all-levels="attrs?.showAllLevels ?? true"
    :filterable="attrs?.filterable ?? true"
    :placeholder="attrs?.placeholder ?? '请选择'"
    :clearable="attrs?.clearable ?? true"
    :disabled="attrs?.disabled"
    :collapse-tags="attrs?.collapseTags"
    @change="handleChange"
  />
</template>
