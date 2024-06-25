<script setup lang="tsx">
import { onBeforeUnmount, ref, watch } from 'vue';
import { $t } from '@/locales';
import { fetchJobLogList } from '@/service/api/log';

defineOptions({
  name: 'FlowLogDrawer'
});

interface Props {
  title?: string;
  taskData: Workflow.JobTaskType;
}

const props = withDefaults(defineProps<Props>(), {
  title: $t('workflow.node.log.title'),
  modelValue: () => []
});

const show = defineModel<boolean>('show', {
  default: true
});

watch(
  () => show.value,
  val => {
    if (val) {
      getLogList();
    }
  },
  { immediate: true }
);

const logList = ref<Api.JobLog.JobMessage[]>([]);
const interval = ref<NodeJS.Timeout>();
const controller = new AbortController();
const finished = ref<boolean>(false);
let startId = '0';
let fromIndex: number = 0;

async function getLogList() {
  const { data: logData, error } = await fetchJobLogList({
    taskBatchId: props.taskData.taskBatchId!,
    jobId: props.taskData.jobId!,
    taskId: props.taskData.id!,
    startId,
    fromIndex,
    size: 50
  });
  if (!error) {
    finished.value = logData.finished;
    startId = logData.nextStartId;
    fromIndex = logData.fromIndex;
    if (logData.message) {
      logList.value.push(...logData.message);
      logList.value.sort((a, b) => Number.parseInt(a.time_stamp, 10) - Number.parseInt(b.time_stamp, 10));
    }
    if (!finished.value) {
      clearTimeout(interval.value);
      interval.value = setTimeout(getLogList, 1000);
    }
  }
}

const stopLog = () => {
  finished.value = true;
  controller.abort();
  clearTimeout(interval.value);
  interval.value = undefined;
};

onBeforeUnmount(() => {
  stopLog();
});
</script>

<template>
  <LogDrawer v-model="logList" v-model:show="show" :title="title" />
</template>

<style scoped lang="scss">
.snail-log {
  width: 100%;
  height: 100%;

  &-scrollbar {
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    @include scrollbar();

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
</style>
