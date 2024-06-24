import { defineStore } from 'pinia';
import { ref } from 'vue';
import { localStg } from '@/utils/storage';

export const useLogStore = defineStore('log', () => {
  const taskName = ref<string>();
  const taskBatchId = ref<string>();
  const data = ref<Api.JobLog.JobMessage[]>([]);

  function setTaskInfo(name: string, id: string) {
    taskName.value = name;
    taskBatchId.value = id;
  }

  function setData(value: Api.JobLog.JobMessage[]) {
    data.value = value;
    localStg.set('log', { taskName: taskName.value!, taskBatchId: taskBatchId.value!, data: data.value });
  }

  function clear() {
    taskName.value = undefined;
    taskBatchId.value = undefined;
    data.value = [];
    localStg.remove('log');
  }

  return {
    taskName,
    taskBatchId,
    data,
    clear,
    setTaskInfo,
    setData
  };
});
