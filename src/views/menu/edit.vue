<template>
  <a-card class="card-conatiner">
    <div class="title">
      <icon-left @click="goBack"></icon-left>
      <span>编辑菜单</span>
    </div>
    <div class="content">
      <a-form :model="formData">
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_menuType')" prop="type">
              <a-radio-group v-model="formData.type">
                <a-radio :value="1">{{ $t('label_firstMenu') }}</a-radio>
                <a-radio :value="2">{{ $t('label_subMenu') }}</a-radio>
                <a-radio :value="3">{{ $t('label_creatorBtn') }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item label="所属平台" prop="platform">
              <a-select v-model="formData.platform" @change="getDict">
                <a-option
                  v-for="item in platformList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></a-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col v-if="formData.type == 2 || formData.type == 3" :span="16">
            <a-form-item :label="$t('label_parentMenu')" prop="parentId">
              <a-cascader
                v-model="formData.parentId"
                :show-all-levels="false"
                :options="options"
                :field-names="{
                  value: 'id',
                  label: 'name',
                }"
                check-strictly
                allow-search
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item
              v-if="formData.type == 3"
              :label="$t('label_btnName')"
              prop="name"
            >
              <a-input v-model="formData.name" />
            </a-form-item>
            <a-form-item v-else :label="$t('label_menuName')" prop="name">
              <a-input v-model="formData.name" />
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row>
          <a-col :span="16">
            <a-form-item
              v-if="formData.type == 3"
              :label="$t('label_btnPath')"
              prop="path"
            >
              <a-input v-model="formData.path" />
            </a-form-item>
            <a-form-item v-else :label="$t('label_menuPath')" prop="path">
              <a-input v-model="formData.path" />
            </a-form-item>
          </a-col>
        </a-row> -->

        <a-row>
          <a-col :span="16">
            <a-form-item
              v-if="formData.type != 1"
              :label="$t('label_isCache')"
              prop="keepAlive"
            >
              <a-radio-group v-model="formData.keepAlive">
                <a-radio :value="true">{{ $t('label_Y') }}</a-radio>
                <a-radio :value="false">{{ $t('label_N') }}</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 用于前端路由信息收集 -->
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_componentPath')" prop="component">
              <a-input v-model="formData.component" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_compoentName')" prop="componentName">
              <a-input v-model="formData.componentName" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_languageKey')" prop="languageTag">
              <a-input v-model="formData.languageTag" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_serialNo')" prop="sort">
              <a-input-number v-model="formData.sort" :default-value="0" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_isHiddenSider')" prop="visible">
              <a-select v-model="formData.visible">
                <a-option :label="$t('label_Y')" :value="true" />
                <a-option :label="$t('label_N')" :value="false" />
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item v-if="formData.type == 1" label="图标" prop="icon">
              <a-input v-model="formData.icon" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item label="唯一标识" prop="menuTag">
              <a-input v-model="formData.menuTag" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item label="权限标识" prop="permission">
              <a-input v-model="formData.permission" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item label="状态" prop="status">
              <a-switch
                v-model="formData.status"
                :checked-value="1"
                :unchecked-value="0"
              >
                <template #checked> 启用 </template>
                <template #unchecked> 禁用 </template>
              </a-switch>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="16">
            <a-form-item :label="$t('label_descrition')" prop="menuDesc">
              <a-input v-model="formData.menuDesc" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div class="btn">
        <a-button @click="goBack">取消</a-button>
        <a-button type="primary" @click="submit">保存</a-button>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
  import {
    addMenu,
    getMenuDetail,
    getMenuList,
    getMenuListEnum,
    getMenuListSimple,
    updateMenu,
  } from '@/api/menu';
  import { Message } from '@arco-design/web-vue';
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  const { id } = route.query;
  const goBack = () => {
    router.back();
  };

  const formData = ref<any>({
    type: 1,
    status: 1,
    visible: false,
    sort: 0,
    keepAlive: false,
  });

  const options = ref([]);

  const getDict = async () => {
    const { data } = await getMenuListEnum(formData.value.platform);
    options.value = data;
  };

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

  const submit = async () => {
    const obj = {
      1: [
        'type',
        'platform',
        'name',
        'component',
        'componentName',
        'languageTag',
        'sort',
        'visible',
        'icon',
        'menuTag',
        'permission',
        'status',
        'menuDesc',
        'id',
      ],
      2: [
        'type',
        'platform',
        'parentId',
        'name',
        'keepAlive',
        'component',
        'componentName',
        'languageTag',
        'sort',
        'visible',
        'menuTag',
        'permission',
        'status',
        'menuDesc',
        'id',
      ],
      3: [
        'type',
        'platform',
        'parentId',
        'name',
        'keepAlive',
        'component',
        'componentName',
        'languageTag',
        'sort',
        'visible',
        'menuTag',
        'permission',
        'status',
        'menuDesc',
        'id',
      ],
    };
    const params: any = {
      parentId: formData.value.parentId || 0,
    };
    obj[formData.value.type as keyof typeof obj].forEach((item) => {
      params[item] = formData.value[item];
    });
    localStorage.setItem('menu', JSON.stringify(formData.value));
    await updateMenu(params);
    Message.success('编辑成功');
    router.back();
  };

  const getDetail = async () => {
    const { data } = await getMenuDetail({
      id,
    });
    formData.value = data;
    getDict();
  };

  getDetail();
</script>
<style lang="less" scoped>
  .btn {
    text-align: center;
    .arco-btn + .arco-btn {
      margin-left: 12px;
    }
  }
</style>
