<script setup lang="tsx">
import { NButton, NPopconfirm } from 'naive-ui';
import { fetchGetWorkflowPageList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import WorkflowSearch from './modules/workflow-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetWorkflowPageList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    workflowName: null,
    groupName: null,
    workflowStatus: null
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
      key: 'workflowName',
      title: $t('page.workflow.workflowName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'groupName',
      title: $t('page.workflow.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'nextTriggerAt',
      title: $t('page.workflow.nextTriggerAt'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'workflowStatus',
      title: $t('page.workflow.workflowStatus'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'triggerType',
      title: $t('page.workflow.triggerType'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'triggerInterval',
      title: $t('page.workflow.triggerInterval'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'executorTimeout',
      title: $t('page.workflow.executorTimeout'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'updateDt',
      title: $t('page.workflow.updateDt'),
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
    <WorkflowSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.workflow.title')"
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
    </NCard>
  </div>
</template>

<style scoped></style>
