<script setup lang="tsx">
import { nextTick, ref, useSlots, watch } from 'vue';
import { NButton, NTag } from 'naive-ui';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { isNotNull, translateOptions } from '@/utils/common';
import {
  jobExecutorEnum,
  jobOperationReasonEnum,
  jobStatusEnum,
  taskBatchStatusEnum,
  taskStatusRecordOptions
} from '@/constants/business';
import { useWorkflowStore } from '@/store/modules/workflow';
import { $t } from '@/locales';
import { fetchGetJobBatchDetail, fetchGetJobDetail, fetchGetJobTaskList, fetchWorkflowNodeRetry } from '@/service/api';

defineOptions({
  name: 'DetailCard'
});

hljs.registerLanguage('json', json);

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
const taskStatusSearch = ref();
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
    taskStatus: taskStatusSearch.value,
    page,
    size: pagination.value.pageSize
  });
  if (!error) {
    pagination.value.pageCount = data.total;
    dataSource.value = data.data;
    loading.value = false;
  }
}

async function flushed(id: string) {
  taskStatusSearch.value = null;
  await getRows(id);
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
          <NTabs class="detail-tabs" type="segment" animated>
            <NTabPane name="info" :tab="$t('page.log.info')">
              <NSpin :show="spinning">
                <NDescriptions class="pt-12px" label-placement="left" bordered :column="2">
                  <NDescriptionsItem :label="$t('page.jobBatch.groupName')">{{ jobData?.groupName }}</NDescriptionsItem>

                  <NDescriptionsItem :label="$t('page.jobBatch.jobName')">{{ jobData?.jobName }}</NDescriptionsItem>

                  <NDescriptionsItem :label="$t('page.jobBatch.taskBatchStatus')">
                    <NTag
                      v-if="isNotNull(jobData.taskBatchStatus)"
                      :color="getTagColor(taskBatchStatusEnum[jobData.taskBatchStatus!].color )"
                    >
                      {{ taskBatchStatusEnum[jobData.taskBatchStatus!].title }}
                    </NTag>
                    <NTag
                      v-if="isNotNull(jobData.jobStatus)"
                      :color="getTagColor(jobStatusEnum[jobData.jobStatus!].color)"
                    >
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
            </NTabPane>
            <NTabPane name="task" :disabled="jobData.taskBatchStatus === 99">
              <template #tab>
                <span>任务项列表</span>
              </template>
              <NCard
                :bordered="false"
                size="small"
                class="sm:flex-1-hidden card-wrapper pt-16px"
                :content-style="{ padding: 0 }"
                :header-style="{ padding: 0 }"
              >
                <template #header>
                  <NSelect
                    v-model:value="taskStatusSearch"
                    clearable
                    class="max-w-180px"
                    :options="translateOptions(taskStatusRecordOptions)"
                    placeholder="请选择状态"
                    @update:value="getRows(item)"
                  />
                </template>
                <template #header-extra>
                  <NButton class="mr-16px" @click="flushed(item)">
                    <template #icon>
                      <icon-ant-design:sync-outlined class="text-icon" />
                    </template>
                    刷新
                  </NButton>
                  <NButton v-if="isRetry(jobData.taskBatchStatus!)" @click="retry(jobData)">
                    <template #icon>
                      <icon-ant-design:redo-outlined class="text-icon" />
                    </template>
                    重试
                  </NButton>
                </template>
                <JobTaskListTable class="mt-16px" :row-data="jobData as any" @show-log="getLogRows" />
              </NCard>
            </NTabPane>
          </NTabs>
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
  <FlowLogDrawer v-model:show="logOpen" title="日志详情" :task-data="record" />
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

.detail-tabs {
  :deep(.n-tabs-nav) {
    display: flex !important;
  }

  :deep(.n-tabs-tab__label) {
    width: 100%;
    justify-content: center;
  }
}
</style>
