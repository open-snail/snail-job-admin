<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchDeleteJob, fetchGetJobPage, fetchTriggerJob, fetchUpdateJobStatus } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable, useTableOperate } from '@/hooks/common/table';
import { blockStrategyRecord, taskTypeRecord, triggerTypeRecord } from '@/constants/business';
import StatusSwitch from '@/components/common/status-switch.vue';
import JobTaskOperateDrawer from './modules/job-task-operate-drawer.vue';
import JobTaskSearch from './modules/job-task-search.vue';

const appStore = useAppStore();

const { columns, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetJobPage,
  apiParams: {
    page: 1,
    size: 10,
    groupName: null,
    jobName: null,
    jobStatus: null
  },
  columns: () => [
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
      minWidth: 120,
      render: row => {
        const fetchFn = async (jobStatus: Api.Common.EnableStatusNumber, callback: () => void) => {
          const { error } = await fetchUpdateJobStatus({ id: row.id!, jobStatus });
          if (!error) {
            row.jobStatus = jobStatus;
            window.$message?.success($t('common.updateSuccess'));
          }
          callback();
        };

        return <StatusSwitch v-model:value={row.jobStatus} onFetch={fetchFn} />;
      }
    },
    {
      key: 'taskType',
      title: $t('page.jobTask.taskType'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.taskType === null) {
          return null;
        }
        const tagMap: Record<Api.Common.TaskType, NaiveUI.ThemeColor> = {
          1: 'info',
          2: 'success',
          3: 'error'
        };
        const label = $t(taskTypeRecord[row.taskType!]);

        return <NTag type={tagMap[row.taskType!]}>{label}</NTag>;
      }
    },
    {
      key: 'triggerType',
      title: $t('page.jobTask.triggerType'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.triggerType === null) {
          return null;
        }
        const tagMap: Record<Api.Job.TriggerType, NaiveUI.ThemeColor> = {
          2: 'info',
          3: 'success',
          99: 'error'
        };
        const label = $t(triggerTypeRecord[row.triggerType!]);

        return <NTag type={tagMap[row.triggerType!]}>{label}</NTag>;
      }
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
      minWidth: 120,
      render: row => {
        if (row.blockStrategy === null) {
          return null;
        }
        const tagMap: Record<Api.Common.BlockStrategy, NaiveUI.ThemeColor> = {
          1: 'info',
          2: 'success',
          3: 'error'
        };
        const label = $t(blockStrategyRecord[row.blockStrategy!]);

        return <NTag type={tagMap[row.blockStrategy!]}>{label}</NTag>;
      }
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
          <NPopconfirm onPositiveClick={() => handleTriggerJob(row.id!)}>
            {{
              default: () => $t('common.confirmExecute'),
              trigger: () => (
                <NButton type="error" ghost size="small">
                  {$t('common.execute')}
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

async function handleDelete(id: string) {
  const { error } = await fetchDeleteJob(id);
  if (error) return;
  onDeleted();
}

function edit(id: string) {
  handleEdit(id);
}

async function handleTriggerJob(id: string) {
  const { error } = await fetchTriggerJob(id);
  if (error) {
    window.$message?.success($t('common.executeSuccess'));
  } else {
    window.$message?.error($t('common.executeFailed'));
  }
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
        <TableHeaderOperation :loading="loading" :show-delete="false" @add="handleAdd" @refresh="getData" />
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
