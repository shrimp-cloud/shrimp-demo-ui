<template>
  <el-dialog title="用户选择器" v-model="open" width="1080px">
    <template #header>
      <div class="card-header">
        <span>请选择用户</span>
      </div>
    </template>
    <div style="position: relative;">
      <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
        <el-form-item prop="username">
          <el-input v-model="queryParams.username" placeholder="用户名" clearable style="width: 160px" @keyup.enter="handleQuery"/>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="queryParams.nickname" placeholder="姓名 " clearable style="width: 160px" @keyup.enter="handleQuery"/>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" height="380" :data="dataList" size="small">
        <el-table-column label="用户名" prop="username" min-width="100"/>
        <el-table-column label="姓名 " prop="nickname" min-width="100"/>
        <el-table-column label="性别" prop="gender" width="80">
          <template #default="{row}"><dict-tag :options="GENDER" :value="row.gender" /></template>
        </el-table-column>
        <el-table-column label="生效" prop="userStatus" width="60">
          <template #default="{row}"><dict-tag :options="BOOLEAN" :value="row.userStatus" /></template>
        </el-table-column>
        <el-table-column label="操作" fixed='right' width="78">
          <template #default="{row}">
            <el-button link type="primary" icon="Pointer" @click="handleCheck(row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.current"
          v-model:limit="queryParams.size"
          @pagination="getList"
      />
    </div>
  </el-dialog>
</template>

<script setup name="UserSelect">
import {userOptions} from "@/api/cas";
import { ElTable } from 'element-plus'

defineExpose({init})
const { proxy } = getCurrentInstance();
const { BOOLEAN, GENDER } = proxy.useDict("BOOLEAN", "GENDER");
const emit = defineEmits(['select']);
const open = ref(false);
const dataList = ref([]);
const total = ref(0);
const loading = ref(true);

const queryParams = ref({
  username: undefined,
  nickname: undefined,
});

function init() {
  dataList.value = [];
  getList();
}

function getList() {
  loading.value = true;
  open.value = true;
  userOptions(queryParams.value).then(res => {
    const data = res.data;
    dataList.value = data.rows;
    total.value = data.total;
  }).finally(() => {
    loading.value = false;
  });
}
function handleQuery() {
  getList();
}

function handleCheck(row) {
  const user = {
    userCode: row.userCode,
    username: row.username,
    nickname: row.nickname
  }
  // 用户的更多信息
  emit("select", user);
  open.value = false;
}

</script>

