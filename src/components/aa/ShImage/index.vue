<template>
  <div>
    <el-image
      :src="props.modelValue"
      style="width: 120px; height: 120px;"
      :style="`width:${realWidth};height:${realHeight};`"
      :placeholder="props.placeholder"
      @click="getList"
    >
      <template #error>
        <div class="image-slot">
          <el-icon @click="getList"><Picture/></el-icon>
        </div>
      </template>
    </el-image>

    <el-dialog title="请选择图片" v-model="open" width="1080px">
      <el-row :gutter="20">
        <el-col :span="6">
          <div style="height: 480px; overflow-y: auto; overflow-x: hidden;">
            <el-tree
                ref="treeRef"
                class="filter-tree"
                :data="categoryOptions"
                :props="{label: 'categoryName', value: 'categoryCode', disabled: 'disabled'}"
                :render-after-expand="false"
                :expand-on-click-node="false"
                node-key="categoryCode"
                :check-strictly="true"
                default-expand-all
                @node-click="choseCategory"
            >
              <template #default="{ node, data }">
                  <span class="custom-tree-node">
                    <span>{{ data.categoryName }}</span>
                    <span v-if="data.imageCount" style="padding-left: 6px;">
                      <el-tag type="info">{{ data.imageCount }}</el-tag>
                    </span>
                  </span>
              </template>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18">
          <div style="height: 480px; overflow-y: auto; overflow-x: hidden;">
            <div v-if="!dataList || dataList.length ===0">
              <el-empty description="无图片" />
            </div>
            <el-row v-if="dataList && dataList.length > 0" :gutter="10" class="mb8">
              <el-col :span="4" v-for="item in dataList">
                <img :src="item.imageUrl" :alt="item.imageName" style="width: 120px; height: 120px;" @click="click(item)"/>
                <div>{{item.imageName}}</div>
              </el-col>
            </el-row>
            <pagination
                v-show="total > 0"
                :total="total"
                :page-sizes="[18]"
                v-model:page="queryParams.current"
                v-model:limit="queryParams.size"
                @pagination="getList"
            />
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup name="CommonImage">
import { commonImagePage } from "@/api/common";
import {imageCategoryOptionsWithimgcount} from "@/api/common";

const props = defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: "请选择图片"
  },
  width: {
    type: [Number, String],
    default: "64px"
  },
  height: {
    type: [Number, String],
    default: "64px"
  }
});

defineExpose({show})
const emit = defineEmits(['update:modelValue', "change"]);
const { proxy } = getCurrentInstance();

const realWidth = computed(() => typeof props.width == "string" ? props.width : `${props.width}px`);
const realHeight = computed(() => typeof props.height == "string" ? props.height : `${props.height}px`);

const categoryOptions = ref([]);
const dataList = ref([]);
const open = ref(false);
const loading = ref(true);
const total = ref(0);
const queryParams = ref({
  current: 1,
  size: 18,
  imageType: undefined,
});
const image = ref({
  imageUrl: undefined,
  imageAlt: undefined,
});

function show() {
  open.value = true;
  handleQuery();
}

function init() {
  getCategoryOptions();
}

function getCategoryOptions() {
  imageCategoryOptionsWithimgcount().then(res => {
    const options = [{categoryCode: '', categoryName: '全部'}];
    for (const d of res.data) {
      options.push(d);
    }
    categoryOptions.value = options;
  });
}

function choseCategory(data, node, treeNode, event) {
  queryParams.value.categoryCode = data.categoryCode;
  queryParams.value.categoryName = data.categoryName;
  handleQuery();
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.current = 1;
  getList();
}


/** 查询参数列表 */
function getList() {
  open.value = true;
  loading.value = true;
  queryParams.value.current = 1;
  commonImagePage(queryParams.value).then(res => {
    const data = res.data;
    dataList.value = data.rows;
    total.value = data.total;
  }).finally(() => {
    loading.value = false;
  });
}

/** 选择数据 */
function click(val) {
  emit("update:modelValue", val.imageUrl);
  image.value.imageUrl = val.imageUrl;
  image.value.imageAlt = val.imageName;
  emit("change", image.value);
  open.value = false;
}

init();
</script>

<style lang="scss" scoped>
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
</style>
