<script setup lang="tsx">
import { NButton, NTag } from 'naive-ui';
import { fetchGetJobBatchList } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useTable } from '@/hooks/common/table';
import { operationReasonRecord } from '@/constants/business';
import JobBatchSearch from './modules/job-batch-search.vue';

const appStore = useAppStore();

const { columns, data, getData, loading, mobilePagination, searchParams, resetSearchParams } = useTable({
  apiFn: fetchGetJobBatchList,
  apiParams: {
    page: 1,
    size: 10,
    groupName: null,
    jobName: null,
    taskBatchStatus: null
  },
  columns: () => [
    {
      key: 'id',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'groupName',
      title: $t('page.jobBatch.groupName'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'jobName',
      title: $t('page.jobBatch.jobName'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'executionAt',
      title: $t('page.jobBatch.executionAt'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'operationReason',
      title: $t('page.jobBatch.operationReason'),
      align: 'center',
      minWidth: 120,
      render: row => {
        if (row.operationReason === null) {
          return null;
        }
        const tagMap: Record<Api.Common.OperationReason, NaiveUI.ThemeColor> = {
          0: 'default',
          1: 'default',
          2: 'error',
          3: 'default',
          4: 'default',
          5: 'default',
          6: 'default',
          7: 'default',
          8: 'default',
          9: 'default',
          10: 'default',
          11: 'default',
          12: 'default',
          13: 'default',
          14: 'default'
        };
        const label = $t(operationReasonRecord[row.operationReason!]);

        return <NTag type={tagMap[row.operationReason!]}>{label}</NTag>;
      }
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
        </div>
      )
    }
  ]
});

function detail(id: string) {
  console.log(id);
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <JobBatchSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getData" />
    <NCard
      :title="$t('page.jobBatch.title')"
      :bordered="false"
      size="small"
      class="sm:flex-1-hidden card-wrapper"
      header-class="view-card-header"
    >
      <template #header-extra>
        <TableHeaderOperation :loading="loading" :show-delete="false" :show-add="false" @refresh="getData" />
      </template>
      <NDataTable
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
