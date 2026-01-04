<script setup lang="ts">
  const { params, query } = useRoute();
  const $router = useRouter();

  const { path } = params;

  $router.replace({ path: '/' + path, query });
</script>

<template>
  <div />
</template>
