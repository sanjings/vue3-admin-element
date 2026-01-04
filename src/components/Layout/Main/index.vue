<script setup lang="ts">
  import { useTagsViewStore } from '@/store/tagsView';

  defineOptions({
    name: 'Main'
  });

  const cachedViews = computed(() => useTagsViewStore().cachedViews); // 缓存页面集合
</script>

<template>
  <main class="layout-main">
    <router-view v-slot="{ Component, route }">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </main>
</template>

<style lang="scss" scoped>
  .layout-main {
    width: 100%;
    height: 100%;
    padding: 15px;
    overflow: auto;
  }
</style>
