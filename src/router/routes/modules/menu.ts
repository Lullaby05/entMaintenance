import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MENU: AppRouteRecordRaw = {
  path: '/menu',
  name: 'Menu',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '菜单管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 1,
  },
  children: [
    {
      path: 'menuList',
      name: 'MenuList',
      component: () => import('@/views/menu/index.vue'),
      meta: {
        locale: '菜单管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'menuListAdd',
      name: 'MenuListAdd',
      component: () => import('@/views/menu/add.vue'),
      meta: {
        locale: '菜单管理',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*'],
      },
    },
    {
      path: 'menuListEdit',
      name: 'MenuListEdit',
      component: () => import('@/views/menu/edit.vue'),
      meta: {
        locale: '菜单管理',
        requiresAuth: true,
        hideInMenu: true,
        roles: ['*'],
      },
    },
  ],
};

export default MENU;
