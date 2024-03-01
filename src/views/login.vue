<template>
  <div class="cas-login">
    <iframe :src="fullPath"></iframe>
  </div>
</template>

<script setup>
import { setToken } from '@/utils/auth'
import { useRoute, useRouter } from 'vue-router';

const CAS = import.meta.env.VITE_APP_CAS;
const appCode = import.meta.env.VITE_APP_APP_CODE;
const { query } = useRoute();
const router = useRouter();
const fullPath = computed(() => {
  return `${CAS}/#/login?appCode=${appCode}`
});

window.addEventListener('message', function(e){
  const token = e.data;
  // TODO 添加其他简单的 token 判断，另外 后端返回 token 格式不对的时候，需要清理 token
  if (!token || typeof token !== 'string' || token.split(".") !== 3) {
    return;
  }
  setToken(token);
  router.push({ path: query.to || '/'});
},false);

</script>

<style>
.cas-login {
  height: 100%;
  overflow-y: hidden;
}
.cas-login iframe {
  border: 0;
  width: 100%;
  height: 100%;
}
</style>
