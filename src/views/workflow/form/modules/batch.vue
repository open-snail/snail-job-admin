<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Workflow from '@/components/workflow';
import { useWorkflowStore } from '@/store/modules/workflow';
import { fetchWorkflowBatchInfo } from '@/service/api';

defineOptions({
  name: 'WorkflowFormBatch'
});

const store = useWorkflowStore();
const route = useRoute();

const spinning = ref(false);

const id: string = String(route.query.id);

const node = ref<Workflow.NodeDataType>({});

const getBatchDetail = async () => {
  spinning.value = true;
  const { data, error } = await fetchWorkflowBatchInfo(id);
  if (!error) {
    node.value = data;
  }
  spinning.value = false;
};

onMounted(() => {
  store.clear();
  store.setType(2);
  store.setId(id);
  getBatchDetail();
});
</script>

<template>
  <Workflow v-model="node" :spinning="spinning" disabled />
</template>

<style scoped></style>
