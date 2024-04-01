<!-- 企业管理：基础信息 -->
<template>
  <div class="container">
    <a-card class="base-info">
      <div class="header">
        <div class="title-box">
          <div class="title">{{ data.companyName }}</div>
          <div class="code">{{
            '统一社会信用代码：' + data?.socialcreditCode
          }}</div>

          <div class="preview" v-if="data.businessLicenseList" @click="preview"
            >营业执照查看</div
          >
          <a-image-preview
            :src="data.businessLicenseList || []"
            v-model:visible="visible"
          />
        </div>
      </div>
      <div class="crad-list">
        <div class="item">
          <div class="title"> 企业logo </div>
          <div class="picture">
            <a-image-preview-group infinite v-if="data.logoList">
              <a-image
                width="100%"
                height="75%"
                :src="data?.logoList"
                fit="contain"
              />
            </a-image-preview-group>
          </div>
        </div>
        <div class="item">
          <div class="title"> 企业状态 </div>
          <div
            class="content"
            :style="{ color: data.status === 0 ? '#43cf7c' : 'D43030' }"
            >{{ data.status === 0 ? '启用' : '禁用' }}</div
          >
        </div>
        <div class="item">
          <div class="title"> 企业类型 </div>
          <div class="title second">
            {{ data?.companyTypeName }}
          </div>
          <div class="title" style="margin-top: 24px"> 成立时间 </div>
          <div class="title second">
            {{ data?.establishmentDate }}
          </div>
        </div>
        <div class="item">
          <div class="title"> 所属行业 </div>
          <div class="title second">
            {{ data?.industryInvolvedName }}
          </div>
          <div class="title" style="margin-top: 24px"> 所属集团 </div>
          <div class="title second">
            {{ data?.belongGroup }}
          </div>
        </div>
        <div class="item">
          <div class="title"> 注册地址 </div>
          <div class="title second">
            {{ data?.registeredAddress }}
            <i
              class="iconfont icon-weizhi icon"
              style="color: rgba(22, 93, 255, 1)"
            ></i
          ></div>
          <div class="title" style="margin-top: 24px"> 归属区域 </div>
          <div class="title second"> {{ data.companyArea }} </div>
        </div>
      </div>
    </a-card>
    <!-- 详细信息卡片 -->
    <a-card class="detail-info" title="详细信息">
      <div class="base-info">
        <div class="title"> 基本信息 </div>
        <div class="content">
          <a-row :gutter="[0, 30]">
            <a-col :span="8" class="item-col">
              <div class="label">企业地址：</div>
              <div class="value">{{ data?.enterpriseAddress }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">员工总数：</div>
              <div class="value">{{ data?.employeesNum }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">所属专业：</div>
              <div class="value">{{ data?.majorInvolvedName }}</div>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 30]">
            <a-col :span="8" class="item-col">
              <div class="label">所属小专业：</div>
              <div class="value">{{ data?.smallMajorInvolvedName }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">企业传真：</div>
              <div class="value">{{ data?.fax }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">企业网址：</div>
              <div class="value">{{ data?.officialUrl }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="cancat">
        <div class="title"> 联系方式 </div>
        <div class="content">
          <a-row :gutter="[0, 30]">
            <a-col :span="8" class="item-col">
              <div class="label">安全第一责任人：</div>
              <div class="value">{{ data?.safeMainPerson }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">手机号码：</div>
              <div class="value">{{ data?.safeMainPersonTel }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">当前职位：</div>
              <div class="value">{{ data?.position }}</div>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 30]">
            <a-col :span="8" class="item-col">
              <div class="label">联系人：</div>
              <div class="value">{{ data?.contacts }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">手机号码：</div>
              <div class="value">{{ data?.contactsTel }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">当前职位：</div>
              <div class="value">{{ data?.contactsPosition }}</div>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 30]">
            <a-col :span="8" class="item-col">
              <div class="label">安全办公室：</div>
              <div class="value">{{ data?.office }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">手机号码：</div>
              <div class="value">{{ data?.officeTel }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">当前职位：</div>
              <div class="value">{{ data?.officePosition }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="safety-info">
        <div class="title"> 安全信息 </div>
        <div class="content">
          <a-row :gutter="[0, 30]" class="specil-row">
            <a-col :span="8" class="item-col">
              <div class="label">是否具备预案及备案：</div>
              <div class="value">{{ data?.planFlag ? '是' : '否' }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">是否具备三同时资料：</div>
              <div class="value">{{
                data?.threeSimultaneousFlag ? '是' : '否'
              }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">是否进行安全生产标准化建设：</div>
              <div class="value">{{
                data?.safetyProductionFlag ? '是' : '否'
              }}</div>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 30]" class="specil-row">
            <a-col :span="8" class="item-col">
              <div class="label">安全主管单位：</div>
              <div class="value">{{ data?.safeRegulator }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">安全主管人员：</div>
              <div class="value">{{ data?.safeRegulatorPerson }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">手机号码：</div>
              <div class="value">{{ data?.safeRegulatorTel }}</div>
            </a-col>
          </a-row>
          <a-row :gutter="[0, 30]" class="specil-row">
            <a-col :span="8" class="item-col">
              <div class="label">社区巡检员：</div>
              <div class="value">{{ data?.communityInspector }}</div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">手机号码：</div>
              <div class="value">{{ data?.communityInspectorTel }}</div>
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="extra-info">
        <div class="title"> 附件信息 </div>
        <div class="content">
          <a-row :gutter="[0, 30]">
            <a-col :span="8" class="item-col">
              <div class="label">营业执照：</div>
              <div class="value">
                <a-image-preview-group infinite v-if="data.businessLicenseList">
                  <a-image
                    width="100%"
                    height="100%"
                    fit="contain"
                    :src="data.businessLicenseList || []"
                    alt=""
                  />
                </a-image-preview-group>
              </div>
            </a-col>
            <a-col :span="8" class="item-col">
              <div class="label">企业总平面图：</div>
              <div class="value">
                <a-image-preview-group infinite v-if="data.emergencyList">
                  <a-image
                    width="100%"
                    height="100%"
                    fit="contain"
                    :src="data.emergencyList"
                    alt=""
                  />
                </a-image-preview-group>
              </div>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { ref, toRef, toRefs } from 'vue';
  export default {
    name: 'BaseInfo',
  };
</script>

<script lang="ts" setup>
  const visible = ref(false);

  const preview = () => {
    visible.value = true;
  };

  const props = defineProps({
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const data = toRef(props, 'data');
</script>

<style lang="less" scoped>
  :deep(.arco-card-header) {
    font-size: 20px;
    background-color: var(--color-white) !important;
    border-bottom: none !important;
  }
  .container {
    font-family: '思源黑体';
    .arco-card.base-info {
      margin-bottom: 16px;
      .arco-card-size-medium .arco-card-body {
        padding: 20px;
      }
      .header {
        padding-bottom: 24px;
        width: 100%;
        display: flex;
        .title-box {
          display: flex;
          align-items: baseline;
          flex: 1;
          .title {
            font-size: 20px;
            font-weight: 500;
            font-family: '思源黑体 Medium';
            line-height: 28px;
            margin-right: 20px;
            color: #1d2129;
          }
          .code {
            margin-left: 10px;
            font-size: 12px;
            color: #808080;
          }
          .preview {
            cursor: pointer;
            font-size: 12px;
            line-height: 16px;
            font-weight: 400;
            margin-left: 20px;
            text-decoration: underline;
            color: rgba(22, 93, 255, 1);
          }
        }
        .btn {
          width: 80px;
        }
      }
      .info {
        padding-right: 16px;
        .item-col {
          display: flex;
          .label {
            color: #7e7e7e;
            font-size: 14px;
            text-align: right;
            width: 70px;
          }
          .value {
            color: #333;
            font-size: 14px;
            text-align: left;
          }
        }
      }
    }
    .arco-card.risk-lever {
      :deep(.arco-card-body) {
        padding-top: 0px !important;
      }
      margin-bottom: 16px;
      .item {
        height: 135px;
        width: 24%;
      }
      .one {
        color: rgb(212, 48, 48) !important;
      }
      .two {
        color: rgb(245, 154, 35) !important;
      }
      .three {
        color: rgb(255, 223, 37) !important;
      }
      .four {
        color: rgb(53, 124, 240) !important;
      }
      :deep(.arco-card-header) {
        margin-top: 10px;
        margin-bottom: 2px;
        font-family: '思源黑体 Medium';
        font-weight: 500;
      }
      .content {
        font-family: '思源黑体 Medium';
        font-weight: 500;
        font-size: 28px;
      }
      .desc {
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(78, 89, 105, 1);
        font-family: '思源黑体';
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
      }
    }
    .arco-card.detail-info {
      :deep(.arco-card-body) {
        padding-top: 0px !important;
      }
      :deep(.arco-card-header) {
        font-family: '思源黑体 Medium';
        font-weight: 500;
        margin-top: 10px;
        margin-bottom: -10px;
      }
      :deep(.arco-card-body) {
        padding-left: 40px !important;
      }
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      :deep(.arco-divider-vertical) {
        margin-right: 2px;
        border-left: 1px solid #409eff;
      }
      .arco-descriptions {
        margin: 30px;
        padding: 0 20px;
        :deep(.arco-descriptions-row) {
          margin: 10px 0;
        }
      }
      .title {
        margin: 20px 0;
        font-family: '思源黑体 Medium';
        font-weight: 500;
        font-size: 16px;
        color: rgba(29, 33, 41, 1);
      }
      .content {
        padding: 0 20px;
        .item-col {
          display: flex;
          .label {
            color: #7e7e7e;
            font-size: 14px;
            text-align: right;
            width: 200px;
          }
          .value {
            flex: 1;
            color: #333;
            font-size: 14px;
            text-align: left;
          }
        }
        .specil-row {
          .item-col {
            .label {
              width: 200px;
            }
          }
        }
      }
    }
    .arco-card.certificate {
      :deep(.arco-card-header) {
        font-family: '思源黑体 Medium';
        font-weight: 500;
        margin-top: 10px;
        margin-bottom: 2px;
      }
      :deep(.arco-card-body) {
        padding-top: 0px !important;
      }
      margin-bottom: 16px;
      :deep(.arco-card-body) {
        display: flex;
        flex-wrap: wrap;
        .img {
          width: calc(100% / 4 - 20px);
          height: 162px;
          margin: 10px;
          border: 1px rgba(229, 232, 239, 1) solid;
          border-radius: 4px;
          padding: 5px;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
    .arco-card.accident-record {
      margin-bottom: 16px;
      :deep(.arco-card-body) {
        .arco-timeline-item-content {
          font-size: 12px;
          color: var(--color-text-3);
        }
        .arco-timeline-item-label {
          margin: 6px 0;
          .arco-card.item-card {
            border-radius: 4px;
            // box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
            .arco-card-body {
              padding: 6px 10px;
              display: flex;
              .img {
                width: 30px;
                height: 30px;
                font-size: 26px;
                color: #ccc;
              }
              .info {
                flex: 1;
                margin: 0 8px;
                color: #999;
                font-size: 12px;
                .event-name {
                  margin-right: 4px;
                  color: #666;
                  font-size: 14px;
                }
                .event-detail {
                  color: #666;
                }
              }
            }
          }
        }
      }
      :deep(.arco-card-header) {
        font-family: '思源黑体 Medium';
        font-weight: 500;
        margin-top: 10px;
        margin-bottom: 2px;
      }
      :deep(.arco-card-body) {
        padding-top: 0px !important;
      }
    }
    .extra-info {
      .img {
        width: 160px;
        height: 160px;
        object-fit: contain;
      }
    }
    //
    :deep(.arco-card) {
      // min-height: 94%;
      .header {
        .arco-input-wrapper {
          width: 200px;
        }
        .search {
          margin-left: 20px;
        }
      }
      .content {
        margin-top: 20px;
        .column-btn {
          border-radius: 4px;
        }
      }
    }
  }
  .crad-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      width: 19%;
      height: 162px;
      border: 1px #e5e8ef solid;
      display: flex;
      flex-direction: column;
      padding: 16px;
      border-radius: 4px;
      .title {
        font-size: 14px;
        font-weight: 500;
        height: 10%;
        margin-bottom: 10px;
        color: #1d2129;
      }
      .picture {
        display: flex;
        justify-content: center;
        align-items: end;
        height: 90%;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(29, 33, 41, 1);
        font-family: '思源黑体 Medium';
        font-size: 20px;
        font-weight: 500;
        height: 40%;
      }
      .second {
        margin-top: 5px;
        color: rgba(134, 144, 156, 1);
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
</style>
