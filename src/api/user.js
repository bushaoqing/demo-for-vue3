import { request } from '@common/request'

export const loginCheck = (params = {}) => request({ url: '/login/check', method: 'get', params: params })
