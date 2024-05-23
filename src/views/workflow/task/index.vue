<script setup lang="tsx">
import { NButton, NButtonGroup, NPopconfirm, NPopover, NTag } from 'naive-ui';
import { useRouter } from 'vue-router';
import {
  fetchDelWorkflow,
  fetchGetWorkflowPageList,
  fetchTriggerWorkflow,
  fetchUpdateWorkflowStatus
} from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { triggerTypeRecord } from '@/constants/business';
import StatusSwitch from '@/components/common/status-switch.vue';
import { tagColor } from '@/utils/common';
import { useAuth } from '@/hooks/business/auth';
import WorkflowSearch from './modules/workflow-search.vue';
const { hasAuth } = useAuth();

const router = useRouter();
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
      title: $t('page.workflow.workflowName'),
      align: 'left',
      minWidth: 120,
      render: row => {
        function showDetailDrawer() {
          detail(row.id!);
        }

        return (
          <n-button text tag="a" type="primary" onClick={showDetailDrawer} class="ws-normal">
            {row.workflowName}
          </n-button>
        );
      }
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
      minWidth: 120,
      render: row => {
        const fetchFn = async (workflowStatus: Api.Common.EnableStatusNumber, callback: () => void) => {
          const { error } = await fetchUpdateWorkflowStatus(row.id!);
          if (!error) {
            row.workflowStatus = workflowStatus;
            window.$message?.success($t('common.updateSuccess'));
          }
          callback();
        };

        return <StatusSwitch v-model:value={row.workflowStatus} onFetch={fetchFn} />;
      }
    },
    {
      key: 'triggerType',
      title: $t('page.workflow.triggerType'),
      align: 'left',
      minWidth: 120,
      render: row => {
        if (!row.triggerType) {
          return null;
        }

        const label = $t(triggerTypeRecord[row.triggerType!]);
        return <NTag type={tagColor(row.triggerType)}>{label}</NTag>;
      }
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
      fixed: 'right',
      width: 200,
      render: row => {
        return (
          <div class="flex-center gap-8px">
            <NButton type="warning" ghost size="small" onClick={() => edit(row.id!)}>
              {$t('common.edit')}
            </NButton>
            {hasAuth('R_ADMIN') ? (
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
            ) : (
              ''
            )}

            <NPopover trigger="click" placement="bottom" raw show-arrow={false} class="b-rd-6px bg-#fff dark:bg-#000">
              {{
                trigger: () => (
                  <NButton type="primary" ghost size="small">
                    更多
                  </NButton>
                ),
                default: () => (
                  <div>
                    <NButtonGroup vertical>
                      <NButton type="primary" ghost size="small" onClick={() => execute(row.id!)}>
                        {$t('common.execute')}
                      </NButton>
                      <NButton type="primary" ghost size="small" onClick={() => copy(row.id!)}>
                        {$t('common.copy')}
                      </NButton>
                      <NButton type="success" ghost size="small" onClick={() => batch(row.id!)}>
                        {$t('common.batchList')}
                      </NButton>
                    </NButtonGroup>
                  </div>
                )
              }}
            </NPopover>
          </div>
        );
      }
    }
  ]
});

const {
  checkedRowKeys,
  onBatchDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleDelete(id: string) {
  // request
  const { error } = await fetchDelWorkflow(id!);
  if (!error) {
    window.$message?.success($t('common.deleteSuccess'));
    getData();
  }
}

function edit(id: string) {
  router.push({ path: '/workflow/form/edit', query: { id } });
}

function handleAdd() {
  router.push({ path: '/workflow/form/edit' });
}

function detail(id: string) {
  router.push({ path: '/workflow/form/detail', query: { id } });
}

function copy(id: string) {
  router.push({ path: '/workflow/form/copy', query: { id } });
}

function batch(id: string) {
  router.push({ path: '/workflow/batch', query: { workflowId: id } });
}

async function execute(id: string) {
  const { error } = await fetchTriggerWorkflow(id);
  if (!error) {
    window.$message?.success($t('common.executeSuccess'));
    getData();
  }
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
        :scroll-x="1300"
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
