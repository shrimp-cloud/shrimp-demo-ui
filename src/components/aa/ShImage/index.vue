<template>
  <div>
    <el-image
      :src="props.modelValue"
      style="width: 120px; height: 120px;"
      :style="`width:${realWidth};height:${realHeight};`"
      :placeholder="props.placeholder"
      @click="toImageSelect"
    >
      <template #error>
        <div class="image-slot">
          <el-icon @click="toImageSelect"><Picture/></el-icon>
        </div>
      </template>
    </el-image>

    <image-select ref="imageSelectRef" @change="change"/>
  </div>
</template>

<script setup name="CommonImage">
import ImageSelect from "./components/imageSelect";

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

const emit = defineEmits(['update:modelValue', "change"]);
const { proxy } = getCurrentInstance();

const realWidth = computed(() => typeof props.width == "string" ? props.width : `${props.width}px`);
const realHeight = computed(() => typeof props.height == "string" ? props.height : `${props.height}px`);

function toImageSelect() {
  proxy.$refs["imageSelectRef"].init();
}

/** 选择数据 */
function change(image) {
  emit("update:modelValue", image.imageUrl);
  emit("change", image);
}

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
