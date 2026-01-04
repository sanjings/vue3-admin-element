<script setup lang="ts">
  defineOptions({
    name: 'Breadcrumb'
  });

  const $router = useRouter();

  const list = computed(() => $router?.currentRoute?.value?.matched?.filter((item) => item.name !== '/'));
</script>

<template>
  <el-breadcrumb class="breadcrumb flex-row-c" separator="/">
    <el-breadcrumb-item v-for="item of list">
      {{ item.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
  .breadcrumb {
    :deep(.el-breadcrumb__item) {
      .el-breadcrumb__inner {
        color: #999999;
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: $color-black;
        }
      }
    }
  }
</style>
