<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useBoolean } from '@sa/hooks';
import {
  fetchBatchDeleteRetryTask,
  fetchExecuteRetryTask,
  fetchGetRetryTaskList,
  fetchUpdateRetryTaskStatus
} from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { retryTaskStatusTypeRecord, retryTaskTypeRecord } from '@/constants/business';
import CustomerTableHeaderOperation from './modules/customer-table-header-operation.vue';
import RetryTaskOperateDrawer from './modules/retry-task-operate-drawer.vue';
import RetryTaskBatchAddDrawer from './modules/retry-task-batch-add-drawer.vue';
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
      width: 260,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id!)}>
            {$t('common.edit')}
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.groupName!, row.id!)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
          {/* 非[完成,最大次数], 显示[执行]按钮 */}
          {row.retryStatus !== 1 && row.retryStatus !== 2 ? (
            <NPopconfirm onPositiveClick={() => handleExecute(row.groupName!, row.uniqueId!)}>
              {{
                default: () => $t('common.confirmExecute'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.execute')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          ) : (
            ''
          )}
          {/* 非[完成,最大次数], 显示[完成]按钮 */}
          {row.retryStatus !== 1 && row.retryStatus !== 2 ? (
            <NPopconfirm onPositiveClick={() => handleFinish(Number(row.id!), row.groupName!)}>
              {{
                default: () => $t('common.confirmFinish'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.finish')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          ) : (
            ''
          )}
          {/* 重试中, 显示[停止]按钮 */}
          {row.retryStatus === 0 ? (
            <NPopconfirm onPositiveClick={() => handlePause(Number(row.id!), row.groupName!)}>
              {{
                default: () => $t('common.confirmPause'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.pause')}
                  </NButton>
                )
              }}
            </NPopconfirm>
          ) : (
            ''
          )}
          {/* 暂停, 显示[开始]按钮 */}
          {row.retryStatus === 3 ? (
            <NPopconfirm onPositiveClick={() => handleResume(Number(row.id!), row.groupName!)}>
              {{
                default: () => $t('common.confirmResume'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.resume')}
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

const { bool: batchAddDrawerVisible, setTrue: openBatchAddDrawer } = useBoolean();

async function handleDelete(groupName: string, id: string) {
  const { error } = await fetchBatchDeleteRetryTask({ groupName, ids: [id] });
  if (error) return;

  onDeleted();
}

async function handleBatchDelete() {
  const ids: string[] = checkedRowKeys.value as string[];
  if (ids.length === 0) return;
  const groupName = data.value[0].groupName;
  const { error } = await fetchBatchDeleteRetryTask({ groupName, ids });
  if (error) return;

  onBatchDeleted();
}

function edit(id: string) {
  handleEdit(id);
}

function handleBatchAdd() {
  openBatchAddDrawer();
}

function handleExecute(groupName: string, uniqueId: string) {
  fetchExecuteRetryTask({ groupName, uniqueIds: [uniqueId] });
}

function handleResume(id: number, groupName: string) {
  updateRetryTaskStatus(id, groupName, 0);
}

function handlePause(id: number, groupName: string) {
  updateRetryTaskStatus(id, groupName, 3);
}

function handleFinish(id: number, groupName: string) {
  updateRetryTaskStatus(id, groupName, 1);
}

async function updateRetryTaskStatus(id: number, groupName: string, retryStatus: Api.RetryTask.RetryStatusType) {
  const { error } = await fetchUpdateRetryTaskStatus({ id, groupName, retryStatus });
  if (error) return;
  window.$message?.success($t('common.updateSuccess'));
  getData();
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
        <CustomerTableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @batch-add="handleBatchAdd"
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
      <RetryTaskOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getData"
      />
      <RetryTaskBatchAddDrawer v-model:visible="batchAddDrawerVisible" :row-data="editingData" @submitted="getData" />
    </NCard>
  </div>
</template>

<style scoped></style>
