import request from '@/utils/request'

export function publicCaptchaPicture(params) {
    return request({url: '/cas/public/captcha/picture', method: 'get', params})
}
export function publicSsoLogin(data) {
    return request({url: '/cas/public/sso/login', method: 'post', data})
}
export function publicSsoLogout() {
    return request({url: '/cas/public/sso/logout', method: 'get'})
}
export function ssoBizLogin(data) {
    return request({url: '/cas/sso/biz/login', method: 'post', data})
}
export function publicSsoLoginUsername() {
    return request({url: '/cas/public/sso/login/username', method: 'get'})
}
export function userResTree() {
    return request({url: '/cas/user/res/tree', method: 'get'})
}
export function userAppList() {
    return request({url: '/cas/user/app/list', method: 'get'})
}
export function userAppTenantList() {
    return request({url: '/cas/user/app/tenant/list', method: 'get'})
}
export function register() {
    return;
}
