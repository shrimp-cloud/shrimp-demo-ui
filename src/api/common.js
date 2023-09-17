import request from '@/utils/request'

export function commonDictsList(params) {
  return request({url: '/sys/common/dicts/list', method: 'get', params})
}

export function imageLibraryPage(params) {
  return request({ url: '/cms/image/library/page', method: 'get', params });
}
