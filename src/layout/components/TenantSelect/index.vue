<template>
  <div>
    <el-dropdown trigger="click" @command="handleSelectTenant" style="margin-top: 18px;">
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
  const tenants = userStore.tenants;
  if (!tenants || tenants.length === 0) {
    return;
  }
  queryTenants();
  const tenantCode = localStorage.getItem('tenant-code');
  if (!tenantCode) {
    return;
  }
  for (const tenant of tenants) {
    if (tenant.tenantCode === tenantCode) {
      current.value = tenant;
      break;
    }
  }
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
    localStorage.setItem('tenant-code', tenant.tenantCode)
    location.reload();
  }, 1000);
}

getCurrent();
</script>
