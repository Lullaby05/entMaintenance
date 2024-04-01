<template>
  <div class="permission-config-container">
    <a-tabs
      v-model:active-key="searchForm.platform"
      type="card-gutter"
      :hide-content="true"
      @change="handleChange"
    >
      <a-tab-pane v-for="item in tabLists" :key="item.code" :title="item.name">
      </a-tab-pane>
    </a-tabs>
    <div class="permission-tree">
      <div>
        <div class="label">功能权限：</div>
        <a-checkbox v-if="props.needEdit" v-model="isFold"
          >展开/折叠</a-checkbox
        >
        <a-checkbox v-if="props.needEdit" v-model="isCheckAll"
          >全选/全不选</a-checkbox
        >
      </div>
      <div class="tree">
        <a-table
          v-if="searchForm.platform === 2"
          v-model:selected-keys="pcPermissionList"
          v-model:expanded-keys="pcExpandKeys"
          ref="treeDomRef"
          :data="treeData"
          row-key="id"
          :columns="columns"
          :bordered="false"
          :pagination="false"
          :row-selection="{
            type: 'checkbox',
            width: 30,
            checkStrictly: false,
            onlyCurrent: false,
            showCheckedAll: false,
          }"
          @select="handleSelect"
        >
        </a-table>
        <a-table
          v-if="searchForm.platform === 3"
          v-model:selected-keys="wxPermissionList"
          v-model:expanded-keys="wxExpandKeys"
          ref="treeDomRef"
          :data="treeData"
          row-key="id"
          :columns="columns"
          :bordered="false"
          :pagination="false"
          :row-selection="{
            type: 'checkbox',
            width: 30,
            checkStrictly: false,
            onlyCurrent: false,
            showCheckedAll: false,
          }"
          @select="handleSelect"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { getMenuList, getMenuListEnum } from '@/api/menu';
  import {
    Message,
    Table,
    TableColumnData,
    TableData,
  } from '@arco-design/web-vue';
  import { PropType } from 'vue';
  import { computed, ref, toRef } from 'vue';

  const props = defineProps({
    pcPermissionList: {
      type: Array<string | number>,
      default: () => [],
    },
    wxPermissionList: {
      type: Array<string | number>,
      default: () => [],
    },
    needEdit: {
      type: Boolean,
      default: true,
    },
  });

  const tabLists = [
    // {code: '0', name: '后台'},
    // {code: '1', name: '移动端'},
    { code: 2, name: 'PC管理端' },
    { code: 3, name: '微信小程序端' },
  ];

  const searchForm = ref({ platform: 2 });
  const treeDomRef = ref<InstanceType<typeof Table> | null>(null);

  const handleChange = async () => {
    getTreeData();
  };

  const isFold = computed({
    get() {
      if (searchForm.value.platform === 2) {
        return pcExpandKeys.value.length === allExpandIds.value.length;
      } else {
        return wxExpandKeys.value.length === allExpandIds.value.length;
      }
    },
    set(val) {
      changeFold(val);
    },
  });
  const isCheckAll = computed({
    get() {
      const obj = {
        2: pcPermissionList,
        3: wxPermissionList,
      };
      if (
        !obj[searchForm.value.platform as 2 | 3].value ||
        obj[searchForm.value.platform as 2 | 3].value.length === 0
      )
        return false;
      return (
        (obj[searchForm.value.platform as 2 | 3].value || []).length ===
        allSelectIds.value.length
      );
    },
    set(val) {
      changeCheckAll(val);
    },
  });
  const changeFold = (val: boolean) => {
    const obj = {
      2: pcExpandKeys,
      3: wxExpandKeys,
    };
    if (val) {
      obj[searchForm.value.platform as 2 | 3].value = allExpandIds.value;
    } else {
      obj[searchForm.value.platform as 2 | 3].value = [];
    }
  };
  const changeCheckAll = (val: boolean) => {
    const obj = {
      2: pcPermissionList,
      3: wxPermissionList,
    };
    if (val) {
      obj[searchForm.value.platform as 2 | 3].value = allSelectIds.value;
    } else {
      obj[searchForm.value.platform as 2 | 3].value = [];
    }
  };

  const emits = defineEmits([
    'update:pcPermissionList',
    'update:wxPermissionList',
  ]);
  const allSelectIds = ref<string[]>([]);
  const allExpandIds = ref<string[]>([]);
  const pcPermissionList = computed({
    get() {
      return props.pcPermissionList;
    },
    set(val) {
      emits('update:pcPermissionList', val);
    },
  });
  const wxPermissionList = computed({
    get() {
      return props.wxPermissionList;
    },
    set(val) {
      emits('update:wxPermissionList', val);
    },
  });
  const pcExpandKeys = ref<string[]>([]);
  const wxExpandKeys = ref<string[]>([]);
    const allDataMap = ref<any>(new Map());
  const treeData = ref([]);
  const columns: TableColumnData[] = [
    { title: '权限名称', dataIndex: 'name', width: 200 },
    { title: '权限说明', dataIndex: 'menuDesc', width: 500 },
  ];

  const getTreeData = async () => {
    if (!allDataMap.value.get(searchForm.value.platform)) {
      const { data } = await getMenuListEnum(searchForm.value.platform);
      allDataMap.value.set(searchForm.value.platform, data);
    }
    treeData.value = allDataMap.value.get(searchForm.value.platform);
    allExpandIds.value = getAllExpandIds(
      allDataMap.value.get(searchForm.value.platform)
    );
    allSelectIds.value = getAllSelectIds(
      allDataMap.value.get(searchForm.value.platform)
    );
  };

  function getAllExpandIds(tree: any[]) {
    let rootNodesWithChildren: any = [];
    function traverseTree(node: any) {
      if (Array.isArray(node.children) && node.children.length > 0) {
        rootNodesWithChildren.push(node.id);
        for (const child of node.children) {
          traverseTree(child);
        }
      }
    }
    for (const node of tree) {
      traverseTree(node);
    }
    return rootNodesWithChildren;
  }

  function getAllSelectIds(tree: any[], leafIds = []) {
    // 遍历树结构的每一项
    tree.forEach((node) => {
      // 如果当前节点没有子节点，则它是一个叶子节点
      if (!node.children || node.children.length === 0) {
        // 将叶子节点的id添加到结果数组中
        leafIds.push(node.id);
      } else {
        // 如果当前节点还有子节点，那么继续递归遍历子节点
        getAllSelectIds(node.children, leafIds);
      }
    });

    // 返回收集到的所有叶子节点id数组
    return leafIds;
  }

  getTreeData();

  const getTotalSubTree = () => {
    return {
      pcPermissionList: pcPermissionList.value,
      wxPermissionList: wxPermissionList.value,
    };
  };

  const handleSelect = (
    rowKeys: (string | number)[],
    _rowKey: string | number,
    record: TableData
  ) => {
    // 如果勾选的是下面的节点，就要找到同级下面的查看节点一起勾选上
    const siblings = findFirstSiblingInTree(
      treeData.value,
      record.id,
      null,
      null,
      rowKeys
    );
    if (!siblings) return;
    const obj = {
      2: pcPermissionList,
      3: wxPermissionList,
    };
    // 目标节点数组中除查看外含有勾选的,则提示无法删除，否则允许删除该查看节点
    const flag = siblings
      .filter((ele: any) => ele.name !== '查看')
      .some((ele: any) =>
        obj[searchForm.value.platform as 2 | 3].value.includes(ele.id)
      );
    // 如果勾选的是查看但是除查看外还有其他的权限，则进行提示
    const msgFlag =
      record.name === '查看' &&
      obj[searchForm.value.platform as 2 | 3].value.includes(record.id);
    setTimeout(() => {
      if (flag) {
        if (msgFlag) {
          Message.warning('如果有其他节点存在则查看必选');
        }
        obj[searchForm.value.platform as 2 | 3].value.push(siblings[0].id);
      }
    }, 0);
  };

  function findFirstSiblingInTree(
    treeData: any[],
    targetId: string,
    _parentId: string | null,
    parentNode: any,
    rowKeys: (string | number)[]
  ) {
    for (let node of treeData) {
      if (node.id === targetId) {
        // 找到了目标节点
        if (parentNode && parentNode.children) {
          // 从目标节点开始向后遍历其同级节点
          const siblings = parentNode.children;
          const flag = siblings.find((item: any) => item.name === '查看');
          if (flag) {
            return siblings;
          }
          return null; // 没有找到同级节点
        } else {
          return null;
        }
      } else if (Array.isArray(node.children)) {
        const foundSibling: any = findFirstSiblingInTree(
          node.children,
          targetId,
          node.id,
          node,
          rowKeys
        );
        if (foundSibling) {
          return foundSibling; // 在子树中找到了目标节点的同级节点
        }
      }
    }

    return null; // 没有在当前层级找到目标节点及其同级节点
  }

  defineExpose({
    getTotalSubTree,
  });
</script>
<style lang="less" scoped>
  .permission-config-container :deep(.arco-tabs-nav-type-card-gutter) {
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
  .permission-config-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    .permission-tree {
      display: flex;
      flex-direction: column;
      gap: 24px;
      & > div:nth-of-type(1) {
        display: flex;
      }
      .label {
        color: #86909c;
      }
    }
  }
</style>
