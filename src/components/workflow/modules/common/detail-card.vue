<script setup lang="tsx">
import { nextTick, ref, useSlots, watch } from 'vue';
import type { DataTableColumn } from 'naive-ui';
import { NButton, NTag } from 'naive-ui';
import {
  jobExecutorEnum,
  jobOperationReasonEnum,
  jobStatusEnum,
  taskBatchStatusEnum,
  taskBatchStatusRecord
} from '@/constants/business';
import { useWorkflowStore } from '@/store/modules/workflow';
import { $t } from '@/locales';
import { isNotNull } from '@/utils/common';
import { fetchGetJobBatchDetail, fetchGetJobDetail, fetchGetJobTaskList, fetchWorkflowNodeRetry } from '@/service/api';
import LogDrawer from '../common/log-drawer.vue';

defineOptions({
  name: 'DetailCard'
});

interface Props {
  id?: string;
  ids?: string[];
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  show: false,
  ids: () => []
});

interface Emits {
  (e: 'update:show', show: boolean): void;
}

const emit = defineEmits<Emits>();

const slots = useSlots();

const store = useWorkflowStore();
const visible = ref(false);
const logOpen = ref(false);
const spinning = ref(false);
const loading = ref(false);
const currentIndex = ref(1);
const jobData = ref<Workflow.JobTaskType>({});
const dataSource = ref<Workflow.JobBatchType[]>([]);

const pagination = ref({
  page: 1,
  pageCount: 0,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onUpdatePage: async (page: number) => {
    pagination.value.page = page;
    const id = props.ids[currentIndex.value - 1];
    getBatchDetail(id);
    getRows(id, page);
  },
  onUpdatePageSize: async (pageSize: number) => {
    pagination.value.pageSize = pageSize;
    const id = props.ids[currentIndex.value - 1];
    getBatchDetail(id);
    getRows(id, pagination.value.page);
  }
});

watch(
  () => props.show,
  val => {
    visible.value = val;
    if (val) {
      onLoad();
    }
  },
  { immediate: true }
);

const onUpdateShow = () => {
  emit('update:show', false);
};

async function getDetail(id: string) {
  spinning.value = true;
  const { data, error } = await fetchGetJobDetail(id);
  if (!error) {
    jobData.value = data;
    spinning.value = false;
  }
}

async function getBatchDetail(id: string) {
  spinning.value = true;
  const { data, error } = await fetchGetJobBatchDetail(id);
  if (!error) {
    jobData.value = data;
    spinning.value = false;
  }
}

async function getRows(id: string, page: number = 1) {
  loading.value = true;
  const { data, error } = await fetchGetJobTaskList({
    groupName: store.groupName!,
    taskBatchId: id ?? '0',
    page,
    size: pagination.value.pageSize
  });
  if (!error) {
    pagination.value.pageCount = data.total;
    dataSource.value = data.data;
    loading.value = false;
  }
}

const idList = ref<string[]>([]);

function onLoad() {
  idList.value = props.ids;

  nextTick(() => {
    if (props.ids.length > 0) {
      getBatchDetail(props.ids[0]);
      getRows(props.ids[0]);
    } else if (props.id) {
      idList.value = [jobData.value.taskBatchId!];
      getDetail(props.id);
      getRows(jobData.value.taskBatchId!);
    }
  });
}

const record = ref<Workflow.JobTaskType>({});

const getLogRows = (task: Workflow.JobTaskType) => {
  record.value = task;
  logOpen.value = true;
};

const retry = async (item: Workflow.JobTaskType) => {
  const { error } = await fetchWorkflowNodeRetry(store.id!, item.workflowNodeId!);
  if (!error) {
    window.$message?.success('执行重试成功');
  }
};

const isRetry = (taskBatchStatus: number) => {
  return taskBatchStatus === 4 || taskBatchStatus === 5 || taskBatchStatus === 6;
};

type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning';

const columns = ref<DataTableColumn<Workflow.JobBatchType>[]>([
  {
    key: 'index',
    title: '日志',
    align: 'center',
    width: 64,
    render: row => {
      return (
        <NButton type="info" text onClick={() => getLogRows(row)}>
          <span class="w-28px ws-break-spaces">{`查看\n日志`}</span>
        </NButton>
      );
    }
  },
  {
    key: 'id',
    title: $t('page.jobBatch.jobTask.id'),
    align: 'left',
    minWidth: 64
  },
  {
    key: 'groupName',
    title: $t('page.jobBatch.jobTask.groupName'),
    align: 'left',
    minWidth: 120
  },
  {
    key: 'taskStatus',
    title: $t('page.jobBatch.jobTask.taskStatus'),
    align: 'left',
    minWidth: 80,
    render: row => {
      if (row.taskStatus === null) {
        return undefined;
      }
      const label = $t(taskBatchStatusRecord[row.taskStatus!]);
      const tagMap: Record<number, ThemeColor> = {
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
    minWidth: 120,
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
    align: 'left',
    minWidth: 120
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
]);

function getTagColor(color: string) {
  return {
    color: `${color}18`,
    textColor: color,
    borderColor: `${color}58`
  };
}

const onUpdatePage = (page: number) => {
  currentIndex.value = page;
  const id = props.ids[page - 1];
  getBatchDetail(id);
  getRows(id, page);
};
</script>

<template>
  <NDrawer v-model:show="visible" :width="800" display-directive="if" @update:show="onUpdateShow">
    <NDrawerContent title="任务批次详情" closable>
      <NTabs v-if="idList && idList.length > 0" v-model:value="currentIndex" type="segment" animated>
        <NTabPane v-for="(item, index) in idList" :key="index" :name="index + 1" :tab="item">
          <NSpin :show="spinning">
            <NDescriptions label-placement="left" bordered :column="2">
              <NDescriptionsItem :label="$t('page.jobBatch.groupName')">{{ jobData?.groupName }}</NDescriptionsItem>

              <NDescriptionsItem :label="$t('page.jobBatch.jobName')">{{ jobData?.jobName }}</NDescriptionsItem>

              <NDescriptionsItem :label="$t('page.jobBatch.taskBatchStatus')">
                <NTag
                  v-if="isNotNull(jobData.taskBatchStatus)"
                  :color="getTagColor(taskBatchStatusEnum[jobData.taskBatchStatus!].color )"
                >
                  {{ taskBatchStatusEnum[jobData.taskBatchStatus!].title }}
                </NTag>
                <NTag v-if="isNotNull(jobData.jobStatus)" :color="getTagColor(jobStatusEnum[jobData.jobStatus!].color)">
                  {{ $t(jobStatusEnum[jobData.jobStatus!].name) }}
                </NTag>
              </NDescriptionsItem>

              <NDescriptionsItem :label="$t('page.jobBatch.executionAt')">
                {{ jobData?.executionAt }}
              </NDescriptionsItem>

              <NDescriptionsItem :label="$t('page.jobBatch.operationReason')">
                <NTag
                  v-if="isNotNull(jobData.operationReason)"
                  :color="getTagColor(jobOperationReasonEnum[jobData.operationReason!].color)"
                >
                  {{ $t(jobOperationReasonEnum[jobData.operationReason!].name) }}
                </NTag>
              </NDescriptionsItem>

              <NDescriptionsItem v-if="!slots.default" :label="$t('page.jobBatch.executorType')">
                <NTag
                  v-if="isNotNull(jobData.executorType)"
                  :color="getTagColor(jobExecutorEnum[jobData.executorType!].color)"
                >
                  {{ $t(jobExecutorEnum[jobData.executorType!].name) }}
                </NTag>
              </NDescriptionsItem>

              <NDescriptionsItem :label="$t('page.jobBatch.executorInfo')" :span="2">
                {{ jobData?.executorInfo }}
              </NDescriptionsItem>
              <NDescriptionsItem :label="$t('common.createDt')" :span="2">
                {{ jobData?.createDt }}
              </NDescriptionsItem>
            </NDescriptions>
          </NSpin>
          <slot></slot>
          <NCard
            :bordered="false"
            size="small"
            class="sm:flex-1-hidden card-wrapper"
            :content-style="{ padding: 0 }"
            :header-style="{ padding: 0 }"
          >
            <template #header>
              <div class="header-border"><span class="pl-12px">任务项列表</span></div>
            </template>
            <template #header-extra>
              <NTooltip trigger="hover">
                <template #trigger>
                  <NButton text @click="getRows(item)">
                    <icon-ant-design:sync-outlined class="mr-16px text-20px font-bold" />
                  </NButton>
                </template>
                刷新
              </NTooltip>
              <NTooltip v-if="isRetry(jobData.taskBatchStatus!)" trigger="hover">
                <template #trigger>
                  <NButton text>
                    <icon-ant-design:redo-outlined class="text-20px font-bold" @click="retry(jobData)" />
                  </NButton>
                </template>
                重试
              </NTooltip>
            </template>
            <NDataTable
              :columns="columns"
              :data="dataSource"
              :loading="loading"
              :scroll="{ x: 1200 }"
              remote
              :row-key="row => row.id"
              :pagination="pagination"
              class="sm:h-full"
            />
          </NCard>
        </NTabPane>
      </NTabs>
      <template v-if="ids && ids.length > 1" #footer>
        <NPagination
          v-model:page="currentIndex"
          class="text-center"
          :page-size="1"
          :page-count="ids.length"
          @update:page="onUpdatePage"
        />
      </template>
    </NDrawerContent>
  </NDrawer>
  <LogDrawer v-model:show="logOpen" title="日志详情" :task-data="record" />
</template>

<style scoped lang="scss">
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 88px);
}

.header-border {
  margin: 20px 0;
  border-left: #1366ff 5px solid;
  font-size: medium;
  font-weight: bold;
}

:deep(.n-tabs-nav) {
  display: none;
}

:deep(.n-tab-pane) {
  padding-top: 0 !important;
}
</style>
