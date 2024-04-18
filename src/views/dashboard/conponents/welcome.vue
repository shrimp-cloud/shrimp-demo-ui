<template>
  <el-card class="update-log">
    <div class="body" style="display: flex">
      <img :src="userStore.avatar" class="user-avatar" />
      <div>
        <div>
          <span style="font-size: 12px;">欢迎您,  </span>
          <span style="font-size: 24px;">{{userStore.nickname}}</span>
        </div>
        <div style="font-size: 16px;">记忆滞后太久，会退色，也会更鲜明</div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.user-avatar {
  cursor: pointer;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-right: 12px;
}
</style>
