<template>
  <a-card class="card-table">
    <div v-if="props.title" class="title">
      <icon-left class="title-icon" @click="goBack" />
      <span class="text">{{ props.title }}</span>
    </div>
    <div class="header-tips">
      <slot name="headerTips"></slot>
    </div>
    <div class="header">
      <div class="input">
        <slot name="headerInput"></slot>
      </div>
      <!-- <div class="hr"><a-divider direction="vertical" /></div> -->
      <div class="input-btn">
        <slot name="headerBtn"></slot>
      </div>
    </div>
    <a-divider />
    <div class="content">
      <div class="table-btn">
        <div class="primary">
          <slot name="primaryBtn"></slot>
        </div>
        <div class="minor">
          <!-- <a-space>
            <icon-refresh class="minor-icon" size="20" />
          </a-space> -->
          <!-- <slot name="minorBtn"></slot> -->
          <!-- <a-space v-if="slotRefresh">
            <icon-refresh
              v-preventReClick
              class="minor-icon"
              size="20"
              @click="reload"
            />
          </a-space> -->
        </div>
      </div>
      <div ref="table" class="list-card-table">
        <slot name="table"></slot>
      </div>
      <div class="pagination" v-if="slotPage"
        ><slot name="pagination"></slot
      ></div>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { inject, onMounted, ref, nextTick, useSlots } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTableList } from './composition/useTableList';
</script>

<script lang="ts" setup>
  // const reload: () => void = inject('reload')!;

  const props = defineProps({
    title: {
      type: String,
    },
    autoTableHeight: {
      type: Boolean,
      default: true,
    },
  });
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const slotPage = useSlots().pagination;

  const slotRefresh = useSlots().minorBtn;

  const table = ref(null);

  const { handleTableHeight, handleLabelWidth } = useTableList();

  const resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      handleTableHeight();
      window.addEventListener('resize', handleTableHeight);
    });
  });

  onMounted(() => {
    handleLabelWidth();
    if (props.autoTableHeight) {
      resizeObserver.observe(table.value as unknown as Element);
    }
  });

  defineExpose({
    handleTableHeight,
  });
</script>

<style lang="less" scoped>
  :deep(.icon) {
    margin-right: 10px;
  }

  .arco-card.card-table {
    width: 100%;

    .title {
      margin-bottom: 20px;

      .title-icon {
        cursor: pointer;
        margin-right: 10px;
      }

      .text {
        font-size: 18px;
        // letter-spacing: 0.5em;
      }
    }

    .header {
      display: flex;
      // height: 80px;
      max-height: 120px;
      // margin-bottom: 10px;

      .input {
        flex: 1;
      }

      .input-btn {
        // width: 8%;
        display: flex;
        align-items: center;
        // flex-wrap: wrap;
        padding-left: 20px;
        border-left: 1px solid #e5e6eb;
      }
    }

    .content {
      .table-btn {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        .minor {
          display: flex;
          align-items: center;

          :deep(.minor-icon) {
            margin-right: 10px;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      :deep(.arco-spin) {
        display: block;
      }

      .pagination {
        display: flex;
        justify-content: flex-end;
        // padding-top: 20px;
        margin-top: 12px;
        width: 100%;
      }
    }
  }

  .arco-card.card-pagenation {
    height: 60px;
    width: calc(100% - 280px);
    position: fixed;
    bottom: 20px;
    // right: 80px;
  }

  :deep(.arco-divider-vertical) {
    min-height: 32px;
    max-height: 74px;
  }

  :deep(.header) {
    .arco-input-wrapper,
    .arco-select,
    .arco-textarea,
    .arco-select-view-single,
    .arco-picker {
      width: 260px;
    }

    .arco-picker-range {
      // 因为组件库设置了默认行内样式
      width: 260px !important;
      margin: 0 !important;
    }

    .arco-form-item {
      margin: 6px 0;
      width: calc(100% / 3);
      max-width: calc(100% / 3);
    }

    .arco-space-item {
      margin-top: 4px;
    }
  }
</style>
