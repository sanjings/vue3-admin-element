<script lang="ts" setup>
  defineOptions({
    name: 'ModuleTitle'
  });

  const { bold = true, text = '' } = defineProps<{
    /**
     * 文字是否加租
     * @default true
     */
    bold?: boolean;
    /**
     * 标题
     */
    text: string;
  }>();
</script>

<template>
  <div class="module-title">
    <span :style="{ 'font-weight': bold ? 550 : 400 }">{{ text }}</span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .module-title {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 18px;

    &::before {
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 6px;
      content: '';
      background-color: $color-blue;
      border-radius: 1px;
    }

    font-size: 14px;
    color: $color-black;
  }
</style>
