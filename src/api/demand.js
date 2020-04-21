import request from '@/utils/request'

export function getDataByDetail(query) {
  return request({
    url: '/demand/getDataByDetail',
    method: 'get',
    params: query
  })
  
}


export function postDataByAdd(data) {
    return request({
      url: '/demand/postDataByAdd',
      method: 'post',
        data
    })
  }



export function getIdByDel(id) {
    return request({
      url: '/demand/getIdByDel',
      method: 'get',
        params:{id}
    })
  }


export function getDayDemand() {
    return request({
      url: '/demand/getDayDemand',
      method: 'get',
    })
  }


  
  


