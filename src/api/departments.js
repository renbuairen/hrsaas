import request from '@/utils/request'

/**
 * 获取组织架构的数据
 * @returns promise
 */
export const getDeptsApi = () => {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除部门
 * @param {*} id 要删除的部门id
 * @returns promise
 */
export const delDeptsApi = (id) => {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param {Object}  data
 * code 部门编码,同级部门不可重复
 *   introduce 介
 *   manager 负责人名称
 *   name部门名称
 *   pid 父级部门ID
 *  @returns promise
 *
 */
export const addDeptApi = (data) => {
  return request({
    url: '/company/department/',
    method: 'POST',
    data
  })
}
