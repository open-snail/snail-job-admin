<script setup lang="tsx">
import type { DataTableRowKey } from 'naive-ui';
import { NButton, NCode, NPopover, NTag } from 'naive-ui';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { ref } from 'vue';
import { taskStatusRecord } from '@/constants/business';
import { $t } from '@/locales';
import { parseArgsJson } from '@/utils/common';
import { useTable } from '@/hooks/common/table';
import { fetchGetJobTaskList, fetchGetJobTaskTree } from '@/service/api';

defineOptions({
  name: 'JobTaskListTable'
});

hljs.registerLanguage('json', json);

interface Props {
  /** row data */
  rowData?: Api.JobBatch.JobBatch | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'showLog', rowData: Api.Job.JobTask): void;
}

const emit = defineEmits<Emits>();

const expandedRowKeys = ref<DataTableRowKey[]>([]);

const { columns, data, loading, mobilePagination } = useTable({
  apiFn: fetchGetJobTaskList,
  apiParams: {
    page: 1,
    size: 10,
    groupName: props.rowData?.groupName,
    taskBatchId: props.rowData?.id,
    startId: 0,
    fromIndex: 0
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
  },
  columns: () => [
    {
      key: 'id',
      title: $t('page.jobBatch.jobTask.id'),
      align: 'left',
      width: 100,
      ellipsis: {
        tooltip: true
      }
    },
    {
      key: 'index',
      title: $t('common.log'),
      align: 'center',
      width: 64,
      render: row => (
        <NButton type="info" text onClick={() => emit('showLog', row)}>
          <span class="w-28px ws-break-spaces">{$t('page.log.view')}</span>
        </NButton>
      )
    },
    {
      key: 'groupName',
      title: $t('page.jobBatch.jobTask.groupName'),
      align: 'left',
      minWidth: 180
    },
    {
      key: 'taskName',
      title: $t('page.jobBatch.jobName'),
      align: 'left',
      minWidth: 180
    },
    {
      key: 'taskStatus',
      title: $t('page.jobBatch.jobTask.taskStatus'),
      align: 'left',
      minWidth: 80,
      render: row => {
        if (row.taskStatus === null) {
          return null;
        }
        const label = $t(taskStatusRecord[row.taskStatus!]);
        const tagMap: Record<number, NaiveUI.ThemeColor> = {
          1: 'info',
          2: 'info',
          3: 'info',
          4: 'error',
          5: 'error',
          6: 'error'
        };
        return <NTag type={tagMap[row.taskStatus!]}>{label}</NTag>;
      }
    },
    {
      key: 'clientInfo',
      title: $t('page.jobBatch.jobTask.clientInfo'),
      align: 'left',
      minWidth: 150,
      render: row => {
        if (row.clientInfo) {
          const parts = row.clientInfo?.split('@');
          const result = parts.length > 1 ? parts[1] : '';
          return <div>{result}</div>;
        }
        return <div>{row.clientInfo}</div>;
      }
    },
    {
      key: 'argsStr',
      title: $t('page.jobBatch.jobTask.argsStr'),
      align: 'center',
      titleAlign: 'center',
      minWidth: 120,
      render: row => {
        return (
          <NPopover trigger="click">
            {{
              trigger: () => (
                <NButton type="primary" text>
                  <span class="w-28px ws-break-spaces">{`查看\n参数`}</span>
                </NButton>
              ),
              default: () => (
                <NCode
                  class="max-h-300px overflow-auto"
                  hljs={hljs}
                  code={parseArgsJson(row.argsStr)}
                  language="json"
                  show-line-numbers
                />
              )
            }}
          </NPopover>
        );
      }
    },
    {
      key: 'resultMessage',
      title: $t('page.jobBatch.jobTask.resultMessage'),
      align: 'left',
      minWidth: 120
    },
    {
      key: 'retryCount',
      title: $t('page.jobBatch.jobTask.retryCount'),
      align: 'left',
      minWidth: 64
    },
    {
      key: 'createDt',
      title: $t('page.jobBatch.jobTask.createDt'),
      align: 'left',
      minWidth: 120
    }
  ]
});

const onLoad = (row: Record<string, any>) => {
  return new Promise<void>((resolve, reject) => {
    fetchGetJobTaskTree({
      groupName: row.groupName,
      taskBatchId: row.taskBatchId,
      startId: 0,
      fromIndex: 0,
      parentId: row.id
    })
      .then(res => {
        row.children = res.data || [];
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
};

const onExpandedRowKeys = (keys: DataTableRowKey[]) => {
  expandedRowKeys.value = keys;
};

const onUpdatePage = (_: number) => {
  expandedRowKeys.value = [];
};
</script>

<template>
  <NDataTable
    :columns="columns"
    :data="data"
    :loading="loading"
    remote
    :scroll-x="962"
    :row-key="row => row.id"
    :pagination="mobilePagination"
    :indent="16"
    :cascade="false"
    allow-checking-not-loaded
    :expanded-row-keys="expandedRowKeys"
    class="sm:h-full"
    @update:expanded-row-keys="onExpandedRowKeys"
    @update:page="onUpdatePage"
    @load="onLoad"
  />
</template>

<style scoped></style>
