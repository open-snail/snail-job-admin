import { defineStore } from 'pinia';
import { ref } from 'vue';
import { localStg } from '../utils/storage';
import { fetchJobList } from '../api';
import { clearFLowStorage, getJobList } from './shared';

export const useFlowStore = defineStore('workflow', () => {
  const id = ref<string>();
  const type = ref<number>();
  const groupName = ref<string>();
  const jobList = ref<FlowApi.JobList>([]);

  function setId(value: string) {
    id.value = value;
    const workflow = localStg.get('workflow');
    localStg.set('workflow', {
      ...workflow,
      id: value
    });
  }

  function setType(value: number) {
    type.value = value;
    const workflow = localStg.get('workflow');
    localStg.set('workflow', {
      ...workflow,
      type: value
    });
  }

  async function setJobList(value: string) {
    groupName.value = value;
    const { data, error } = await fetchJobList(value);
    if (!error) {
      jobList.value = data;
    }
    localStg.set('workflow', {
      groupName: value,
      jobList: data!
    });
  }

  return {
    id,
    type,
    groupName,
    jobList,
    setJobList,
    setType,
    setId,
    clearFLowStorage,
    getJobList
  };
});
