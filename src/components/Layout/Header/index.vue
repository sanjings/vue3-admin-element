<script setup lang="ts">
  import { useAppStore } from '@/store/app';
  defineOptions({
    name: 'Header'
  });

  const appStore = useAppStore();
</script>

<template>
  <header class="header">
    <div class="flex-row-c">
      <el-icon class="collapse-icon" size="18" color="#999999" @click="appStore.toggleSidebar()">
        <Expand v-show="appStore.sidebar.isCollapse" />
        <Fold v-show="!appStore.sidebar.isCollapse" />
      </el-icon>
      <Breadcrumb />
    </div>
    <NavbarAction />
  </header>
</template>

<style scoped lang="scss">
  .header {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: $header-height;
    padding-inline: 15px;
    background-color: #ffffff;

    .collapse-icon {
      margin-right: 15px;
      cursor: pointer;
      transition: transform 0.3s;

      &:hover {
        color: $color-blue;
        transform: scale(1.2);
      }
    }
  }
</style>
