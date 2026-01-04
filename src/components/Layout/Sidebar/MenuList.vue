<script lang="ts" setup generic="T extends Recordable">
  defineOptions({
    name: 'MenuList'
  });

  const { listData = [] } = defineProps<{
    listData?: T[];
  }>();
</script>

<template>
  <template v-for="item in listData" :key="item.name">
    <template v-if="!item.meta?.hideInMenu">
      <el-sub-menu :index="item.path" v-if="item.children?.length">
        <template #title>
          <el-icon v-if="item.meta?.icon">
            <component :is="item.meta?.icon"></component>
          </el-icon>
          <span :style="{ marginLeft: item.meta?.icon ? 0 : '16px' }">{{ item.meta?.title }}</span>
        </template>
        <MenuList :listData="item.children" />
      </el-sub-menu>
      <el-menu-item :index="item.path" v-else>
        <el-icon v-if="item.meta?.icon">
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <template #title>
          <span :style="{ marginLeft: item.meta?.icon ? 0 : '16px' }">{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
  .el-menu-item {
    width: 100%;

    &.is-active {
      background-color: $color-blue;
    }
  }

  .el-icon {
    font-size: 16px !important;
  }
</style>
