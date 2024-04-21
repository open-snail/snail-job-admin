<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetRetryTaskList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { retryTaskStatusTypeRecord, retryTaskTypeRecord } from '@/constants/business';
import RetryTaskOperateDrawer from './modules/retry-task-operate-drawer.vue';
import RetryTaskSearch from './modules/retry-task-search.vue';

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetRetryTaskList,
  apiParams: {
    page: 1,
    size: 10,
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
      title: $t('page.retryTask.uniqueId'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'groupName',
      title: $t('page.retryTask.groupName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'sceneName',
      title: $t('page.retryTask.sceneName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'idempotentId',
      title: $t('page.retryTask.idempotentId'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'bizNo',
      title: $t('page.retryTask.bizNo'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'nextTriggerAt',
      title: $t('page.retryTask.nextTriggerAt'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'retryCount',
      title: $t('page.retryTask.retryCount'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'retryStatus',
      title: $t('page.retryTask.retryStatus'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.retryStatus === null) {
          return null;
        }
        const tagMap: Record<Api.RetryTask.RetryStatusType, NaiveUI.ThemeColor> = {
          0: 'info',
          1: 'success',
          2: 'error',
          3: 'warning'
        };
        const label = $t(retryTaskStatusTypeRecord[row.retryStatus!]);

        return <NTag type={tagMap[row.retryStatus!]}>{label}</NTag>;
      }
    },
    {
      key: 'taskType',
      title: $t('page.retryTask.taskType'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.taskType === null) {
          return null;
        }
        const tagMap: Record<Api.RetryTask.TaskType, NaiveUI.ThemeColor> = {
          1: 'warning',
          2: 'error'
        };
        const label = $t(retryTaskTypeRecord[row.taskType!]);

        return <NTag type={tagMap[row.taskType!]}>{label}</NTag>;
      }
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
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

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
    <RetryTaskSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.retryTask.title')"
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
      <RetryTaskOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
