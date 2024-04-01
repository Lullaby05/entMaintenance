import Axios from './interceptorUaa'

// 获取菜单列表
export const getMenuList = (params?: any) => {
  return Axios({
    url: `/admin-api/system/menu/list-menus`,
    method: 'get',
    params: params
  })
}

// 获取菜单精简信息
export const getMenuListSimple = (platform?: number) => {
  return Axios({
    url: `/admin-api/system/menu/list-all-simple?platform=${platform}`,
    method: 'get',
  })
}

// 新增菜单
export const addMenu = (data: any) => {
  return Axios({
    url: '/admin-api/system/menu/create',
    method: 'post',
    data
  })
}

// 编辑菜单
export const updateMenu = (data: any) => {
  return Axios({
    url: '/admin-api/system/menu/update',
    method: 'put',
    data
  })
}

// 删除菜单
export const deleteMenu = (data: any) => {
  return Axios({
    url: `/admin-api/system/menu/delete?id=${data.id}`,
    method: 'delete',
  })
}

// 获取菜单详情
export const getMenuDetail = (data: any) => {
  return Axios({
    url: `/admin-api/system/menu/get?id=${data.id}`,
    method: 'get',
  })
}

// 获取菜单下拉列表
export const getMenuListEnum = (platform?: number) => {
  return Axios({
    url: `/admin-api/system/menu/platform-list-menus?platform=${platform}`,
    method: 'get',
  })
}
