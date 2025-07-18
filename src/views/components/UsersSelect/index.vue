<template>
  <el-dialog title="用户选择器" v-model="open" width="1080px">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card class="box-card">
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
                  <el-button link type="primary" icon="Pointer" :disabled="row.checked" @click="handleCheck(row)">选择</el-button>
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
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>已选择的用户(最多{{props.limit}}人)</span>
            </div>
          </template>
          <el-form :inline="true" label-width="68px">
            <el-form-item style="float: right;">
              <el-button type="primary" icon="Select" @click="handleSubmit">确定</el-button>
            </el-form-item>
          </el-form>
          <el-table height="420" :data="selecteds" size="small">
            <el-table-column label="用户名" prop="username" min-width="100"/>
            <el-table-column label="姓名 " prop="nickname" min-width="100"/>
            <el-table-column label="操作" fixed='right' width="78">
              <template #default="{row}">
                <el-button link type="primary" icon="Pointer" @click="handleUnCheck(row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup name="UsersSelect">
import {userOptions} from "@/api/cas";
import { ElTable } from 'element-plus'

const props = defineProps({
  limit: {
    type: Number,
    default: 1,
  },
});

defineExpose({init})
const { proxy } = getCurrentInstance();
const { BOOLEAN, GENDER } = proxy.useDict("BOOLEAN", "GENDER");
const emit = defineEmits(['select']);
const open = ref(false);
const dataList = ref([]);
const total = ref(0);
const loading = ref(true);
const selecteds = ref([]);

const queryParams = ref({
  username: undefined,
  nickname: undefined,
});

function init() {
  dataList.value = [];
  selecteds.value = [];
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
  const selectCount = selecteds.value.length;
  if (selectCount >= props.limit) {
    proxy.$modal.msgWarning("最多可选择" + props.limit + "人");
    return;
  }

  selecteds.value.push(row);
  disableCheckeds();
}

function handleUnCheck(row) {
  const newArr = [];
  for (const s of selecteds.value) {
    if (s.username !== row.username) {
      newArr.push(s);
    }
  }
  selecteds.value = newArr;
  disableCheckeds();
}

function disableCheckeds() {
  for (const d of dataList.value) {
    d.checked = false;
    for (const s of selecteds.value) {
      if (s.username === d.username) {
        d.checked = true;
        break;
      }
    }
  }
}

function handleSubmit() {
  const users = [];
  for (const s of selecteds.value) {
    users.push({
      username: s.username,
      nickname: s.nickname
    })
  }
  emit("select", users);
  open.value = false;
}

</script>

<style>
.el-card__body {
  padding: 12px 6px 12px 6px !important;
}
</style>
