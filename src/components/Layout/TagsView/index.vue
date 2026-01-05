<script setup lang="ts">
  import { resolve } from 'path-browserify';
  import { usePermissionStore } from '@/store/permission';
  import { useTagsViewStore } from '@/store/tagsView';
  import type { TagView } from 'types/tagview';
  import { storeToRefs } from 'pinia';
  import { type RouteRecordRaw } from 'vue-router';
  import { debounce } from 'lodash-es';

  defineOptions({
    name: 'TagsView'
  });

  const { proxy } = getCurrentInstance()!;
  const $router = useRouter();
  const $route = useRoute();
  const permissionStore = usePermissionStore();
  const tagsViewStore = useTagsViewStore();

  const { visitedViews } = storeToRefs(tagsViewStore);

  const selectedTag = ref<TagView>({
    path: '',
    fullPath: '',
    name: '',
    title: '',
    affix: false,
    keepAlive: false
  });

  const left = ref(0);
  const top = ref(0);

  watch(
    $route,
    async () => {
      await addTags();
      moveToCurrentTag();
    },
    {
      immediate: true // 初始化立即执行
    }
  );

  const contentMenuVisible = ref(false); // 右键菜单是否显示
  watch(contentMenuVisible, (value) => {
    if (value) {
      document.body.addEventListener('click', closeContentMenu);
    } else {
      document.body.removeEventListener('click', closeContentMenu);
    }
  });

  onMounted(() => {
    initTags();
  });

  const initTags = () => {
    const tags: TagView[] = filterAffixTags(permissionStore.routes);
    for (const tag of tags) {
      if (tag.name) {
        tagsViewStore.addView(tag);
      }
    }
  };

  /**
   * 过滤出需要固定的标签
   */
  const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/'): TagView[] => {
    let tags: TagView[] = [];
    routes.forEach((route: RouteRecordRaw) => {
      const tagPath = resolve(basePath, route.path);
      if (route.meta?.affix) {
        tags.push({
          path: tagPath,
          fullPath: tagPath,
          name: String(route.name),
          title: route.meta?.title || String(route.name),
          affix: route.meta?.affix,
          keepAlive: route.meta?.keepAlive
        });
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, basePath + route.path);
        if (tempTags.length >= 1) {
          tags = [...tags, ...tempTags];
        }
      }
    });
    return tags;
  };

  async function addTags() {
    if ($route.meta.title && !$route.meta.hideInTagview) {
      await tagsViewStore.addView({
        name: String($route.name),
        title: $route.meta.title,
        path: $route.path,
        fullPath: $route.fullPath,
        affix: $route.meta?.affix,
        keepAlive: $route.meta?.keepAlive,
        query: $route.query
      });
    }
  }

  /**
   * 移动到当前标签并更新标签信息
   * 使用 nextTick 确保：
   * 1. addTags() 中的 addView 操作已完成
   * 2. Vue 响应式更新已完成，visitedViews.value 已是最新状态
   * 3. DOM 更新已完成，可以安全地读取和更新标签信息
   */
  function moveToCurrentTag() {
    nextTick(() => {
      for (const tag of visitedViews.value) {
        // 如果路径相同但 fullPath 不同（如 query 参数变化），更新标签信息
        if (tag.path === $route.path && tag.fullPath !== $route.fullPath) {
          tagsViewStore.updateVisitedView({
            name: String($route.name),
            title: $route.meta.title || '',
            path: $route.path,
            fullPath: $route.fullPath,
            affix: $route.meta?.affix,
            keepAlive: $route.meta?.keepAlive,
            query: $route.query
          });
        }
      }
    });
  }

  const isAffix = (tag: TagView) => !!tag?.affix;

  const isFirstView = () => selectedTag.value?.fullPath === tagsViewStore.visitedViews?.[0]?.fullPath;

  const isLastView = () =>
    selectedTag.value?.fullPath === tagsViewStore.visitedViews?.[tagsViewStore.visitedViews?.length - 1]?.fullPath;

  const refreshSelectedTag = (view: TagView) => {
    tagsViewStore.delCachedView(view);
    const { fullPath } = view;
    nextTick(() => {
      $router.replace('/redirect' + fullPath);
    });
  };

  const closeSelectedTag = async (view: TagView) => {
    try {
      const res = await tagsViewStore.delView(view);
      if (tagsViewStore.isActive(view)) {
        tagsViewStore.toLastView(res.visitedViews, view);
      }
    } catch (error) {
      console.error('关闭标签页失败:', error);
      ElMessage.error('关闭标签页失败');
    }
  };

  const closeLeftTags = async () => {
    const res = await tagsViewStore.delLeftViews(selectedTag.value);
    if (!res.visitedViews.find((item: TagView) => item.path === $route.path)) {
      tagsViewStore.toLastView(res.visitedViews);
    }
  };

  const closeRightTags = async () => {
    const res = await tagsViewStore.delRightViews(selectedTag.value);
    if (!res.visitedViews.find((item: TagView) => item.path === $route.path)) {
      tagsViewStore.toLastView(res.visitedViews);
    }
  };

  const closeOtherTags = async () => {
    $router.push(selectedTag.value);
    await tagsViewStore.delOtherViews(selectedTag.value);
    moveToCurrentTag();
  };

  const closeAllTags = async (view: TagView) => {
    const res = await tagsViewStore.delAllViews();
    tagsViewStore.toLastView(res.visitedViews, view);
  };

  /**
   * 打开右键菜单
   */
  const openContentMenu = (tag: TagView, e: MouseEvent) => {
    const menuMinWidth = 105;
    const offsetLeft = proxy?.$el.getBoundingClientRect().left;
    const offsetWidth = proxy?.$el.offsetWidth;
    const maxLeft = offsetWidth - menuMinWidth;
    const l = e.clientX - offsetLeft + 15;

    if (l > maxLeft) {
      left.value = maxLeft;
    } else {
      left.value = l;
    }

    top.value = e.clientY;

    contentMenuVisible.value = true;
    selectedTag.value = tag;
  };

  /**
   * 关闭右键菜单
   */
  const closeContentMenu = () => {
    contentMenuVisible.value = false;
  };

  /**
   * 滚动事件
   */
  const handleScroll = debounce(() => {
    closeContentMenu();
  }, 300);
</script>

<template>
  <div v-if="visitedViews?.length" class="tags-container">
    <el-scrollbar class="scroll-container" :vertical="false" @wheel.prevent="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.fullPath"
        :class="'tags-item ' + (tagsViewStore.isActive(tag) ? 'active' : '')"
        :to="{ path: tag.path, query: tag.query }"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openContentMenu(tag, $event)"
      >
        {{ tag.title }}
        <el-icon class="close-icon" :size="12" v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)">
          <Close />
        </el-icon>
      </router-link>
    </el-scrollbar>

    <!-- tag标签操作菜单 -->
    <ul v-show="contentMenuVisible" class="contextmenu" :style="{ left: left + 'px', top: top + 'px' }">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOtherTags">关闭其它</li>
      <li v-if="!isFirstView()" @click="closeLeftTags()">关闭左侧</li>
      <li v-if="!isLastView()" @click="closeRightTags()">关闭右侧</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .tags-container {
    flex-shrink: 0;
    width: 100%;
    height: 34px;
    background-color: var(--el-bg-color);
    border: 1px solid var(--el-border-color-light);
    box-shadow: 0 1px 1px var(--el-box-shadow-light);

    .tags-item {
      display: inline-block;
      padding: 3px 8px;
      margin: 4px 0 0 5px;
      font-size: 12px;
      cursor: pointer;
      border: 1px solid var(--el-border-color-light);
      border-radius: 2px;

      &:hover {
        color: var(--el-color-primary);
      }

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      .close-icon {
        border-radius: 50%;
        transform: translateY(1px);

        &:hover {
          color: #ffffff;
          background-color: var(--el-color-primary);
        }
      }

      &.active {
        color: #ffffff;
        background-color: var(--el-color-primary);

        &::before {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin-right: 5px;
          content: '';
          background: #ffffff;
          border-radius: 50%;
        }

        .close-icon:hover {
          color: var(--el-color-primary);
          background-color: var(--el-fill-color-light);
        }
      }
    }
  }

  .scroll-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;

    .el-scrollbar__bar {
      bottom: 0;
    }

    .el-scrollbar__wrap {
      height: 49px;
    }
  }

  .contextmenu {
    position: absolute;
    z-index: 99;
    font-size: 12px;
    background: var(--el-bg-color-overlay);
    border-radius: 4px;
    box-shadow: var(--el-box-shadow-light);

    li {
      padding: 8px 16px;
      cursor: pointer;

      &:hover {
        background: var(--el-fill-color-light);
      }
    }
  }
</style>
