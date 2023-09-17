<template>
  <div id="container" style="width: 800px; height: 480px"></div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '位置',
  },
  longitude: {
    type: [Number, String],
    default: 113.324614,
  },
  latitude: {
    type: [Number, String],
    default: 23.106578,
  },
  zoom: {
    type: Number,
    default: 12,
  }
});
const initFlag = ref(false);

onMounted(() => {
  initFlag.value = true;
  getLocation();
});

watch(() => props.longitude, val => {
  if (initFlag.value) {
    getLocation();
  }
}, {
  immediate: true
});
watch(() => props.latitude, val => {
  if (initFlag.value) {
    getLocation();
  }
}, {
  immediate: true
});


function getLocation() {
  const longitude = props.longitude;
  const latitude = props.latitude
  var infoWindow;

  var map = new AMap.Map('container',{
    zoom: props.zoom, //级别
    center: [longitude, latitude], //中心点坐标
  });
  map.on('click', function () {
    if (infoWindow) {
      map.clearInfoWindow();
    }
  });
  var marker = new AMap.Marker({
    position: new AMap.LngLat(longitude, latitude),
    title: props.title
  });
  marker.on('click', function () {
    infoWindow = new AMap.InfoWindow({
      isCustom: true,  // 使用自定义窗体
      content: "<h2>"+props.title+"</h2>",
      offset: new AMap.Pixel(0, -60)
    });
    infoWindow.open(map, marker.getPosition());
  });
  map.add(marker);
}
</script>
