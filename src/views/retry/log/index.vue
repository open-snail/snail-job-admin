<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { ref } from 'vue';
import { useBoolean } from '@sa/hooks';
import { fetchBatchDeleteRetryLog, fetchDeleteRetryLog, fetchRetryLogById, fetchRetryLogPageList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { retryTaskStatusTypeRecord, retryTaskTypeRecord } from '@/constants/business';
import { tagColor } from '@/utils/common';
import RetryLogSearch from './modules/retry-log-search.vue';
import RetryLogDetailDrawer from './modules/retry-log-detail-drawer.vue';

const appStore = useAppStore();

/** 详情页属性数据 */
const detailData = ref<Api.RetryLog.RetryLog | null>();
/** 详情页可见状态 */
const { bool: detailVisible, setTrue: openDetail } = useBoolean(false);

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchRetryLogPageList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    uniqueId: null,
    groupName: null,
    sceneName: null,
    idempotentId: null,
    bizNo: null,
    retryStatus: null
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,
      disabled: row => row.retryStatus !== 1
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'uniqueId',
      title: $t('page.retryLog.UniqueId'),
      align: 'left',
      minWidth: 120,
      render: row => {
        async function showDetailDrawer() {
          await loadRetryInfo(row);
          openDetail();
        }

        return (
          <n-button text tag="a" type="primary" onClick={showDetailDrawer} class="ws-normal">
            {row.uniqueId}
          </n-button>
        );
      }
    },
    {
      key: 'groupName',
      title: $t('page.retryLog.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'sceneName',
      title: $t('page.retryLog.sceneName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'retryStatus',
      title: $t('page.retryLog.retryStatus'),
      align: 'left',
      minWidth: 120,
      render: row => {
        if (row.retryStatus === null) {
          return null;
        }
        const label = $t(retryTaskStatusTypeRecord[row.retryStatus!]);

        return <NTag type={tagColor(row.retryStatus!)}>{label}</NTag>;
      }
    },
    {
      key: 'taskType',
      title: $t('page.retryLog.taskType'),
      align: 'left',
      minWidth: 120,
      render: row => {
        if (row.taskType === null) {
          return null;
        }
        const label = $t(retryTaskTypeRecord[row.taskType!]);

        return <NTag type={tagColor(row.taskType!)}>{label}</NTag>;
      }
    },
    {
      key: 'idempotentId',
      title: $t('page.retryLog.idempotentId'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'bizNo',
      title: $t('page.retryLog.bizNo'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'createDt',
      title: $t('page.retryLog.createDt'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          {row.retryStatus === 1 ? (
            <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
              {{
                default: () => $t('common.confirmDelete'),
                trigger: () => (
                  <NButton type="error" text ghost size="small">
                    {$t('common.delete')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          ) : (
            ''
          )}
        </div>
      )
    }
  ]
});

const { checkedRowKeys } = useTableOperate(data, getData);

async function handleBatchDelete() {
  const { error } = await fetchBatchDeleteRetryLog(checkedRowKeys.value as any[]);
  if (!error) {
    window.$message?.success($t('common.deleteSuccess'));
    getData();
  }
}

async function handleDelete(id: any) {
  await fetchDeleteRetryLog(id);
  window.$message?.success($t('common.deleteSuccess'));
  getData();
}

async function loadRetryInfo(row: Api.RetryLog.RetryLog) {
  const res = await fetchRetryLogById(row.id!);
  detailData.value = (res.data as Api.RetryLog.RetryLog) || null;
}

function initParams() {
  const retryStatus = history.state.retryStatus;
  if (retryStatus) {
    searchParams.retryStatus = retryStatus;
    getData();
  }
}

initParams();
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <RetryLogSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.retryLog.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
      header-class="view-card-header"
    >
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          :show-add="false"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
    </NCard>
    <RetryLogDetailDrawer v-model:visible="detailVisible" :row-data="detailData" />
  </div>
</template>

<style scoped></style>
