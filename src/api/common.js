import request from '@/utils/request'

export function commonDictsList(params) {
  return request({url: '/auth/common/dicts/list', method: 'get', params})
}

export function imageCategoryOptionsWithimgcount(params) {
  return request({url: '/cms/image/category/options/withimgcount', method: 'get', params});
}

export function commonImagePage(params) {
  return request({ url: '/cms/common/image/page', method: 'get', params });
}
