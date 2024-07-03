<script setup lang="tsx">
import { NButton, NCard, NCollapse, NCollapseItem, NDivider, NDropdown, NEmpty, NSpin, NVirtualList } from 'naive-ui';
import { defineComponent, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { fetchJobLogList, fetchRetryLogList } from '@/service/api/log';
import ButtonIcon from '@/components/custom/button-icon.vue';

defineOptions({
  name: 'LogDrawer'
});

interface Props {
  title?: string;
  drawer?: boolean;
  type?: 'job' | 'retry';
  taskData?: Api.Job.JobTask | Api.RetryLog.RetryLog | Api.RetryTask.RetryTask;
  modelValue?: Api.JobLog.JobMessage[];
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  drawer: true,
  type: 'job',
  taskData: undefined,
  modelValue: () => []
});

const visible = defineModel<boolean>('show', {
  default: false
});

const syncTime = ref(1);
const logList = ref<Api.JobLog.JobMessage[]>([]);
const interval = ref<NodeJS.Timeout>();
let controller = new AbortController();
const finished = ref<boolean>(true);
let startId = '0';
let fromIndex: number = 0;

const pauseLog = () => {
  finished.value = true;
  clearTimeout(interval.value);
  interval.value = undefined;
};

const stopLog = () => {
  if (!finished.value) controller.abort();
  pauseLog();
  startId = '0';
  fromIndex = 0;
  logList.value = [];
};

async function getLogList() {
  let logData = null;
  let logError;

  if (props.type === 'job') {
    const taskData = props.taskData! as Api.Job.JobTask;
    const { data, error } = await fetchJobLogList(
      {
        taskBatchId: taskData.taskBatchId,
        jobId: taskData.jobId,
        taskId: taskData.id,
        startId,
        fromIndex,
        size: 50
      },
      controller
    );
    logData = data;
    logError = error;
  }

  if (props.type === 'retry') {
    const taskData = props.taskData! as Api.RetryLog.RetryLog | Api.RetryTask.RetryTask;
    const { data, error } = await fetchRetryLogList({
      groupName: taskData.groupName,
      uniqueId: taskData.uniqueId!,
      startId,
      fromIndex,
      size: 50
    });
    logData = data;
    logError = error;
  }

  if (!logError && logData) {
    finished.value = logData.finished || syncTime.value === 0;
    startId = logData.nextStartId;
    fromIndex = logData.fromIndex;
    if (logData.message) {
      logList.value.push(...logData.message);
      logList.value.sort((a, b) => Number.parseInt(a.time_stamp, 10) - Number.parseInt(b.time_stamp, 10));
    }
    if (!finished.value && syncTime.value !== 0) {
      clearTimeout(interval.value);
      interval.value = setTimeout(getLogList, syncTime.value * 1000);
    }
  } else if (logError?.code !== 'ERR_CANCELED') {
    stopLog();
  }
}

onBeforeUnmount(() => {
  stopLog();
});

watch(
  () => visible.value,
  async val => {
    if (val) {
      if (props.modelValue) {
        logList.value = [...props.modelValue];
      }
    }

    if ((val || !props.drawer) && props.type && props.taskData) {
      finished.value = false;
      controller = new AbortController();
      await getLogList();
    }

    if (!val && props.drawer) {
      stopLog();
    }
  },
  { immediate: true }
);

function timestampToDate(timestamp: string): string {
  const date = new Date(Number.parseInt(timestamp?.toString(), 10));
  const year = date.getFullYear();
  const month =
    (date.getMonth() + 1)?.toString().length === 1 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1)?.toString();
  const day = date.getDate()?.toString().length === 1 ? `0${date.getDate()}` : date.getDate()?.toString();
  const hours = date.getHours()?.toString().length === 1 ? `0${date.getHours()}` : date.getHours()?.toString();
  const minutes = date.getMinutes()?.toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes()?.toString();
  const seconds = date.getSeconds()?.toString().length === 1 ? `0${date.getSeconds()}` : date.getSeconds()?.toString();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${date.getMilliseconds()}`;
}

const router = useRouter();

function openNewTab() {
  let query;
  if (props.type === 'job') {
    query = {
      type: props.type,
      taskBatchId: (props.taskData as Api.Job.JobTask).taskBatchId,
      jobId: (props.taskData as Api.Job.JobTask).jobId,
      taskId: (props.taskData as Api.Job.JobTask).id
    };
  }

  if (props.type === 'retry') {
    query = {
      type: props.type,
      groupName: (props.taskData as Api.RetryLog.RetryLog | Api.RetryTask.RetryTask).groupName,
      uniqueId: (props.taskData as Api.RetryLog.RetryLog | Api.RetryTask.RetryTask).uniqueId
    };
  }
  const url = router.resolve({ path: '/log', query });
  window.open(url.href);
}

const handleSyncSelect = async (time: number) => {
  if (time === -1) {
    if (finished.value) {
      finished.value = false;
      await getLogList();
    }
    return;
  }

  syncTime.value = time;

  if (time === 0) {
    pauseLog();
    return;
  }

  finished.value = false;
  await getLogList();
};

const syncOptions = ref([
  {
    label: 'Off',
    key: 0
  },
  {
    label: 'Auto(1s)',
    key: 1
  },
  {
    label: '5s',
    key: 5
  },
  {
    label: '10s',
    key: 10
  },
  {
    label: '30s',
    key: 30
  },
  {
    label: '1m',
    key: 60
  },
  {
    label: '5m',
    key: 300
  }
]);

const SnailLogComponent = defineComponent({
  setup() {
    if (finished.value && logList.value.length === 0) {
      return () => <NEmpty class="h-full flex-center" size="huge" />;
    }

    const throwableComponent = (throwable: string) => {
      if (!throwable) {
        return <></>;
      }
      const firstLine = throwable.match(/^.+/m);
      if (!firstLine) {
        return <></>;
      }
      const restOfText = throwable.replace(/^.+(\n|$)/m, '');
      return (
        <NCollapse>
          <NCollapseItem title={firstLine[0]} name="1">
            {`${restOfText}`}
          </NCollapseItem>
        </NCollapse>
      );
    };

    return () => (
      <code class="snail-log">
        <NVirtualList class="virtual-list" itemSize={65} items={logList.value}>
          {{
            default: ({ item: message }: { item: Api.JobLog.JobMessage }) => (
              <pre>
                <span class="log-hljs-time inline-block">{timestampToDate(message.time_stamp)}</span>
                <span class={`log-hljs-level-${message.level} ml-12px mr-12px inline-block`}>{`${message.level}`}</span>
                <span class="log-hljs-thread mr-12px inline-block">{`[${message.host}:${message.port}]`}</span>
                <span class="log-hljs-thread mr-12px inline-block">{`[${message.thread}]`}</span>
                <span class="log-hljs-location">{`${message.location}: \n`}</span> -
                <span class="pl-6px">{`${message.message}`}</span>
                {throwableComponent(message.throwable)}
                <NDivider />
              </pre>
            )
          }}
        </NVirtualList>
      </code>
    );
  }
});
</script>

<template>
  <NDrawer v-if="drawer" v-model:show="visible" width="100%" display-directive="if" :auto-focus="false">
    <NDrawerContent closable>
      <template #header>
        <div class="flex-center">
          <NTooltip v-if="finished">
            <template #trigger>
              <icon-material-symbols:check-circle class="text-20px color-success" />
            </template>
            日志加载完成
          </NTooltip>
          <NTooltip v-else>
            <template #trigger>
              <NSpin size="small">
                <template #icon>
                  <icon-nonicons:loading-16 />
                </template>
              </NSpin>
            </template>
            日志正在加载
          </NTooltip>
          <span class="ml-6px">{{ title }}</span>
          <ButtonIcon icon="hugeicons:share-01" tooltip-content="在新标签页打开" class="ml-6px" @click="openNewTab" />
          <NDropdown trigger="hover" :options="syncOptions" width="trigger" @select="handleSyncSelect">
            <NTooltip placement="right">
              <template #trigger>
                <NButton dashed class="ml-3px w-136px" @click="handleSyncSelect(-1)">
                  <template #icon>
                    <div class="flex-center gap-8px">
                      <icon-solar:refresh-outline class="text-18px" />
                      {{ syncOptions.filter(item => item.key === syncTime)[0].label }}
                      <SvgIcon icon="material-symbols:expand-more-rounded" />
                    </div>
                  </template>
                </NButton>
              </template>
              自动刷新频率
            </NTooltip>
          </NDropdown>
        </div>
      </template>
      <SnailLogComponent />
    </NDrawerContent>
  </NDrawer>
  <NCard v-else :bordered="false" :title="title" size="small" class="h-full sm:flex-1-hidden card-wrapper">
    <template #header-extra>
      <div class="flex items-center">
        <NDropdown trigger="hover" :options="syncOptions" width="trigger" @select="handleSyncSelect">
          <NTooltip placement="right">
            <template #trigger>
              <NButton dashed class="ml-3px w-136px" @click="handleSyncSelect(-1)">
                <template #icon>
                  <div class="flex-center gap-8px">
                    <icon-solar:refresh-outline class="text-18px" />
                    {{ syncOptions.filter(item => item.key === syncTime)[0].label }}
                    <SvgIcon icon="material-symbols:expand-more-rounded" />
                  </div>
                </template>
              </NButton>
            </template>
            自动刷新频率
          </NTooltip>
        </NDropdown>
        <NTooltip v-if="finished">
          <template #trigger>
            <icon-material-symbols:check-circle class="text-20px color-success" />
          </template>
          日志加载完成
        </NTooltip>
        <NTooltip v-else>
          <template #trigger>
            <NSpin size="small">
              <template #icon>
                <icon-nonicons:loading-16 />
              </template>
            </NSpin>
          </template>
          日志正在加载
        </NTooltip>
      </div>
    </template>
    <SnailLogComponent />
  </NCard>
</template>

<style lang="scss">
.snail-log {
  padding: 0;

  .virtual-list {
    max-height: calc(100vh - 101px);
  }

  .n-divider:not(.n-divider--vertical) {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    font-size: 16px;
    color: #333639;
  }

  .log-hljs {
    &-time {
      color: #2db7f5;
    }

    &-level {
      &-DEBUG {
        color: #2647cc;
      }

      &-INFO {
        color: #5c962c;
      }

      &-WARN {
        color: #da9816;
      }

      &-ERROR {
        color: #dc3f41;
      }
    }

    &-thread {
      color: #00a3a3;
    }

    &-location {
      color: #a771bf;
    }
  }
}

.dark {
  .snail-log {
    background-color: #1e1f22;

    pre {
      color: #ffffffe6;
    }
  }
}
</style>

<style scoped>
:deep(.n-spin) {
  height: 18px !important;
  width: 18px !important;
  font-size: 18px !important;
  margin-right: 6px;
}
</style>
