<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Workflow, { flowFetch, flowStores } from '@sa/workflow';
import { useRouter } from 'vue-router';

const store = flowStores.useFlowStore();
const router = useRouter();

const spinning = ref(false);
const disabled = ref(false);

onMounted(() => {
  store.clear();
  store.setType(0);
  disabled.value = false;
});

const node = ref<Flow.NodeDataType>({
  workflowStatus: 1,
  blockStrategy: 1,
  description: undefined,
  executorTimeout: 60
});

const save = async () => {
  const { error } = await flowFetch.fetchAddWorkflow(node.value);
  if (!error) {
    window.$message?.success('工作流新增成功');
    router.push('/workflow/task');
  }
};

const cancel = () => {
  router.push('/workflow/task');
};
</script>

<template>
  <Workflow v-model="node" :spinning="spinning" :disabled="disabled" @save="save" @cancel="cancel" />
</template>

<style scoped></style>
