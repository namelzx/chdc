import request from '@/utils/request'

export function getDataByDetail(query) {
  return request({
    url: '/customer/getDataByDetail',
    method: 'get',
    params: query
  })
  
}


export function postDataByAdd(data) {
    return request({
      url: '/customer/postDataByAdd',
      method: 'post',
        data
    })
  }



export function getIdByDel(id) {
    return request({
      url: '/customer/getIdByDel',
      method: 'get',
        params:{id}
    })
  }

  


