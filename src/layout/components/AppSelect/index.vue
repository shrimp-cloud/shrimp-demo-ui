<template>
  <div v-if="allApps && allApps.length > 1">
    <el-dropdown trigger="click" @command="handleSelectApp" style="margin-top: 10px;">
      <span class="el-dropdown-link" style="padding-right: 12px;">
        {{current.displayName}}
        <el-icon><arrow-down-bold /></el-icon>
      </span>
      <template #dropdown>
        <el-input v-model="form.keyword" clearable @input="queryApps" placeholder="搜索应用"/>
        <el-dropdown-menu>
          <el-dropdown-item
              v-for="(item, index) of filtedApps"
              :key="index"
              :disabled="appCode === item.appCode"
              :command="item">
            {{ item.displayName}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import useUserStore from '@/store/modules/user';
import {appCode} from '~/env';

const { proxy } = getCurrentInstance();
const userStore = useUserStore()
const allApps = ref([]);
const current = ref({});
const filtedApps = ref([]);
const form = ref({})

// 获取当前 app
function getCurrent() {
  let times = 12;
  const interval = setInterval(() => {
    times --;
    if (times <= 0) {
      clearInterval(interval);
      return;
    }
    queryApps();
    const apps = filtedApps.value;
    if (apps.length > 0) {
      clearInterval(interval);
      for (const app of apps) {
        if (app.appCode === appCode) {
          current.value = app;
          break;
        }
      }
    }
  }, 500);
}

// 通过用户的查询条件，展示被搜索的 app
function queryApps() {
  const apps = userStore.apps;
  allApps.value = apps;
  const keyword = form.value.keyword;
  const tmps = [];
  for (const app of apps) {
    if (!keyword || app.displayName.indexOf(keyword) > -1) {
      tmps.push(app);
    }
  }
  filtedApps.value = tmps;
}

// app 跳转
function handleSelectApp(app) {
  proxy.$modal.loading("正在使用新窗口打开 " + app.displayName + "，请稍候...");
  setTimeout(() => {
    proxy.$modal.closeLoading();
    window.open(app.domain);
  }, 1000);
}

getCurrent();
</script>
