<template>
  <div>
    <a-table
      v-model:selected-keys="selectKeys"
      ref="treeDomRef"
      :data="props.treeData"
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
    >
      <template #options="{ record }">
        <a-button type="text" @click="handleEdit(record)">编辑</a-button>
        <a-button type="text" @click="handleDelete(record)">删除</a-button>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
  import { deleteMenu } from '@/api/menu';
  import { Modal, TableColumnData, TableData } from '@arco-design/web-vue';
  import { nextTick, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const props = defineProps({
    treeData: {
      type: Array<TableData>,
      default: () => [],
    },
  });

  const emits = defineEmits(['getTreeData']);

  const columns: TableColumnData[] = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '唯一标识',
      dataIndex: 'menuTag',
    },
    {
      title: '组件名称',
      dataIndex: 'componentName',
    },
    {
      title: '菜单说明',
      dataIndex: 'menuDesc',
    },
    {
      title: '操作',
      dataIndex: 'options',
      slotName: 'options',
      align: 'center',
      width: 160,
    },
  ];

  const selectKeys = ref([]);

  const handleEdit = (record: any) => {
    router.push({
      name: 'MenuListEdit',
      query: {
        id: record.id,
      },
    });
  };

  const handleDelete = async (record: any) => {
    Modal.open({
      title: '删除菜单',
      content: '确定要删除该菜单吗？',
      onOk: async () => {
        await deleteMenu(record);
        emits('getTreeData');
      },
    });
  };

  const treeDomRef = ref<any | null>(null);

  onMounted(() => {
    setTimeout(() => {
      // treeDomRef.value?.expandAll(true);
    }, 200);
  });
</script>
<style></style>
