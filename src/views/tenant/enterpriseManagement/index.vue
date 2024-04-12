<!-- 企业管理 -->
<template>
  <div class="container">
    <TableListCard>
      <template #headerInput>
        <a-form :model="tempSearchForm" layout="inline">
          <a-form-item field="companyName" label="企业名称">
            <a-input
              v-model="tempSearchForm.companyName"
              placeholder="请输入企业名称"
              allow-clear
            ></a-input>
          </a-form-item>
          <a-form-item field="companyArea" label="所属区域">
            <a-input
              v-model="tempSearchForm.companyArea"
              placeholder="请输入所属区域"
              allow-clear
            ></a-input>
          </a-form-item>
          <a-form-item field="industryInvolved" label="所属行业">
            <a-select
              v-model="tempSearchForm.industryInvolved"
              placeholder="请选择所属行业"
              allow-search
              allow-clear
            >
              <a-option
                v-for="item in respectiveIndustryList"
                :key="item.key"
                :value="item.key"
                >{{ item.value }}</a-option
              >
            </a-select>
          </a-form-item>
          <a-form-item field="accountType" label="账号类型">
            <a-select
              v-model="tempSearchForm.accountType"
              placeholder="请选择账号类型"
              allow-search
              allow-clear
            >
              <a-option
                v-for="item in accountTypeCodeList"
                :key="item.dictValue"
                :value="item.dictValue"
                >{{ item.dictKey }}</a-option
              >
            </a-select>
          </a-form-item>
          <a-form-item field="status" label="账号状态">
            <a-select
              v-model="tempSearchForm.status"
              placeholder="请选择账号状态"
              allow-search
              allow-clear
            >
              <a-option
                v-for="item in accountStatusCodeList"
                :key="item.dictValue"
                :value="item.dictValue"
                >{{ item.dictKey }}</a-option
              >
            </a-select>
          </a-form-item>
          <a-form-item field="expireStatus" label="账号过期状态">
            <a-select
              v-model="tempSearchForm.expireStatus"
              placeholder="请选择账号过期状态"
              allow-search
              allow-clear
            >
              <a-option
                v-for="item in accountExpireStatusCodeList"
                :key="item.dictValue"
                :value="item.dictValue"
                >{{ item.dictKey }}</a-option
              >
            </a-select>
          </a-form-item>
        </a-form>
      </template>
      <template #headerBtn>
        <div class="header-btn">
          <a-button
            type="primary"
            @click="
              () => {
                selectForm = tempSearchForm;
                getTableList();
              }
            "
          >
            <icon-search class="icon" />
            查询
          </a-button>
          <a-button @click="handleReset">
            <icon-refresh class="icon" />
            重置
          </a-button>
        </div>
      </template>
      <template #primaryBtn>
        <a-space>
          <a-button type="primary" @click="jumpToAdd">
            <icon-plus class="icon" />
            新增
          </a-button>
        </a-space>
      </template>
      <template #minorBtn>
        <a-space>
          <icon-refresh class="minor-icon" size="20" />
        </a-space>
      </template>
      <template #table>
        <a-table
          :data="enterpriseList.list"
          row-key="id"
          :columns="columns"
          :bordered="false"
          :pagination="false"
        >
          <template #number="{ rowIndex }">{{ rowIndex + 1 }}</template>
          <template #accountType="{ record }">
            {{
              accountTypeCodeList.find(
                (ele) => ele.dictValue === record.accountType
              )?.dictKey
            }}
          </template>
          <template #status="{ record }">
            {{
              accountStatusCodeList.find(
                (ele) => ele.dictValue === record.status
              )?.dictKey
            }}
          </template>
          <template #expireTime="{ record }">
            <div style="display: flex; flex-direction: column">
              <span>{{ record.expireTime }}</span>
              <span>{{ record.expireDesc }}</span>
            </div>
          </template>
          <template #usedQuata="{ record }"
            >{{ (record.usedQuota || 0) + '/' + (record.quota || 0) }}
          </template>
          <template #option="{ record }">
            <div>
              <a-button type="text" size="mini" @click="jumpToEdit(record)">
                编辑
              </a-button>
              <a-button type="text" size="mini" @click="jumpToDetail(record)">
                详情
              </a-button>
              <a-button
                type="text"
                size="mini"
                status="danger"
                @click="handleDelete(record)"
              >
                删除
              </a-button>
            </div>
          </template>
        </a-table>
      </template>
      <template #pagination>
        <a-pagination
          :current="selectForm.pageNo"
          :page-size="selectForm.pageSize"
          show-total
          show-page-size
          :page-size-options="[10, 20, 50, 100]"
          :total="(enterpriseList.total as number)"
          @change="pageChange"
          @page-size-change="pageSizeChange"
        ></a-pagination>
      </template>
    </TableListCard>
  </div>
</template>
<script lang="ts" setup>
  import {
    deleteCompanyApi,
    getEnterpriseList,
    getIndustryDict,
  } from '@/api/enterpriseManage';
  import { Message, Modal, TableColumnData } from '@arco-design/web-vue';
  import { h, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import ConfirmModalBody from '@/components/confirm/index.vue';
  import dayjs from 'dayjs';
  import { formatDate } from '@/utils/utils';
  import { handleOnKeyup } from '@/utils/event';

  const router = useRouter();

  const tempSearchForm = ref<any>({
    pageNo: 1,
    pageSize: 10,
  });
  const selectForm = ref<any>({
    pageNo: 1,
    pageSize: 10,
  });

  const enterpriseList = ref<any>({ list: [], total: 0 });

  // 数据字典
  const respectiveIndustryList = ref<{ key: string; value: string }[]>([]);
  const accountTypeCodeList = ref([
    { dictKey: '客户正式账号', dictValue: 0 },
    { dictKey: '客户试用账号', dictValue: 1 },
    { dictKey: '演示账号', dictValue: 2 },
  ]);
  const accountStatusCodeList = ref([
    { dictKey: '启用', dictValue: 0 },
    { dictKey: '禁用', dictValue: 1 },
  ]);
  const accountExpireStatusCodeList = ref([
    { dictKey: '正常', dictValue: 0 },
    { dictKey: '即将过期', dictValue: 1 },
    { dictKey: '已过期', dictValue: 2 },
  ]);

  const columns: TableColumnData[] = [
    { title: '序号', dataIndex: 'number', slotName: 'number', width: 60 },
    { title: '企业名称', dataIndex: 'companyName' },
    { title: '注册地址', dataIndex: 'registeredAddress' },
    { title: '所属区域', dataIndex: 'companyArea' },
    { title: '企业类型', dataIndex: 'companyTypeName' },
    { title: '所属行业', dataIndex: 'industryInvolvedName' },
    {
      title: '用户额度（已用/总数）',
      dataIndex: 'usedQuata',
      slotName: 'usedQuata',
      width: 120,
    },
    {
      title: '账号类型',
      dataIndex: 'accountType',
      bodyCellStyle(record) {
        const obj = {
          2: '#165dFF',
          1: '#FF8D1A',
          0: '#D43030',
        };
        return {
          color: obj[record.accountType as keyof typeof obj],
        };
      },
      slotName: 'accountType',
    },
    {
      title: '账号状态',
      dataIndex: 'status',
      bodyCellStyle(record) {
        const obj = {
          0: '#43cf7c',
          1: '#D43030',
        };
        return {
          color: obj[record.status as keyof typeof obj],
        };
      },
      slotName: 'status',
    },
    {
      title: '账号过期时间',
      dataIndex: 'expireTime',
      bodyCellStyle(record) {
        const obj = {
          0: '#165dFF',
          1: '#FF8D1A',
          2: '#D43030',
        };
        return {
          color: obj[record.expireStatus as keyof typeof obj],
        };
      },
      slotName: 'expireTime',
      width: 150,
    },
    { title: '账号创建时间', dataIndex: 'createTime', width: 120 },
    { title: '最后修改时间', dataIndex: 'updateTime', width: 120 },
    { title: '操作', dataIndex: 'option', slotName: 'option', align: 'center' },
  ];

  const getTableList = async () => {
    const { data } = await getEnterpriseList(selectForm.value);
    enterpriseList.value.total = data.total;
    enterpriseList.value.list = data.list.map((item: any) => {
      const gap = Math.abs(
        dayjs(item.expireTime).diff(new Date().setHours(23, 59, 59), 'day')
      );
      let expireDesc = '';
      if (item.expireStatus === 1) {
        expireDesc = `(${gap}天后过期)`;
      } else if (item.expireStatus === 2) {
        expireDesc = `(已过期${gap}天)`;
      }
      return {
        ...item,
        expireTime: item.expireTime
          ? formatDate(item.expireTime, 'yyyy-MM-DD')
          : '',
        expireDesc,
      };
    });
  };
  getTableList();

  const getEnum = async () => {
    const { data } = await getIndustryDict({ code: 'industry', key: '0' });
    respectiveIndustryList.value = Object.keys(data).map((key) => ({
      key,
      value: data[key],
    }));
  };
  getEnum();

  const handleReset = () => {
    selectForm.value = {
      pageNo: selectForm.value.pageNo,
      pageSize: selectForm.value.pageSize,
    };
    tempSearchForm.value = {
      pageNo: selectForm.value.pageNo,
      pageSize: selectForm.value.pageSize,
    };
    getTableList();
  };

  const pageChange = (page: number) => {
    selectForm.value.pageNo = page;
    getTableList();
  };

  const pageSizeChange = (pageSize: number) => {
    selectForm.value.pageSize = pageSize;
    getTableList();
  };

  const jumpToAdd = () => {
    router.push({
      name: 'EnterpriseManageAdd',
    });
  };

  const jumpToEdit = (record: any) => {
    router.push({
      name: 'EnterpriseManageEdit',
      query: {
        id: record.id,
      },
    });
  };

  const jumpToDetail = (record: any) => {
    router.push({
      name: 'EnterpriseManageDetail',
      query: {
        id: record.id,
      },
    });
  };

  const handleDelete = (record: any) => {
    if (record.usedQuota > 0) {
      Message.warning(
        `该企业下存在${record.usedQuota}个用户，无法删除，若仍要删除，请先移除该企业下的用户`
      );
      return;
    }
    Modal.open({
      title: '提示',
      titleAlign: 'start',
      content: () =>
        h(ConfirmModalBody, {
          text: record.companyName,
          info: '删除数据不可恢复，请谨慎操作！',
        }),
      onOk: async () => {
        await deleteCompanyApi(record.id);
        Message.success('删除成功');
        getTableList();
      },
    });
  };

  onMounted(() => {
    handleOnKeyup('Enter', () => {
      selectForm.value = tempSearchForm.value;
      getTableList();
    });
  });
</script>
<style lang="less" scoped>
  .header-btn {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
</style>
