const name = "示例系统";
export const appCode = 'shrimp-demo';

const configs = {
  // "local": {"cas": "http://cas.uat.wkclz.com", "title": name + "【DEV】", "baseApi": "/api"}
  "local": {"cas": "http://cas.uat.wkclz.com", "title": name + "【DEV】", "baseApi": "https://api.uat.wkclz.com"},
  "uat"  : {"cas": "http://cas.uat.wkclz.com", "title": name + "【UAT】", "baseApi": "https://api.uat.wkclz.com"},
  "prod" : {"cas": "http://cas.wkclz.com",     "title": name,             "baseApi": "https://api.wkclz.com"}
};

function getEnv() {
  let url = window.location.host;
  let env = 'prod';
  if (url.indexOf('127.0.0.1') > -1 || url.indexOf('localhost') > -1) {
    env = 'local';
  }
  if (url.indexOf('.dev.') > -1) {
    env = 'dev';
  }
  if (url.indexOf('.sit.') > -1) {
    env = 'sit';
  }
  if (url.indexOf('.uat.') > -1) {
    env = 'uat';
  }
  return env;
}

// 获取环境
export const env = getEnv();

// 获取配置
function getConfig(env) {
  let c = configs[env];
  if (c === undefined) {
    c = configs['local'];
  }
  c.cas = localStorage.getItem('mock-cas') || c.cas;
  c.baseApi = localStorage.getItem('mock-api') || c.baseApi;
  return c;
}

const config = getConfig(env);
export const title = config['title'];
export const cas = config['cas'];
export const baseApi = config['baseApi'];
