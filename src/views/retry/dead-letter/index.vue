<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchGetRetryDeadLetterPageList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import RetryDeadLetterOperateDrawer from './modules/dead-letter-operate-drawer.vue';
import RetryDeadLetterSearch from './modules/dead-letter-search.vue';

const appStore = useAppStore();

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
      minWidth: 120
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
      minWidth: 120
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
          <NButton type="primary" ghost size="small" onClick={() => rollback(row.id!)}>
            {$t('common.rollback')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id!)}>
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

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

function handleDelete(id: string) {
  // request
  console.log(id);

  onDeleted();
}

function rollback(id: string) {
  handleEdit(id);
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
      <RetryDeadLetterOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
