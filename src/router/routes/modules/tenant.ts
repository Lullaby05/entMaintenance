import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MENU: AppRouteRecordRaw = {
  path: '/tenant',
  name: 'Tenant',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '租户管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'enterpriseManage',
      name: 'EnterpriseManage',
      component: () => import('@/views/tenant/enterpriseManagement/index.vue'),
      meta: {
        locale: '企业管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'enterpriseManageAdd',
      name: 'EnterpriseManageAdd',
      component: () => import('@/views/tenant/enterpriseManagement/add.vue'),
      meta: {
        locale: '企业管理',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'enterpriseManageEdit',
      name: 'EnterpriseManageEdit',
      component: () => import('@/views/tenant/enterpriseManagement/edit.vue'),
      meta: {
        locale: '企业管理',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'enterpriseManageDetail',
      name: 'EnterpriseManageDetail',
      component: () => import('@/views/tenant/enterpriseManagement/detail.vue'),
      meta: {
        locale: '企业管理',
        hideInMenu: true,
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default MENU;
