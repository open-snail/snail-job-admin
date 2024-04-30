<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { ref } from 'vue';
import {
  fetchDeleteRetryDeadLetter,
  fetchGetRetryDeadLetterById,
  fetchGetRetryDeadLetterPageList,
  fetchRollbackRetryDeadLetter
} from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { retryTaskTypeRecord } from '@/constants/business';
import { tagColor } from '@/utils/common';
import RetryDeadLetterSearch from './modules/dead-letter-search.vue';
import RetryDeadLetterDetailDrawer from './modules/retry-letter-detail-drawer.vue';

const appStore = useAppStore();
const detailData = ref();
const detailVisible = defineModel<boolean>('detailVisible', {
  default: false
});

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetRetryDeadLetterPageList,
  apiParams: {
    page: 1,
    size: 10
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'uniqueId',
      title: $t('page.retryDeadLetter.uniqueId'),
      align: 'left',
      minWidth: 120,
      render: row => {
        async function showDetailDrawer() {
          await loadRetryInfo(row);
          detailVisible.value = true;
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
      title: $t('page.retryDeadLetter.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'sceneName',
      title: $t('page.retryDeadLetter.sceneName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'idempotentId',
      title: $t('page.retryDeadLetter.idempotentId'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'bizNo',
      title: $t('page.retryDeadLetter.bizNo'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'taskType',
      title: $t('page.retryDeadLetter.taskType'),
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
      key: 'createDt',
      title: $t('page.retryDeadLetter.createDt'),
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
          <NButton type="primary" ghost size="small" onClick={() => rollback(row)}>
            {$t('common.rollback')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const { handleAdd, checkedRowKeys } = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  const { error } = await fetchDeleteRetryDeadLetter({
    ids: checkedRowKeys.value as any[],
    groupName: searchParams.groupName!
  });
  if (error) return;
  window.$message?.success($t('common.deleteSuccess'));
  getData();
}

async function handleBatchRollback() {
  // request
  const { error } = await fetchRollbackRetryDeadLetter({
    ids: checkedRowKeys.value as any[],
    groupName: searchParams.groupName!
  });
  if (error) return;
  window.$message?.success($t('common.rollbackSuccess'));
  getData();
}

async function handleDelete(row: Api.RetryDeadLetter.DeadLetter) {
  const { error } = await fetchDeleteRetryDeadLetter({ ids: [row.id!], groupName: row.groupName! });
  if (error) return;
  window.$message?.success($t('common.deleteSuccess'));
  getData();
}

async function loadRetryInfo(row: Api.RetryDeadLetter.DeadLetter) {
  const res = await fetchGetRetryDeadLetterById(row.id!, row.groupName!);
  detailData.value = (res.data as Api.RetryDeadLetter.DeadLetter) || null;
}

async function rollback(row: Api.RetryDeadLetter.DeadLetter) {
  const { error } = await fetchRollbackRetryDeadLetter({ ids: [row.id!], groupName: row.groupName! });
  if (error) return;
  window.$message?.success($t('common.rollbackSuccess'));
  getData();
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <RetryDeadLetterSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.retryDeadLetter.title')"
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
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        >
          <template #addAfter>
            <NButton size="small" ghost type="primary" @click="handleBatchRollback">
              <template #icon>
                <IconTdesignRollback class="text-icon" />
              </template>
              {{ $t('common.batchRollback') }}
            </NButton>
          </template>
        </TableHeaderOperation>
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
      <RetryDeadLetterDetailDrawer v-model:visible="detailVisible" :row-data="detailData" />
    </NCard>
  </div>
</template>

<style scoped></style>
