// import axios from 'axios';
import axios from 'axios';
import Axios from '@/api/interceptor';
import type { RouteRecordNormalized } from 'vue-router';
// import minimist from 'minimist';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

type loginType = {
  condition: string;
  password: string;
};

// 登录，获取token
export const login = (data: loginType) => {
  return Axios({
    url: `/businessApi/business/login/operation?condition=${data.condition}&password=${data.password}`,
    method: "POST",
  });
};
// 获取用户信息
export const getUserInfo = () => {
  return Axios({
    url: "/businessApi/business/login/user-info",
    method: "POST",
  });
};

// 刷新token
export const refreshToken = (refreshToken: string) => {
  return Axios({
    url: `/businessApi/business/login/refresh?refreshToken=${refreshToken}`,
    method: "POST",
  });
};


// 获取验证码
export const getVerifyCode = (mobile: string) => {
  return Axios({
    url: `/businessApi/business/login/get-code?mobile=${mobile}`,
    method: "POST",
  });
};

// 手机号登录
export const loginByPhone = (data: any) => {
  return Axios({
    url: `/businessApi/business/login/mobile-login?mobile=${data.mobile}&code=${data.code}`,
    method: "POST",
  });
};

// 获取角色列表
export const getRoleList = (data: any) => {
  return Axios({
    url: `/businessApi/business/user/roleList`,
    method: "POST",
    data
  });
}

// 编辑角色
export const updateRole = (data: any) => {
  return Axios({
    url: `/businessApi/business/user/role/update`,
    method: "POST",
    data
  });
}

// 删除角色
export const deleteRole = (data: any) => {
  return Axios({
    url: `/businessApi/business/user/role/delete?id=${data.id}`,
    method: "POST",
    // data
  });
}

// 获取用户列表
export const getUserList = (data: any) => {
  return Axios({
    url: `/businessApi/business/user/userList`,
    method: "POST",
    data
  });
}

// 根据id获取用户对应的手机号
export const getUserPhone = (ids: any, data: any) => {
  return Axios({
    url: `/businessApi/business/user/user/getPhone?ids=${ids}`,
    method: "POST",
    data
  });
}

// 删除用户
export const deleteUser = (data: any) => {
  return Axios({
    url: `/businessApi/business/user/user/delete?id=${data.id}`,
    method: "POST",
    // data
  });
}

// 获取权限树
export const getPermissionList = (data: any) => {
  return Axios({
    url: `/businessApi/business/user/user/getPermissionList`,
    method: "POST",
    // data
  });
}

// 修改密码
export const changePassword = (oldPassword: string, password: string) => {
  return Axios({
    url: `/businessApi/business/login/update-user-possword?oldPassword=${oldPassword}&newPassword=${password}`,
    method: "POST",
  });
};