<template>
  <el-input placeholder="请选择 位置" clearable style="width: 400px" v-model="label" @click="openDialog" @clear="clear">
    <template #append>
      <el-button icon="Search" @click="openDialog"></el-button>
    </template>
  </el-input>

  <el-dialog :title="title" v-model="open" width="840px" @opened="getLocation">
    <div id="container" style="width: 800px; height: 480px"></div>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  value: [String],
  longitude: {
    type: Number,
    default: 113.324614,
  },
  latitude: {
    type: Number,
    default: 23.106578,
  },
  zoom: {
    type: Number,
    default: 12,
  }
});

const emit = defineEmits(['change']);
const open = ref(false);
const title = ref("位置选择");
const label = ref("");

const data = reactive({
  location: {
    longitude: undefined,
    latitude: undefined,
  },
});
const { location } = toRefs(data);

watch(() => props.value, val => {
  label.value = props.value;
}, {
  immediate: true
});

function openDialog() {
  open.value = true;
}

function getLocation() {
  let longitude = props.longitude;
  let latitude = props.latitude;
  var map = new AMap.Map('container' ,{
    zoom: props.zoom, //级别
    center: [longitude, latitude], //中心点坐标
  });
  map.on('click', function (e) {
    label.value = e.lnglat.getLng()+','+e.lnglat.getLat();
    location.value.longitude = e.lnglat.getLng();
    location.value.latitude = e.lnglat.getLat();
    change();
    closeDialog();
  });
}

function closeDialog() {
  open.value = false;
}

function clear() {
  label.value = undefined;
  location.value.longitude = undefined;
  location.value.latitude = undefined;
  change();
}


function change() {
  emit("change", location.value);
}
</script>
