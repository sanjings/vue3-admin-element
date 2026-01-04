<script setup lang="ts">
  defineOptions({
    name: 'CopyBtn',
    inheritAttrs: false
  });

  const props = defineProps<{
    /**
     * 需要复制的文字内容
     */
    text: string;
    /**
     * style样式
     */
    style?: Object;
  }>();

  function handleClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // 使用 Clipboard API
      navigator.clipboard
        .writeText(props.text)
        .then(() => {
          ElMessage.success('复制成功!');
        })
        .catch((error) => {
          ElMessage.warning('复制失败!');
          console.log('[CopyBtn] 复制失败!', error);
        });
    } else {
      // 兼容性处理
      const input = document.createElement('input');
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      input.setAttribute('value', props.text);
      document.body.appendChild(input);
      input.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          ElMessage.success('复制成功!');
        } else {
          ElMessage.warning('复制失败!');
        }
      } catch (err) {
        ElMessage.error('复制失败!.');
        console.log('[CopyBtn] 复制失败!.', err);
      } finally {
        document.body.removeChild(input);
      }
    }
  }
</script>

<template>
  <Button link :style="{ ...style, cursor: 'copy' }" @click="handleClipboard()">
    <slot>
      <el-icon><DocumentCopy color="var(--el-color-primary)" /></el-icon>
    </slot>
  </Button>
</template>
