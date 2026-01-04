<script setup lang="ts">
  import { useUserStore } from '@/store/user';
  import { requestLogout } from '@/services/api/user';
  import { useFullscreen } from '@vueuse/core';
  import avatarPng from '@/assets/images/avatar.png';
  import { MESSAGE_BOX_OPTION } from '@/contansts/element-plus';

  defineOptions({
    name: 'NavbarAction'
  });

  const userStore = useUserStore();

  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

  /**
   * 用户名下拉菜单选择事件
   */
  const handleCommand = async (command: string) => {
    switch (command) {
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  };

  const logout = async () => {
    await ElMessageBox.confirm('确定退出登录吗？', '提示', {
      ...MESSAGE_BOX_OPTION,
      type: 'warning'
    });
    const res = await requestLogout();
    if (res.code === 200) {
      userStore.logout();
    } else {
      ElMessage.error(res.message);
    }
  };
</script>

<template>
  <div class="navbar-action">
    <!--全屏 -->
    <div class="nav-action-item">
      <el-tooltip :content="isFullscreen ? '取消全屏' : '全屏'" effect="dark" placement="bottom">
        <el-icon @click="toggleFullScreen()" size="18" color="#999999"><FullScreen /></el-icon>
      </el-tooltip>
    </div>
    <!-- 用户信息 -->
    <el-dropdown class="nav-action-item user-info" trigger="click" @command="handleCommand">
      <div class="user-info-inner flex-center">
        <el-avatar class="user-avator" :src="avatarPng" :size="22" />
        <span class="user-name">{{ userStore.userInfo?.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
  .navbar-action {
    display: flex;
    align-items: center;

    .nav-action-item {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      height: $header-height;
      text-align: center;
      cursor: pointer;

      &:hover {
        background: rgb(0 0 0 / 10%);

        .el-icon {
          color: $color-blue;
        }
      }

      &.user-info {
        .user-info-inner {
          padding-inline: 6px;

          .user-name {
            margin-left: 6px;

            @include user-select;
          }
        }
      }
    }
  }
</style>
