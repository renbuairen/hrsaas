import request from '@/utils/request'

export function getCompanyInfoApi(companyIdy) {
  return request({
    url: `/company/${companyIdy}`
  })
}
