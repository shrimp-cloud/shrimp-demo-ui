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

    <el-dialog title="请选择图片" v-model="open" width="840px" append-to-body draggable :close-on-click-modal="false">
      <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
        <el-form-item prop="imageType">
          <el-radio-group v-model="queryParams.imageType" class="ml-4" @change="handleQuery">
            <el-radio label="" size="large">全部</el-radio>
            <el-radio v-for="dict in IMAGE_TYPE" :label="dict.value" size="large">{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div v-if="!dataList || dataList.length ===0">
        <el-empty description="无图片" />
      </div>
      <el-row v-if="dataList && dataList.length > 0" :gutter="10" class="mb8">
        <el-col :span="4" v-for="item in dataList">
          <img :src="item.imageUrl" :alt="item.imageName" style="width: 120px; height: 120px;" @click="click(item)"/>
          <span>{{item.imageName}}</span>
        </el-col>
      </el-row>

      <pagination
          v-show="total > 0"
          :total="total"
          :sizes="[12,24,48,96]"
          v-model:page="queryParams.current"
          v-model:limit="queryParams.size"
          @pagination="getList"
      />
    </el-dialog>
  </div>
</template>

<script setup name="CommonImage">
import { commonImagePage } from "@/api/common";

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
const emit = defineEmits(['update:modelValue']);
const { proxy } = getCurrentInstance();
const { IMAGE_TYPE } = proxy.useDict("IMAGE_TYPE");

const realWidth = computed(() => typeof props.width == "string" ? props.width : `${props.width}px`);
const realHeight = computed(() => typeof props.height == "string" ? props.height : `${props.height}px`);

const dataList = ref([]);
const open = ref(false);
const loading = ref(true);
const total = ref(0);
const queryParams = ref({
  current: 1,
  size: 12,
  imageType: undefined,
});
const image = ref({
  imageUrl: undefined,
  imageAlt: undefined,
});

function show() {
  open.value = true;
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
  /*
  image.value.imageUrl = val.imageUrl;
  image.value.imageAlt = val.imageName;
  */
  open.value = false;
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.current = 1;
  getList();
}

</script>

<style scoped>
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