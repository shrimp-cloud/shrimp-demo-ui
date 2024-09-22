<template>
  <div class="cas-login">
    <iframe :src="fullPath"></iframe>
  </div>
</template>

<script setup>
import { setToken } from '@/utils/auth'
import { useRoute, useRouter } from 'vue-router';
import {appCode, cas} from '~/env';

const { query } = useRoute();
const router = useRouter();
const fullPath = computed(() => {
  return cas + '/#/login?appCode=' + appCode + '&_=' + new Date().getTime();
});

window.addEventListener('message', function(e){
  const token = e.data;
  if (!token || typeof token !== 'string' || token.split(".").length !== 3) {
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
