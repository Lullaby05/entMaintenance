<template>
  <div class="container">
    <a-card class="content-card">
      <div class="header">
        <icon-left @click="goBack" /><span class="title">编辑企业</span>
      </div>
      <div class="form">
        <div class="steps">
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
        </div>
        <div class="first" v-show="tabInfo === '1'">
          <a-form ref="form" :model="formData" layout="vertical" :rules="rules">
            <div class="title"> 基本信息 </div>
            <a-row>
              <a-form-item field="companyName" label="企业名称">
                <a-input
                  v-model="formData.companyName"
                  placeholder="请输入企业名称"
                  allow-clear
                ></a-input>
              </a-form-item>
              <a-form-item field="socialcreditCode" label="统一社会信用代码">
                <a-input
                  v-model="formData.socialcreditCode"
                  placeholder="请输入统一社会信用代码"
                  allow-clear
                ></a-input>
              </a-form-item>
              <a-form-item field="establishmentDate" label="成立时间">
                <a-date-picker
                  style="width: 100%"
                  v-model="formData.establishmentDate"
                  allow-clear
                  placeholder="请选择成立时间"
                >
                </a-date-picker>
              </a-form-item>
              <a-form-item field="registeredAddress" label="注册地址">
                <a-input
                  v-model="formData.registeredAddress"
                  placeholder="请输入注册地址"
                  allow-clear
                ></a-input>
              </a-form-item>
              <a-form-item field="companyType" label="企业类型">
                <a-select
                  v-model="formData.companyType"
                  placeholder="请选择企业类型"
                  :fallback-option="false"
                  allow-clear
                >
                  <a-option
                    v-for="(value, key) of companyTypeEnum"
                    :value="key"
                  >
                    {{ value }}
                  </a-option>
                </a-select>
              </a-form-item>
              <a-form-item field="companyArea" label="归属区域">
                <a-input
                  allow-clear
                  v-model="formData.companyArea"
                  placeholder="请输入归属区域"
                ></a-input>
              </a-form-item>
              <a-form-item field="enterpriseAddress" label="企业地址">
                <a-input
                  allow-clear
                  v-model="formData.enterpriseAddress"
                  placeholder="请输入企业地址"
                ></a-input>
              </a-form-item>
              <a-form-item field="belongGroup" label="所属集团">
                <a-input
                  allow-clear
                  v-model="formData.belongGroup"
                  placeholder="请输入所属集团"
                ></a-input>
              </a-form-item>
              <a-form-item field="employeesNum" label="员工总数">
                <a-input-number
                  :min="0"
                  :precision="0"
                  allow-clear
                  v-model="formData.employeesNum"
                  placeholder="请输入员工总数"
                ></a-input-number>
              </a-form-item>
              <a-form-item field="industryInvolved" label="所属行业">
                <a-select
                  allow-clear
                  allow-search
                  multiple
                  v-model="formData.industryInvolved"
                  placeholder="请选择所属行业"
                  @change="getIndustryDictEnum(1)"
                  @clear="clearIndustryDictEnum(1)"
                  @remove="removeIndustryDictTag(1)"
                >
                  <a-option
                    v-for="(item, index) of industryDictList.industry"
                    :key="item"
                    :value="index"
                    >{{ item }}</a-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item field="majorInvolved" label="所属专业">
                <a-select
                  allow-clear
                  allow-search
                  multiple
                  v-model="formData.majorInvolved"
                  placeholder="请选择所属专业"
                  @change="getIndustryDictEnum(2)"
                  @clear="clearIndustryDictEnum(2)"
                  @remove="removeIndustryDictTag(2)"
                >
                  <a-option
                    v-for="(item, index) of industryDictList.specialities"
                    :key="item"
                    :value="index"
                    >{{ item }}</a-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item field="smallMajorInvolved" label="所属小专业">
                <a-select
                  allow-clear
                  allow-search
                  multiple
                  v-model="formData.smallMajorInvolved"
                  placeholder="请选择所属小专业"
                >
                  <a-option
                    v-for="(item, index) of industryDictList.smallSpecialities"
                    :key="item"
                    :value="index"
                    >{{ item }}</a-option
                  >
                </a-select>
              </a-form-item>
              <a-form-item field="logo" label="企业LOGO">
                <a-upload
                  v-model:file-list="formData.logoList"
                  :headers="headers"
                  list-type="picture-card"
                  :action="UploadPath"
                  accept=".png,.jpg,.gif,.webp,.svg,.docx"
                  :limit="1"
                  image-preview
                  @success="uploadLogoSuccess"
                  @before-remove="(e:FileItem)=>beforeRemove(e, 'logo')"
                >
                  <a-tooltip
                    content="只能上传一张图片，大小不能超过20M。"
                    position="right"
                  >
                    <icon-question-circle-fill class="upload-tip" />
                  </a-tooltip>
                </a-upload>
              </a-form-item>
              <a-form-item
                field="businessScope"
                label="经营内容"
                class="double-width"
              >
                <a-textarea
                  v-model="formData.businessScope"
                  :auto-size="{ maxRows: 6, minRows: 4 }"
                  :max-length="300"
                  show-word-limit
                  placeholder="请输入经营内容"
                  allow-clear
                ></a-textarea>
              </a-form-item>
            </a-row>

            <div class="title"> 联系方式 </div>
            <a-row>
              <a-form-item field="safeMainPerson" label="安全第一责任人">
                <a-input
                  allow-clear
                  v-model="formData.safeMainPerson"
                  placeholder="请输入安全第一责任人"
                ></a-input>
              </a-form-item>
              <a-form-item field="safeMainPersonTel" label="手机号码">
                <a-input
                  v-model.trim="formData.safeMainPersonTel"
                  placeholder="请输入手机号码"
                  allow-clear
                ></a-input>
              </a-form-item>
              <a-form-item field="position" label="当前岗位">
                <a-input
                  v-model.trim="formData.position"
                  placeholder="请输入当前岗位"
                  allow-clear
                ></a-input>
              </a-form-item>
              <a-form-item field="contacts" label="联系人">
                <a-input
                  v-model="formData.contacts"
                  placeholder="请输入联系人"
                  allow-clear
                ></a-input>
              </a-form-item>
              <a-form-item field="contactsTel" label="手机号码">
                <a-input
                  v-model.trim="formData.contactsTel"
                  allow-clear
                  placeholder="请输入手机号码"
                ></a-input>
              </a-form-item>
              <a-form-item field="contactsPosition" label="当前岗位">
                <a-input
                  v-model.trim="formData.contactsPosition"
                  allow-clear
                  placeholder="请输入当前岗位"
                ></a-input>
              </a-form-item>
              <a-form-item field="fax" label="企业传真">
                <a-input
                  v-model.trim="formData.fax"
                  allow-clear
                  placeholder="请输入企业传真"
                ></a-input>
              </a-form-item>
              <a-form-item field="officialUrl" label="企业网址">
                <a-input
                  v-model.trim="formData.officialUrl"
                  allow-clear
                  placeholder="请输入企业网址"
                >
                  <template #prepend> https:// </template>
                </a-input>
              </a-form-item>
            </a-row>

            <div class="title"> 安全信息 </div>
            <a-row>
              <a-form-item field="planFlag" label="是否具备预案及备案">
                <a-select
                  v-model:model-value="formData.planFlag"
                  placeholder="请选择是否具备预案及备案"
                  :fallback-option="false"
                  allow-clear
                >
                  <a-option :value="1">是</a-option>
                  <a-option :value="0">否</a-option>
                </a-select>
              </a-form-item>
              <a-form-item
                field="threeSimultaneousFlag"
                label="是否具备三同时资料"
              >
                <a-select
                  v-model:model-value="formData.threeSimultaneousFlag"
                  :fallback-option="false"
                  placeholder="请选择是否具备三同时资料"
                  allow-clear
                >
                  <a-option :value="1">是</a-option>
                  <a-option :value="0">否</a-option>
                </a-select>
              </a-form-item>
              <a-form-item
                field="safetyProductionFlag"
                label="是否进行安全生产标准化建设"
              >
                <a-select
                  v-model:model-value="formData.safetyProductionFlag"
                  :fallback-option="false"
                  placeholder="请选择是否进行安全生产标准化建设"
                  allow-clear
                >
                  <a-option :value="1">是</a-option>
                  <a-option :value="0">否</a-option>
                </a-select>
              </a-form-item>
              <a-form-item field="safeRegulator" label="安全主管单位">
                <a-input
                  v-model.trim="formData.safeRegulator"
                  allow-clear
                  placeholder="请输入安全主管单位"
                ></a-input>
              </a-form-item>
              <a-form-item field="safeRegulatorPerson" label="安全主管人员">
                <a-input
                  v-model.trim="formData.safeRegulatorPerson"
                  allow-clear
                  placeholder="请输入安全主管人员"
                ></a-input>
              </a-form-item>
              <a-form-item field="safeRegulatorTel" label="手机号码">
                <a-input
                  v-model.trim="formData.safeRegulatorTel"
                  allow-clear
                  placeholder="请输入手机号码"
                ></a-input>
              </a-form-item>
              <a-form-item field="communityInspector" label="社区巡查员">
                <a-input
                  v-model.trim="formData.communityInspector"
                  allow-clear
                  placeholder="请输入社区巡查员"
                ></a-input>
              </a-form-item>
              <a-form-item field="communityInspectorTel" label="手机号码">
                <a-input
                  v-model.trim="formData.communityInspectorTel"
                  allow-clear
                  placeholder="请输入手机号码"
                ></a-input>
              </a-form-item>
            </a-row>

            <div class="title"> 附件信息 </div>
            <a-row>
              <a-form-item field="businessLicenseList" label="营业执照">
                <a-upload
                  v-model:fileList="formData.businessLicenseList"
                  :headers="headers"
                  list-type="picture-card"
                  :action="UploadPath"
                  :limit="1"
                  image-preview
                  accept=".png,.jpg,.gif,.webp,.svg,.docx"
                  @success="uploadBusinessSuccess"
                  @before-remove="(e:FileItem)=>beforeRemove(e, 'business')"
                />
              </a-form-item>
              <a-form-item field="emergency" label="企业总平面图">
                <a-upload
                  v-model:fileList="formData.emergencyList"
                  :headers="headers"
                  list-type="picture-card"
                  :action="UploadPath"
                  :limit="1"
                  image-preview
                  accept=".png,.jpg,.gif,.webp,.svg,.docx"
                  @success="uploadPicSuccess"
                  @before-remove="(e:FileItem)=>beforeRemove(e, 'emergency')"
                >
                  <a-tooltip
                    content="只能上传一张图片，大小不能超过20M。"
                    position="right"
                  >
                    <icon-question-circle-fill class="upload-tip" />
                  </a-tooltip>
                </a-upload>
              </a-form-item>
              <a-form-item field="qualificationInfo" label="资质信息">
                <a-upload
                  v-model:fileList="formData.qualificationInfoList"
                  :headers="headers"
                  list-type="picture-card"
                  :action="UploadPath"
                  :limit="9"
                  image-preview
                  accept="image/*"
                  @success="uploadQualificationSuccess"
                  @before-remove="(e:FileItem)=>beforeRemove(e, 'qualificationInfo')"
                >
                  <a-tooltip
                    content="只能上传九张图片，大小不能超过20M。"
                    position="right"
                  >
                    <icon-question-circle-fill class="upload-tip" />
                  </a-tooltip>
                </a-upload>
              </a-form-item>
            </a-row>
          </a-form>
        </div>
        <div class="second" v-show="tabInfo === '2'">
          <a-form
            ref="accountFormRef"
            :model="accountFormData"
            :rules="accountFormRules"
            :label-col-props="{ span: 5 }"
            :wrapper-col-props="{ span: 19 }"
          >
            <a-form-item field="email" label="登录邮箱" show-colon>
              <a-input
                v-model="accountFormData.email"
                allow-clear
                placeholder="请输入登录邮箱"
              ></a-input>
            </a-form-item>
            <a-form-item field="password" label="登录密码" show-colon>
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
                <a-button
                  type="primary"
                  size="mini"
                  @click="passwordModalVisible = true"
                  >修改密码</a-button
                >
              </div>
              <!-- <a-input-password
                v-model="accountFormData.password"
                allow-clear
                placeholder="输入大小写字母、数字、特殊字符至少两种，8-16字符"
              ></a-input-password> -->
            </a-form-item>
            <a-form-item field="quota" label="子账号额度" show-colon>
              <a-input-number
                v-model="accountFormData.quota"
                allow-clear
                placeholder="请输入子账号额度"
              ></a-input-number>
            </a-form-item>
            <a-form-item field="accountType" label="账号类型" show-colon>
              <a-select
                v-model="accountFormData.accountType"
                allow-clear
                placeholder="请选择账号类型"
              >
                <a-option
                  v-for="item in accountTypeList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="expireTimeType" label="账号过期时间" show-colon>
              <a-radio-group
                v-model="accountFormData.expireTimeType"
                :options="expireStatusList"
                @change="accountFormData.expireTime = undefined"
              >
              </a-radio-group>
            </a-form-item>
            <a-form-item
              v-if="accountFormData.expireTimeType !== 0"
              field="expireTime"
              label=""
            >
              <a-input-number
                v-if="accountFormData.expireTimeType === 2"
                v-model="accountFormData.expireTime"
                placeholder="请输入有效时长"
              >
              </a-input-number>
              <a-date-picker
                style="width: 100%"
                v-if="accountFormData.expireTimeType === 1"
                v-model="accountFormData.expireTime"
                placeholder="请选择账号过期日期"
              >
              </a-date-picker>
            </a-form-item>
            <a-form-item field="status" label="账号状态" show-colon>
              <a-switch
                v-model="accountFormData.status"
                :checked-value="0"
                :unchecked-value="1"
                :before-change="changeAccountStatus"
              >
                <template #checked> 启用 </template>
                <template #unchecked> 禁用 </template>
              </a-switch>
            </a-form-item>
            <a-form-item field="remark" label="备注" show-colon>
              <a-textarea
                v-model="accountFormData.remark"
                allow-clear
                :max-length="300"
                :auto-size="{
                  minRows: 6,
                  maxRows: 6,
                }"
                show-word-limit
                placeholder="请输入备注"
              ></a-textarea>
            </a-form-item>
          </a-form>
        </div>
        <div class="third" v-show="tabInfo === '3'">
          <permissionConfig
            v-model:pc-permission-list="permissionList.pcPermissionList"
            v-model:wx-permission-list="permissionList.wxPermissionList"
          />
        </div>
      </div>
      <div class="btn">
        <a-space>
          <a-button @click="goBack">取消</a-button>
          <a-button type="primary" @click="submit">保存</a-button>
        </a-space>
      </div>
    </a-card>
    <a-modal
      :visible="passwordModalVisible"
      title="修改密码"
      title-align="start"
      @ok="changePassword"
      @cancel="closePasswordModal"
    >
      <a-form ref="passwordFormRef" :model="passwordForm">
        <a-form-item
          field="newPassword"
          label="新密码"
          :rules="accountFormRules.password"
        >
          <a-input-password
            v-model="passwordForm.newPassword"
            allow-clear
            placeholder="输入大小写字母、数字、特殊字符至少两种，8-16字符"
          ></a-input-password>
        </a-form-item>
        <a-form-item
          field="rePassword"
          label="新密码确认"
          :rules="[
            {
              required: true,
              validator(value, callback) {
                //@ts-ignore
                if (value !== passwordForm.newPassword) {
                  callback('两次密码不一致');
                } else {
                  callback();
                }
              },
            },
          ]"
        >
          <a-input-password
            v-model="passwordForm.rePassword"
            allow-clear
            placeholder="请再次输入密码"
          ></a-input-password>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
  import { phoneRegExp, faxRegExp } from '@/utils/index';
  import { storeToRefs } from 'pinia';
  import { ref, h, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useEnterpriseStore } from '@/store';
  import { Modal, Message, Form } from '@arco-design/web-vue';
  import ConfirmModalBody from '@/components/confirm/index.vue';
  import { UploadPath, getEnumListAPI } from '@/api/index';
  import {
    changePasswordApi,
    companyDetailByIdAPI,
    createCompanyDetailAPI,
    getIndustryDict,
    updateCompanyDetailAPI,
  } from '@/api/enterpriseManage';
  import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
  import permissionConfig from './components/permissionConfig.vue';
  import _ from 'lodash';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  export default {
    name: 'EnterpriseManageAdd',
  };
</script>

<script lang="ts" setup>
  // 请求头？ 应该来自store
  const headers = ref<Record<string, string>>({
    Authorization: 'Bearer testSec_1_1',
  });

  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const enterpriseStore = useEnterpriseStore();
  const { enterpriseInfo } = storeToRefs(enterpriseStore);

  // -------------------------- 前置数据 ----------------------

  const companyTypeEnum = ref<any>({});

  const getCompanyTypeEnum = async () => {
    const { data } = await getEnumListAPI('COMPANY_TYPE');
    companyTypeEnum.value = data;
  };

  getCompanyTypeEnum();

  const industryDictList = ref<industryDictType>({
    industry: {},
    specialities: {},
    smallSpecialities: {},
  });
  type industryDictType = {
    industry: { [key: number]: string };
    specialities: { [key: number]: string };
    smallSpecialities: { [key: number]: string };
  };

  const getIndustryDictEnum = _.debounce(async (level: 0 | 1 | 2) => {
    const levelObj: { [key: number]: keyof industryDictType } = {
      0: 'industry',
      1: 'specialities',
      2: 'smallSpecialities',
    };
    const keyObj: { [x: number]: string } = {
      0: 'industryInvolved',
      1: 'majorInvolved',
      2: 'smallMajorInvolved',
    };
    const parentKey = formData.value[keyObj[level - 1]]?.join(',');
    const { data } = await getIndustryDict({
      code: levelObj[level],
      key: parentKey || '0',
    });
    industryDictList.value[levelObj[level]] = data;
  }, 0);

  const clearIndustryDictEnum = (level: 1 | 2) => {
    const levelObj: { [key: number]: keyof industryDictType } = {
      1: 'specialities',
      2: 'smallSpecialities',
    };
    const keyObj = { 1: 'majorInvolved', 2: 'smallMajorInvolved' };
    for (let i = level; i < 3; i++) {
      if (formData.value[keyObj[i]]) {
        formData.value[keyObj[i]] = [];
        industryDictList.value[levelObj[i]] = {};
      }
    }
  };

  const removeIndustryDictTag = _.debounce(async (level: 1 | 2) => {
    const levelObj: { [key: number]: keyof industryDictType } = {
      1: 'specialities',
      2: 'smallSpecialities',
    };
    const keyObj: { [x: number]: string } = {
      0: 'industryInvolved',
      1: 'majorInvolved',
      2: 'smallMajorInvolved',
    };
    for (let i = level; i < 3; i++) {
      const parentKey = formData.value[keyObj[i - 1]]?.join(',');
      const { data }: { data: { [key: number]: string } } =
        await getIndustryDict({
          code: levelObj[i],
          key: parentKey || '0',
        });
      industryDictList.value[levelObj[i]] = data;
      formData.value[keyObj[i]] = formData.value[keyObj[i]].filter(
        (ele: number) => ele in data
      );
    }
  }, 500);

  // ------------------------ 表单 -------------------------------
  interface formDataType {
    [x: string]: any | undefined;
    companyName: string;
    industryInvolved?: any[];
    majorInvolved?: any[];
    smallMajorInvolved?: any[];
    logoList?: any[];
    businessLicenseList?: any[];
    emergencyList?: any[];
    qualificationInfoList?: any[];
  }

  const formData = ref<formDataType>({
    companyName: '',
  });

  const form = ref();

  const rules = ref({
    companyName: [
      { required: true, message: '请输入企业名称' },
      { maxLength: 25, message: '不能超过25字符' },
    ],
    socialcreditCode: [
      {
        validator: (value: string, callback: Function) => {
          const regexp = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/;
          if (value && !regexp.test(value)) {
            callback('请输入正确的统一社会信用代码');
          } else {
            callback();
          }
        },
      },
    ],
    establishmentDate: [
      {
        validator: (value: string, callback: Function) => {
          if (value && +new Date(value) > +new Date()) {
            callback('不能选择当前日期之后的时间');
          } else {
            callback();
          }
        },
      },
    ],
    registeredAddress: [{ maxLength: 60, message: '不能超过60字符' }],
    companyArea: [{ maxLength: 60, message: '不能超过60字符' }],
    enterpriseAddress: [{ maxLength: 60, message: '不能超过60字符' }],
    belongGroup: [{ maxLength: 25, message: '不能超过25字符' }],
    safeMainPerson: [{ maxLength: 25, message: '不能超过25字符' }],
    safeMainPersonTel: [
      {
        validator: (value: string, callback: Function) => {
          if (value && !phoneRegExp.test(value)) {
            callback('请输入正确的手机号');
          } else {
            callback();
          }
        },
      },
    ],
    position: [{ maxLength: 20, message: '不能超过20字符' }],
    contactsPosition: [{ maxLength: 20, message: '不能超过20字符' }],
    officialUrl: [{ maxLength: 100, message: '不能超过100字符' }],
    fax: [
      {
        validator: (value: string, callback: Function) => {
          if (value && !faxRegExp.test(value)) {
            callback(
              '请输入正确的传真号码：区号-电话号码-分机号，分机号可以没有'
            );
          } else {
            callback();
          }
        },
      },
    ],
    //  安全信息
    safeRegulator: [{ maxLength: 40, message: '不能超过40字符' }],
    safeRegulatorPerson: [{ maxLength: 25, message: '不能超过25字符' }],
    safeRegulatorTel: [
      {
        validator: (value: string, callback: Function) => {
          if (value && !phoneRegExp.test(value)) {
            callback('请输入正确的手机号');
          } else {
            callback();
          }
        },
      },
    ],
    communityInspector: [{ maxLength: 25, message: '不能超过25字符' }],
    communityInspectorTel: [
      {
        validator: (value: string, callback: Function) => {
          if (value && !phoneRegExp.test(value)) {
            callback('请输入正确的手机号');
          } else {
            callback();
          }
        },
      },
    ],
    // 联系方式
    contacts: [
      { required: true, message: '请输入联系人' },
      { maxLength: 25, message: '不能超过25字符' },
    ],
    contactsTel: [
      { required: true, message: '请输入手机号码' },
      {
        validator: (value: string, callback: Function) => {
          if (value && !phoneRegExp.test(value)) {
            callback('请输入正确的手机号');
          } else {
            callback();
          }
        },
      },
    ],
  });

  // 附件上传
  const uploadLogoSuccess = (e: FileItem) => {
    const { response } = e;

    if (response.code < 200) {
      // console.log('model:', formData.value.logoList, response);
      formData.value.logoList = formData.value.logoList?.map((item: any) => {
        return {
          ...item,
          response,
        };
      });
      formData.value.logo = response.data[0].fileName;
    } else {
      Message.error({
        content: '上传失败，原因为=' + response.msg,
      });
    }
  };

  const uploadPicSuccess = (e: FileItem) => {
    const { response } = e;

    if (response.code < 200) {
      formData.value.emergencyList = formData.value.emergencyList?.map(
        (item: any) => {
          return {
            ...item,
            response,
          };
        }
      );
      formData.value.emergency = response.data[0].fileName;
    } else {
      Message.error({
        content: '上传失败，原因为=' + response.msg,
      });
    }
  };
  const uploadBusinessSuccess = (e: FileItem) => {
    const { response } = e;

    if (response.code < 200) {
      formData.value.businessLicenseList =
        formData.value.businessLicenseList?.map((item: any) => {
          return {
            ...item,
            response,
          };
        });
      formData.value.businessLicense = response.data[0].fileName;
    } else {
      Message.error({
        content: '上传失败，原因为=' + response.msg,
      });
    }
  };
  const uploadQualificationSuccess = (e: FileItem) => {
    const { response } = e;

    if (response.code < 200) {
      formData.value.qualificationInfoList =
        formData.value.qualificationInfoList?.map((item: any) => {
          return {
            ...item,
            response,
          };
        });
      formData.value.qualificationInfo = formData.value.qualificationInfo
        ? formData.value.qualificationInfo + ',' + response.data[0].fileName
        : response.data[0].fileName;
    } else {
      Message.error({
        content: '上传失败，原因为=' + response.msg,
      });
    }
  };

  const beforeRemove = (
    file: FileItem,
    attribute: string
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      Modal.open({
        title: '提示',
        titleAlign: 'start',
        content: () =>
          h(ConfirmModalBody, {
            info: '删除数据不可恢复，请谨慎操作！',
          }),
        onOk: () => {
          switch (attribute) {
            case 'logo':
              formData.value.logo = '';
              break;
            case 'emergency':
              formData.value.emergency = '';
              break;
            case 'business':
              formData.value.business = '';
              break;
            case 'qualificationInfo':
              const fileArr = formData.value.qualificationInfo
                .toString()
                .split(',');
              const delFileThumb = file.url.match(/%2F%2F(.+?)\?/)[1];
              formData.value.qualificationInfo = fileArr
                .filter((item: string) => item.split('//')[1] !== delFileThumb)
                .join(',');
              break;
            default:
              break;
          }

          return resolve(true);
        },
        onCancel: () => reject('cancel'),
      });
    });
  };

  const loading = ref(false);

  const submit = async () => {
    loading.value = true;
    const resultForm = await form.value.validate();
    if (resultForm) {
      tabInfo.value = '1';
      Message.warning('企业信息验证不通过');
      return;
    }
    const resultAccount = await accountFormRef.value.validate();
    if (resultAccount) {
      tabInfo.value = '2';
      Message.warning('账号信息验证不通过');
      return;
    }
    if (accountFormData.value.expireTimeType === 2) {
      accountFormData.value.expireTime = dayjs()
        .endOf('day')
        .add(accountFormData.value.expireTime, 'day')
        .format('YYYY-MM-DD');
    }
    const params = {
      account: {
        ...accountFormData.value,
        expireTime: new Date(accountFormData.value.expireTime).setHours(
          23,
          59,
          59
        ),
      },
      info: {
        ...formData.value,
        establishmentDate: new Date(formData.value.establishmentDate),
        industryInvolved: formData.value.industryInvolved?.join(','),
        majorInvolved: formData.value.majorInvolved?.join(','),
        smallMajorInvolved: formData.value.smallMajorInvolved?.join(','),
      },
      permissionInfo: permissionList.value,
    };
    await updateCompanyDetailAPI(params);
    Message.success('保存成功');
    router.back();
    loading.value = false;
  };

  // 第二部分
  const accountFormRef = ref<any>(null);
  const accountTypeList = [
    { label: '客户正式账号', value: 0 },
    { label: '客户试用账号', value: 1 },
    { label: '演示账号', value: 2 },
  ];
  const expireStatusList = [
    { label: '填写有效时长', value: 2 },
    { label: '选择过期日期', value: 1 },
    { label: '长期有效', value: 0 },
  ];
  const accountFormData = ref<any>({
    status: 0,
  });
  const accountFormRules = {
    email: [
      {
        required: true,
        validator: (value: any, callback: Function) => {
          const emailRegexp =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!value) {
            callback('请输入邮箱');
          } else if (!emailRegexp.test(value)) {
            callback('请输入正确的邮箱');
          }
          callback();
        },
      },
    ],
    password: [
      {
        required: true,
        validator: (value: any, callback: Function) => {
          const regexp =
            /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]{8,16})$/;
          if (!value) {
            callback('请输入登录密码');
          } else if (!regexp.test(value)) {
            callback('密码必须是大小写字母、数字、特殊字符至少两种，8-16字符');
          }
          callback();
        },
      },
    ],
    quota: [{ required: true, message: '请输入子账号额度' }],
    accountType: [{ required: true, message: '请选择账号类型' }],
    expireTimeType: [{ required: true, message: '请选择账号过期时间' }],
    expireTime: [
      {
        required: accountFormData.value.expireTimeType !== 0,
        message:
          accountFormData.value.expireTimeType === 2
            ? '请输入有效时长'
            : '请选择账号过期日期',
      },
    ],
    status: [{ required: true, message: '请选择账号状态' }],
  };

  // tab
  const tabInfo = ref('1');
  const tabLists = [
    { code: '1', name: '企业信息' },
    { code: '2', name: '账号信息' },
    { code: '3', name: '权限配置' },
  ];

  const route = useRoute();
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
      industryInvolved: data.info.baseInfo.industryInvolved.split(','),
      majorInvolved: data.info.baseInfo.majorInvolved.split(','),
      smallMajorInvolved: data.info.baseInfo.smallMajorInvolved.split(','),
      logoList: data.info.baseInfo.logoList?.map((ele: string) => ({
        url: ele,
      })),
      businessLicenseList: data.info.accessoryInfo.businessLicenseList?.map(
        (ele: string) => ({ url: ele })
      ),
      emergencyList: data.info.accessoryInfo.emergencyList?.map(
        (ele: string) => ({ url: ele })
      ),
      qualificationInfoList: data.info.accessoryInfo.qualificationInfoList?.map(
        (ele: string) => ({ url: ele })
      ),
      employeesNum: Number(data.info.baseInfo.employeesNum),
      planFlag: data.info.safeInfo.planFlag ? 1 : 0,
      safetyProductionFlag: data.info.safeInfo.safetyProductionFlag ? 1 : 0,
      threeSimultaneousFlag: data.info.safeInfo.threeSimultaneousFlag ? 1 : 0,
    };
    accountFormData.value = {
      ...data.account,
      expireTime:
        data.account.expireTimeType === 2
          ? dayjs(data.account.expireTime).diff(dayjs(), 'day')
          : data.account.expireTime,
    };
    permissionList.value = data.permissionInfo;

    let len = formData.value.majorInvolved
      ? formData.value.smallMajorInvolved
        ? 3
        : 2
      : 1;
    for (let i = 0; i < len; i++) {
      getIndustryDictEnumNotDebounce(i as 0 | 1 | 2);
    }
  };

  const getIndustryDictEnumNotDebounce = async (level: 0 | 1 | 2) => {
    const levelObj: { [key: number]: keyof industryDictType } = {
      0: 'industry',
      1: 'specialities',
      2: 'smallSpecialities',
    };
    const keyObj: { [x: number]: string } = {
      0: 'industryInvolved',
      1: 'majorInvolved',
      2: 'smallMajorInvolved',
    };
    const parentKey = formData.value[keyObj[level - 1]]?.join(',');
    const { data } = await getIndustryDict({
      code: levelObj[level],
      key: parentKey || '0',
    });
    industryDictList.value[levelObj[level]] = data;
  };

  getDetailData();

  const changeAccountStatus = (val: 0 | 1) => {
    // 禁用的时候要做提醒
    const personNum = accountFormData.value.usedQuota;
    if (val && personNum) {
      return new Promise((resolve) => {
        Modal.open({
          title: '提示',
          titleAlign: 'start',
          content: () =>
            h(ConfirmModalBody, {
              content: `禁用该企业同时也会禁用该企业下的${personNum}个用户，是否确认禁用？`,
              info: '',
            }),
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });
    }
  };

  // 密码相关
  const passwordVisible = ref(true);
  const password = computed(() => accountFormData.value.password || '');
  const passwordText = computed(() => {
    return passwordVisible.value
      ? password.value.replace(/./g, '*')
      : password.value;
  });
  // 修改密码弹窗
  const passwordFormRef = ref<InstanceType<typeof Form> | null>(null);
  const passwordModalVisible = ref(false);
  const passwordForm = ref<any>({
    newPassword: '',
    rePassword: '',
  });
  const changePassword = async () => {
    const result = await passwordFormRef.value?.validate();
    if (result) return;
    await changePasswordApi({
      entId: id,
      email: accountFormData.value.email,
      newPassword: passwordForm.value.newPassword,
    });
    Message.success('修改成功');
    accountFormData.value.password = passwordForm.value.newPassword;
    closePasswordModal();
  };
  const closePasswordModal = () => {
    passwordModalVisible.value = false;
    passwordForm.value = {
      newPassword: '',
      rePassword: '',
    };
  };
</script>

<style lang="less" scoped>
  .arco-card.content-card {
    .header {
      font-size: 18px;
      .title {
        margin-left: 8px;
      }
    }
    .steps {
      margin: 20px 0 0 24px;
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
    }
    .first {
      width: 100%;
      min-height: 400px;
      margin-bottom: 20px;
      .title {
        margin: 30px 25px 20px;
        font-size: 16px;
        font-family: '思源黑体 Medium';
        .arco-divider-vertical {
          margin-right: 2px;
          border-left: 1px solid #409eff;
        }
      }

      .arco-form-item {
        width: calc(100% / 3 - 100px);
        // margin: 10px 50px;
        margin-left: 50px;
        margin-right: 50px;
        &.double-width {
          width: calc((100% / 3 - 100px) * 2 + 100px);
        }
        .arco-input-prepend {
          color: #aeb2c2;
        }
      }
      .form-item-space {
        margin-top: 14px;
        .icon {
          margin-right: 8px;
        }
      }
    }
    .second {
      width: 40%;
      min-height: 400px;
      margin: 20px auto;
    }
    .third {
      margin: 20px 0 0 24px;
    }
    .forth {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .success-text {
        font-family: '思源黑体 Medium';
        font-size: 20px;
        color: #666666;
      }
    }
  }

  .btn {
    margin-top: 12px;
    width: 100%;
    text-align: center;
  }
</style>
