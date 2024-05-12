<template>
  <div>
    <el-dropdown trigger="click" @command="handleSelectTenant" style="margin-top: 10px;">
      <span class="el-dropdown-link" style="padding-right: 12px;">
        {{current.displayName}}
        <el-icon><arrow-down-bold /></el-icon>
      </span>
      <template #dropdown>
        <el-input v-model="form.keyword" clearable @input="form" placeholder="搜索租户"/>
        <el-dropdown-menu>
          <el-dropdown-item
              v-for="(item, index) of filtedTenants"
              :key="index"
              :disabled="current.tenantCode === item.tenantCode"
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

const { proxy } = getCurrentInstance();
const userStore = useUserStore()
const current = ref({});
const filtedTenants = ref([]);
const form = ref({})

function getCurrent() {
  const tenantCode = localStorage.getItem('tenant-code');
  let times = 12;
  const interval = setInterval(() => {
    times --;
    if (times <= 0) {
      clearInterval(interval);
      return;
    }
    queryTenants();
    const tenants = filtedTenants.value;
    if (tenants.length > 0) {
      clearInterval(interval);
      if (tenantCode) {
        for (const tenant of tenants) {
          if (tenant.tenantCode === tenantCode) {
            current.value = tenant;
            break;
          }
        }
      } else {
        current.value = tenants[0];
        localStorage.setItem('tenant-code', current.value.tenantCode);
      }
    }
  }, 500);
}

function queryTenants() {
  const tenants = userStore.tenants;
  const keyword = form.value.keyword;
  const tmps = [];
  for (const tenant of tenants) {
    if (!keyword || tenant.displayName.indexOf(keyword) > -1) {
      tmps.push(tenant);
    }
  }
  filtedTenants.value = tmps;
}

function handleSelectTenant(tenant) {
  proxy.$modal.loading("正在刷新 " + tenant.displayName + "，请稍候...");
  setTimeout(() => {
    proxy.$modal.closeLoading();
    localStorage.setItem('tenant-code', tenant.tenantCode);
    location.reload();
  }, 1000);
}

getCurrent();
</script>
