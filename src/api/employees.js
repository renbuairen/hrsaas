import request from '@/utils/request'

/**
 * 获取员工列表(简单)
 * @returns promise
 */
export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple'
  })
}

/**
 * 获取员工列表
 * @param {*} params {page,size}
 * @returns promise
 */
export function getEmployeesInfoApi(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 删除员工接口
 */
//删除员工接口
export function delEmployeeApi(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 *
 * @param {*} data 员工数组
 * @returns promise
 */
export function importEmployees(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
