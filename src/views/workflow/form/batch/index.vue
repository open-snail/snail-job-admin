<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Workflow, { flowFetch, flowStores } from '@sa/workflow';
const store = flowStores.useFlowStore();
const route = useRoute();

const spinning = ref(false);

const id: string = String(route.query.id);

const node = ref<Flow.NodeDataType>({});

const getBatchDetail = async () => {
  spinning.value = true;
  const { data, error } = await flowFetch.fetchWorkflowBatchInfo(id);
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
