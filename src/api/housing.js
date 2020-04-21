import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/housing/getDataByList',
    method: 'get',
    params: query
  })
}


export function fetchArticle(id) {
  return request({
    url: '/housing/getDataByFind',
    method: 'get',
    params: { id }
  })
}



export function getIdByDel(id) {
  return request({
    url: '/housing/getIdByDel',
    method: 'get',
    params: { id }
  })
}


export function GetFollow(query) {
  return request({
    url: '/housing/GetFollow',
    method: 'get',
    params: query
  })
}




export function postDataData(data) {
  return request({
    url: '/housing/postDataData',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}


export function postFollow(data) {
  return request({
    url: '/housing/postFollow',
    method: 'post',
    data
  })
}



export function postIdByfocus(data) {
  return request({
    url: '/housing/postIdByfocus',
    method: 'post',
    data
  })
}




