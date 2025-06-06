import { getToken, setToken, removeToken } from '@/utils/auth'
import { ElMessage } from "element-plus";
import { Base64 } from 'js-base64';
import { encrypt } from '@/utils/jsencrypt'
import {
  publicSsoLogin,
  ssoBizLogin,
  publicSsoLoginUserCode,
  publicSsoLogout,
  userAppTenantList
} from '@/api/cas'

import defAva from '@/assets/images/profile.jpg'
import {appCode} from '~/env';

const useUserStore = defineStore('user', {
    state: () => ({
      apps: [],
      tenants: [],
      username: '',
      nickname: '',
      avatar: '',
    }),
    actions: {
      // 登录
      login(userInfo) {
        return new Promise((resolve, reject) => {
          publicSsoLogin({
            appCode: userInfo.appCode || appCode,
            username: userInfo.username,
            password: encrypt(userInfo.password),
            captchaId: userInfo.captchaId,
            captchaCode: userInfo.captchaCode,
          }).then(res => {
            if (res.data.status !== 0) {
              // 登录失败，条件不满足
              ElMessage({message: res.data.msg, type: 'error'});
              reject(res.data.msg);
              return;
            }
            const token = res.data.token;
            const search = window.location.search;
            if (!search || search.indexOf('onlySelf=true') === -1) {
              setToken(token);
            }
            resolve(res.data);
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 获取用户信息
      getInfo() {
        return new Promise((resolve, reject) => {
          const token = getToken();
          if (!token) {
            reject("token 不存在");
            return;
          }
          const jwtInfoArr = token.split(".");
          if (jwtInfoArr.length !== 3) {
            reject("token 格式不正确");
            return;
          }
          const payload = jwtInfoArr[1];
          let userInfo = Base64.decode(payload);
          userInfo = JSON.parse(userInfo);

          this.username = userInfo.username
          this.nickname = userInfo.nickname
          this.avatar = userInfo.avatar || defAva;
          this.getAppTenants();
          resolve(userInfo)
        })
      },
      bizLogin(appCode) {
        return new Promise((resolve, reject) => {
          if (!appCode) {
            reject('appCode is null!');
            return;
          }
          ssoBizLogin({appCode: appCode}).then(res => {
            resolve(res.data.bizToken);
          })
        })
      },
      getUsername() {
        return new Promise((resolve, reject) => {
          publicSsoLoginUserCode().then(res => {
            resolve(res.data)
          })
        })
      },
      getAppTenants() {
        userAppTenantList().then(res => {
          const apps = res.data.apps;

          // App
          const tmpApps = [];
          if (apps && apps.length > 0) {
            for (const app of apps) {
              app.displayName = app.appCode + ':' + app.appName;
              tmpApps.push(app);
            }
            this.apps = tmpApps;
          }

          // Tenant
          const tenants = res.data.tenants;
          if (tenants && tenants.length > 0) {
            const tmpTenants = [];
            for (const tenant of tenants) {
              tenant.displayName = tenant.tenantCode + ':' + tenant.tenantName;
              tmpTenants.push(tenant);
            }
            this.tenants = tmpTenants;

            let tenantCode = localStorage.getItem('tenant-code');
            if (!tenantCode) {
              localStorage.setItem('tenant-code', tmpTenants[0].tenantCode);
            }
          }
        })
      },
      // 退出系统
      logOut() {
        return new Promise((resolve, reject) => {
          publicSsoLogout().then(() => {
            resolve()
          }).catch(error => {
            reject(error)
          }).finally(val => {
            // 无论如何前端均需要清除 token
            removeToken()
          });
        })
      }
    }
  })

export default useUserStore
