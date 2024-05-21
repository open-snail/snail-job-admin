<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { useRoute, useRouter } from 'vue-router';
import { fetchGetWorkflowBatchList, fetchStopWorkflowBatch } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { operationReasonRecord, taskBatchStatusRecord } from '@/constants/business';
import WorkflowBatchSearch from './modules/workflow-batch-search.vue';
const router = useRouter();
const route = useRoute();

// 此处可能有问题
const workflowId =
  route.query?.workflowId === undefined ? null : Number.parseInt(route.query?.workflowId as string, 10);

const appStore = useAppStore();

const { columns, columnChecks, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetWorkflowBatchList,
  apiParams: {
    page: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
    workflowId,
    groupName: null,
    taskBatchStatus: null
  },
  columns: () => [
    // {
    //   type: 'selection',
    //   align: 'center',
    //   width: 48
    // },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 120
    },
    {
      key: 'workflowName',
      title: $t('page.workflowBatch.workflowName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'groupName',
      title: $t('page.workflowBatch.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'executionAt',
      title: $t('page.workflowBatch.executionAt'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'taskBatchStatus',
      title: $t('page.workflowBatch.taskBatchStatus'),
      align: 'left',
      minWidth: 120,
      render: row => {
        if (!row.taskBatchStatus) {
          return null;
        }

        const tagMap: Record<number, NaiveUI.ThemeColor> = {
          1: 'info',
          2: 'success',
          3: 'success',
          4: 'error',
          5: 'warning',
          6: 'warning'
        };

        const label = $t(taskBatchStatusRecord[row.taskBatchStatus!]);
        return <NTag type={tagMap[row.taskBatchStatus]}>{label}</NTag>;
      }
    },
    {
      key: 'operationReason',
      title: $t('page.workflowBatch.operationReason'),
      align: 'left',
      minWidth: 120,
      render: row => {
        if (!row.operationReason) {
          return null;
        }

        const label = $t(operationReasonRecord[row.operationReason!]);
        return <NTag type="warning">{label}</NTag>;
      }
    },
    {
      key: 'createDt',
      title: $t('page.workflowBatch.createDt'),
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
          <NButton type="primary" ghost size="small" onClick={() => detail(row.id!)}>
            {$t('common.detail')}
          </NButton>
          {row?.taskBatchStatus === 1 || row?.taskBatchStatus === 2 ? (
            <NPopconfirm onPositiveClick={() => handleStop(row.id!)} v-if="">
              {{
                default: () => $t('common.confirmStop'),
                trigger: () => (
                  <NButton type="error" ghost size="small">
                    {$t('common.stop')}
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
  handleAdd,
  checkedRowKeys,
  onBatchDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleStop(id: string) {
  const { error } = await fetchStopWorkflowBatch(id);
  if (!error) {
    window.$message?.success($t('common.executeSuccess'));
    getData();
  }
}

function detail(id: string) {
  router.push({ path: '/workflow/form/batch', query: { id } });
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <WorkflowBatchSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.workflowBatch.title')"
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
          :show-delete="false"
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
