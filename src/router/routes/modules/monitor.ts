import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const MONITOR: AppRouteRecordRaw = {
  path: '/monitor',
  name: 'Monitor',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '监测预警管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 3,
  },
};

export default MONITOR;
