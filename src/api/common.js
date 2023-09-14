import request from '@/utils/request'

export function commonDictsList(params) {
  return request({url: '/sys/common/dicts/list', method: 'get', params})
}
