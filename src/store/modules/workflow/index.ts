import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchGetJobList } from '@/service/api';

export const useWorkflowStore = defineStore('workflow', () => {
  const id = ref<string>();
  const type = ref<number>();
  const groupName = ref<string>();
  const jobList = ref<Pick<Api.Job.Job, 'id' | 'jobName'>[]>([]);

  function setId(value: string) {
    id.value = value;
  }

  function setType(value: number) {
    type.value = value;
  }

  async function setJobList(value: string) {
    groupName.value = value;
    const { data, error } = await fetchGetJobList({ groupName: value });
    if (!error) {
      jobList.value = data.map(item => {
        return {
          id: item.id!,
          jobName: item.jobName
        };
      });
    }
  }

  function clear() {
    id.value = undefined;
    type.value = undefined;
    groupName.value = undefined;
    jobList.value = [];
  }

  return {
    id,
    type,
    groupName,
    jobList,
    setJobList,
    setType,
    setId,
    clear
  };
});
