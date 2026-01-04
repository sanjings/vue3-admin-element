<script lang="ts" setup>
  import { VideoPlayer as Player } from '@videojs-player/vue';
  import 'video.js/dist/video-js.css';

  defineOptions({
    name: 'VideoPlayer'
  });

  const { url, autoplay = true } = defineProps<{
    /**
     * 视频url
     */
    url: string;
    /**
     * 是否自动播放
     * @default true
     */
    autoplay?: boolean;
  }>();

  const visible = defineModel<boolean>();
</script>

<template>
  <Dialog v-model="visible" title="视频播放" class="video-player-dlg" width="600px" center :show-footer="false">
    <Player :src="url" controls :width="600" :autoplay="autoplay" />
  </Dialog>
</template>

<style lang="scss">
  .video-player-dlg {
    .el-dialog__body {
      padding: 0 !important;
    }
  }
</style>
