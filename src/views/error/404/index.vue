<script setup lang="ts">
  import errorImg from '@/assets/images/error/404.png';

  defineOptions({
    name: '/error/404'
  });

  const $router = useRouter();
</script>

<template>
  <div class="flex-center" style="height: 100%">
    <el-result title="404" sub-title="找不到当前页面，请检查网址～" style="margin-top: -100px">
      <template #icon>
        <el-image :src="errorImg" />
      </template>
      <template #extra>
        <el-button type="primary" @click="$router.replace('/')">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>
