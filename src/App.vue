<script setup lang="ts">
  import zhCn from 'element-plus/es/locale/lang/zh-cn';
</script>

<template>
  <el-config-provider :locale="zhCn" :message="{ max: 2, duration: 2500, offset: 50 }">
    <router-view />
  </el-config-provider>
</template>
