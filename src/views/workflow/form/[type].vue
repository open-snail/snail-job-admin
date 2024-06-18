<script setup lang="ts">
import type { Component } from 'vue';
import { markRaw, ref } from 'vue';
import { useRouterPush } from '@/hooks/common/router';
import Add from './modules/add.vue';
import Edit from './modules/edit.vue';
import Batch from './modules/batch.vue';
import Detail from './modules/detail.vue';
import Copy from './modules/copy.vue';

defineOptions({
  name: 'WorkflowForm'
});

interface Props {
  type: string;
}

const props = defineProps<Props>();

const { routerPushByKey } = useRouterPush();

const workflowForm = ref<Record<string, Component>>({
  add: markRaw(Add),
  edit: markRaw(Edit),
  batch: markRaw(Batch),
  detail: markRaw(Detail),
  copy: markRaw(Copy)
});

if (!workflowForm.value[props.type]) {
  routerPushByKey('404');
}
</script>

<template>
  <component :is="workflowForm[type]" />
</template>

<style scoped></style>
