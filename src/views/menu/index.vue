<!-- 用户管理-批量授权 -->
<template>
  <div class="container">
    <TableListCard>
      <template #headerInput>
        <a-form ref="selectFormDom" :model="tempSearchForm" layout="inline">
          <a-form-item field="name" label="菜单名称">
            <a-input
              v-model.trim="tempSearchForm.name"
              placeholder="请输入菜单名称"
              allow-clear
            ></a-input>
          </a-form-item>
          <a-form-item label="所属平台" prop="platform">
            <a-select v-model="tempSearchForm.platform">
              <a-option
                v-for="item in platformList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></a-option>
            </a-select>
          </a-form-item>
        </a-form>
      </template>
      <template #primaryBtn>
        <a-space>
          <a-button type="primary" @click="jumpToAdd">
            <icon-plus class="icon" />
            新增
          </a-button>
        </a-space>
      </template>
      <template #headerBtn>
        <a-space>
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
          <a-button @click="resetSelectForm">
            <icon-refresh class="icon" />
            重置
          </a-button>
        </a-space>
      </template>
      <template #minorBtn>
        <a-space>
          <icon-refresh class="minor-icon" size="20" />
        </a-space>
      </template>
      <template #table>
        <menuTree :treeData="treeData" @get-tree-data="getTableList" />
      </template>
    </TableListCard>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Menu',
};
</script>
<script lang="ts" setup>
  import { getMenuList } from '@/api/menu';
  import { TableData } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import menuTree from './component/menuTree.vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const tempSearchForm = ref<any>({
    platform: 2,
  });
  const selectForm = ref<any>({
    platform: 2,
  });

  const resetSelectForm = () => {
    selectForm.value = {
      platform: 2,
    };
    tempSearchForm.value = {
      platform: 2,
    };
    getTableList();
  };
  const treeData = ref<TableData[]>([]);

  const platformList = [
    {
      label: '后台',
      value: 0,
    },
    {
      label: '移动端',
      value: 1,
    },
    {
      label: 'PC端',
      value: 2,
    },
    {
      label: '微信小程序',
      value: 3,
    },
  ];

  const filterEmptyChildren = (data: any) => {
    data.forEach((node: any) => {
      if (node.children && node.children.length > 0) {
        // 如果有子节点，递归处理子节点
        filterEmptyChildren(node.children);
      } else {
        // 如果 children 数组为空，删除它
        delete node.children;
      }
    });
    return data;
  };

  const getTableList = async () => {
    const { data } = await getMenuList(selectForm.value);
    const filterData = filterEmptyChildren(data);
    treeData.value = filterData;
  };

  getTableList();

  const jumpToAdd = () => {
    router.push({ name: 'MenuListAdd' });
  };
</script>
<style lang="less" scoped>
  .container {
    .card-table {
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-btn {
          display: flex;
          gap: 12px;
          padding-left: 20px;
          border-left: 1px solid #e5e6eb;
        }
      }
      .table-btn {
        text-align: right;
        .minor-icon {
          cursor: pointer;
        }
      }
    }
  }
</style>
