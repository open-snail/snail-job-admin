<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Workflow from '@/components/workflow';
import { $t } from '@/locales';
import { useWorkflowStore } from '@/store/modules/workflow';
import { fetchAddWorkflow } from '@/service/api';

defineOptions({
  name: 'WorkflowFormAdd'
});

const store = useWorkflowStore();
const router = useRouter();

onMounted(() => {
  store.clear();
  store.setType(0);
});

const node = ref<Workflow.NodeDataType>({
  workflowName: `WF-${new Date().getTime()}`,
  workflowStatus: 1,
  blockStrategy: 1,
  description: undefined,
  executorTimeout: 60
});

const save = async () => {
  const { error } = await fetchAddWorkflow(node.value);
  if (!error) {
    window.$message?.info($t('common.addSuccess'));
    router.push('/workflow/task');
  }
};

const cancel = () => {
  router.push('/workflow/task');
};
</script>

<template>
  <Workflow v-model="node" @save="save" @cancel="cancel" />
</template>

<style scoped></style>
