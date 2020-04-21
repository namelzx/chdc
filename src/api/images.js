import request from '@/utils/request'

export function delImages(temp) {
  return request({
    url: '/delImages',
    method: 'get',
    params: temp
  })
}