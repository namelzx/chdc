import request from '@/utils/request'

export function getDataByDetail(query) {
  return request({
    url: '/admin/getDataByDetail',
    method: 'get',
    params: query
  })
  
}


export function postDataByAdd(data) {
    return request({
      url: '/admin/postDataByAdd',
      method: 'post',
        data
    })
  }



export function getIdByDel(id) {
    return request({
      url: '/admin/getIdByDel',
      method: 'get',
        params:{id}
    })
  }

  


