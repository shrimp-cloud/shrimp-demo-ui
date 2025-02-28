import request from '@/utils/request'

// 字典
export function commonDictsList(params) {
  return request({url: '/mdm/common/dicts/list', method: 'get', params})
}

// 动态表单
export function commonFormList(params) {
  return request({url: '/mdm/common/form/list', method: 'get', params})
}
export function commonFormDetail(params) {
  return request({url: '/mdm/common/form/detail', method: 'get', params})
}


// 文件上传
export function commonUpload(data) {
  return request({ url: '/mdm/common/upload', method: 'post', data });
}

// 图片选择
export function imageCategoryOptionsWithimgcount(params) {
  return request({url: '/cms/image/category/options/withimgcount', method: 'get', params});
}
export function commonImagePage(params) {
  return request({ url: '/cms/common/image/page', method: 'get', params });
}
