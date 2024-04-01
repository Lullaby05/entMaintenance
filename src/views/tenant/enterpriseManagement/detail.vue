<template>
  <div class="container">
    <a-card class="content-card">
      <div class="header">
        <icon-left @click="goBack" /><span class="title">详情</span>
      </div>
      <div class="content-card-inner">
        <a-tabs
          v-model:active-key="tabInfo"
          type="card-gutter"
          :hide-content="true"
        >
          <a-tab-pane
            v-for="item in tabLists"
            :key="item.code"
            :title="item.name"
          >
          </a-tab-pane>
        </a-tabs>
        <div class="first" v-if="tabInfo === '1'">
          <basicInfoDetail :data="formData" />
        </div>
        <div class="second" v-if="tabInfo === '2'">
          <div>
            <div class="label">登录账号：</div>
            <div class="value">{{ accountFormData.username }}</div>
          </div>
          <div>
            <div class="label">登录密码：</div>
            <div
              class="value"
              style="display: flex; align-items: center; gap: 10px"
            >
              <span>{{ passwordText }}</span>
              <icon-eye
                v-if="!passwordVisible"
                style="cursor: pointer; font-size: 20px"
                @click="passwordVisible = !passwordVisible"
              />
              <icon-eye-invisible
                v-if="passwordVisible"
                style="cursor: pointer; font-size: 20px"
                @click="passwordVisible = !passwordVisible"
              />
              <a-button type="primary" size="mini" @click="copy"
                >复制企业账号信息</a-button
              >
            </div>
          </div>
          <div>
            <div class="label">子账号额度：</div>
            <div class="value">{{ accountFormData.quota }}</div>
          </div>
          <div>
            <div class="label">账号类型：</div>
            <div class="value">{{ accountFormData.accountTypeName }}</div>
          </div>
          <div>
            <div class="label">账号过期时间：</div>
            <div class="value">{{ accountFormData.expireTime }}</div>
          </div>
          <div>
            <div class="label">帐号状态：</div>
            <div class="value">{{ accountFormData.statusName }}</div>
          </div>
          <div>
            <div class="label">备注：</div>
            <div class="value">{{ accountFormData.remark }}</div>
          </div>
        </div>
        <div class="third" v-if="tabInfo === '3'">
          <permissionConfig
            :needEdit="false"
            v-model:pc-permission-list="permissionList.pcPermissionList"
            v-model:wx-permission-list="permissionList.wxPermissionList"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import basicInfoDetail from './components/basicInfoDetail.vue';
  import permissionConfig from './components/permissionConfig.vue';
  import { companyDetailByIdAPI } from '@/api/enterpriseManage';
  import { Message } from '@arco-design/web-vue';

  const router = useRouter();
  const route = useRoute();

  const goBack = () => {
    router.back();
  };

  // tab
  const tabInfo = ref('1');
  const tabLists = [
    { code: '1', name: '企业信息' },
    { code: '2', name: '账号信息' },
    { code: '3', name: '权限配置' },
  ];

  const password = computed(() => accountFormData.value.password || '');
  const passwordText = computed(() => {
    return passwordVisible.value
      ? password.value.replace(/./g, '*')
      : password.value;
  });
  const passwordVisible = ref(true);
  const copy = () => {
    navigator.clipboard.writeText(
      `企业名称：${formData.value.companyName}\n登录账号：${
        accountFormData.value.username || ''
      }\n登录密码：${accountFormData.value.password || ''}`
    );
    Message.success('企业账号信息已复制至剪贴板');
  };

  const formData = ref<any>({});
  const accountFormData = ref<any>({});

  const { id } = route.query;
  const permissionList = ref<any>({});

  const getDetailData = async () => {
    const { data } = await companyDetailByIdAPI(id as string);
    formData.value = {
      ...data.info,
      ...data.info.safeInfo,
      ...data.info.baseInfo,
      ...data.info.accessoryInfo,
      ...data.info.contactInfo,
      status: data.account.status,
    };
    accountFormData.value = data.account;
    permissionList.value = data.permissionInfo;
  };

  getDetailData();
</script>
<style lang="less" scoped>
  .arco-card.content-card {
    .header {
      font-size: 18px;
      .title {
        margin-left: 8px;
      }
    }
    :deep(.arco-tabs-nav-type-card-gutter) {
      &::before {
        display: none;
      }
      margin-bottom: 0px;
      .arco-tabs-tab {
        border-radius: 5px;
        background-color: #ffffff;
        border-bottom: 1px solid var(--color-neutral-3);
      }
      .arco-tabs-tab-active {
        background-color: #165dff;
        color: #ffffff;
      }
    }
    .content-card-inner {
      margin: 20px 0px 20px 24px;
      .first,
      .second,
      .third {
        margin-top: 20px;
      }
      .second {
        display: flex;
        flex-direction: column;
        margin: 20px auto 0;
        width: 30%;
        gap: 10px;
        & > div {
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
