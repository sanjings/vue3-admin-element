<script setup lang="ts">
  import Header from './Header/index.vue';
  import Sidebar from './Sidebar/index.vue';
  import TagsView from './TagsView/index.vue';
  import Main from './Main/index.vue';

  defineOptions({
    name: 'Layout'
  });
</script>

<template>
  <div class="layout-wrapper flex-row">
    <Sidebar />
    <div class="layout-wrapper--inner flex-1 flex-col">
      <Header />
      <TagsView />
      <Main />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout-wrapper {
    width: 100%;
    height: 100%;
    background-color: $bg-color-gray;

    &--inner {
      position: relative;
    }
  }
</style>
