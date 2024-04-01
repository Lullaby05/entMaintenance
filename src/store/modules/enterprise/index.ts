import { defineStore } from 'pinia';
import { EnterpriseInfoData, OrganizationTreeData } from './types';
import {
  companyDetailByUserIdAPI,
  getOrganizationTreeAPI,
  getOrganizationTreeListAPI,
} from '@/api/enterpriseManage';
import type { GetOrganizationTreeData } from '@/api/enterpriseManage';

interface EnterpriseStore {
  enterpriseInfo: EnterpriseInfoData;
  organizationTree: OrganizationTreeData[];
}
const useEnterpriseStore = defineStore('enterprise', {
  state: (): EnterpriseStore => ({
    enterpriseInfo: { id: '' },
    organizationTree: [],
  }),

  getters: {},

  actions: {
    setEnterpriseInfo(info: EnterpriseInfoData) {
      this.enterpriseInfo = info;
    },
    // 根据用户id 获取企业详情
    async getEnterpriseInfo(userID: string, parentId?: string) {
      const { data: res } = await companyDetailByUserIdAPI(userID, parentId);
      this.setEnterpriseInfo(res);
    },

    setOrganizationTree(tree: OrganizationTreeData[]) {
      this.organizationTree = tree;
    },
    async getOrganizationTree(params: GetOrganizationTreeData) {
      const { data: res } = await getOrganizationTreeAPI(params);
      this.setOrganizationTree(res);
    },
    async getOrganizationTreeList(params: GetOrganizationTreeData) {
      const { data: res } = await getOrganizationTreeListAPI(params);
      this.setOrganizationTree(res);
    },
  },
});

export default useEnterpriseStore;
