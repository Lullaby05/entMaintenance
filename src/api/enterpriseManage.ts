import Axios from "./interceptor";

export const getEnterpriseList = (data: any) => {
  return Axios({
    url: '/businessApi/business/tenant/ent/get-page',
    method: 'post',
    data,
  });
}

// 基本信息---获取企业详情  参数: id : 企业id, parentId : 上级企业id
export function companyDetailByIdAPI(id: string) {
  return Axios({
    url: `/businessApi/business/tenant/ent/detail/${id}`,
    method: 'post',
  });
}

// 基本信息 --- 修改企业基本信息
export interface UpdateCompanyDetailData {
  id: string;

  // 手机号码
  safeMainPerson?: string;
  contacts?: string;

  businessLicense?: string;
  emergency?: string;
  businessLicenseList: any[];
  emergencyList: any[];
  logo?: string;
  logoList: any[];
  contactsPosition?: string;
  contactsTel?: string;
  position?: string;
  safeMainPersonTel?: string;
  fax?: string;
  officialUrl?: string;

  planFlag?: number; // boolean
  threeSimultaneousFlag?: number; // boolean
  safetyProductionFlag?: number; // boolean
  safeRegulator?: string;
  safeRegulatorPerson?: string;
  safeRegulatorTel?: string;
  communityInspector?: string;
  communityInspectorTel?: string;

  latitude?: string;
  longitude?: string;
  parentId?: string;
}

export function createCompanyDetailAPI(data: any) {
  return Axios({
    url: '/businessApi/business/tenant/ent/create',
    method: 'post',
    data,
  });
}

export function updateCompanyDetailAPI(data: any) {
  return Axios({
    url: '/businessApi/business/tenant/ent/update',
    method: 'post',
    data,
  });
}

// 组织架构 --- 获取组织架构树
export interface GetOrganizationTreeData {
  id?: string;
  enterpriseId: string;
  name?: string;
  type?: string;
}
export function getOrganizationTreeListAPI(params: GetOrganizationTreeData) {
  return Axios({
    url: '/businessApi/business/dept/tree-list',
    method: 'post',
    params,
  });
}

export function getOrganizationTreeAPI(params: GetOrganizationTreeData) {
  return Axios({
    url: '/businessApi/business/dept/tree',
    method: 'post',
    params,
  });
}

// 基本信息---获取企业详情  参数： userID : 用户id ，  parentId  上级企业id
export function companyDetailByUserIdAPI(userID: string, parentId?: string) {
  return Axios({
    url: '/businessApi/business/enterprise-info/detail-by-user',
    method: 'post',
    params: {
      userID,
      parentId,
    },
  });
}

// 获取行业字典
export function getIndustryDict(params: any) {
  return Axios({
    url: `/businessApi/business/tenant/ent/getIndustryDict/${params.code}`,
    method: 'post',
    params
  })
}

// 删除企业
export function deleteCompanyApi(id: string) {
  return Axios({
    url: `/businessApi/business/tenant/ent/delete/${id}`,
    method: 'post',
  })
}

// 修改密码
export function changePasswordApi(params: any) {
  return Axios({
    url: `/businessApi/business/tenant/ent/operation-update-user-possword/${params.entId}`,
    method: 'post',
    params
  })
}