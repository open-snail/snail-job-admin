<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchGetJobTaskPage } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import JobTaskOperateDrawer from './modules/job-task-operate-drawer.vue';
import JobTaskSearch from './modules/job-task-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetJobTaskPage,
  apiParams: {
    page: 1,
    size: 10,
    groupName: null,
    jobName: null,
    jobStatus: null
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
      key: 'jobName',
      title: $t('page.jobTask.jobName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'groupName',
      title: $t('page.jobTask.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'nextTriggerAt',
      title: $t('page.jobTask.nextTriggerAt'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'jobStatus',
      title: $t('page.jobTask.jobStatus'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'taskType',
      title: $t('page.jobTask.taskType'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'triggerType',
      title: $t('page.jobTask.triggerType'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'triggerInterval',
      title: $t('page.jobTask.triggerInterval'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'blockStrategy',
      title: $t('page.jobTask.blockStrategy'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'executorTimeout',
      title: $t('page.jobTask.executorTimeout'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'updateDt',
      title: $t('page.jobTask.executorTimeout'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id!)}>
            {$t('common.edit')}
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

function edit(id: string) {
  handleEdit(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <JobTaskSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.jobTask.title')"
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
      <JobTaskOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
