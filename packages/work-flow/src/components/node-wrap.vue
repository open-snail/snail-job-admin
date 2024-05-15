<script lang="ts" setup>
import { ref, watch } from 'vue';
import TaskNode from './task-node.vue';
import BranchNode from './branch-node.vue';
import CallbackNode from './callback-node.vue';

defineOptions({
  name: 'NodeWrap'
});

interface Props {
  modelValue?: Flow.NodeModelType;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:modelValue', modelValue: Flow.NodeModelType): void;
}

const emit = defineEmits<Emits>();

const nodeConfig = ref<Flow.NodeModelType>({});

watch(
  () => props.modelValue,
  val => {
    nodeConfig.value = val;
  },
  { immediate: true, deep: true }
);

watch(
  () => nodeConfig.value,
  val => {
    emit('update:modelValue', val);
  }
);
</script>

<template>
  <TaskNode v-if="nodeConfig.nodeType == 1" v-model="nodeConfig" :disabled="disabled">
    <template #default="slot">
      <NodeWrap v-if="slot.node" v-model="slot.node.childNode" :disabled="disabled" />
    </template>
  </TaskNode>

  <BranchNode v-if="nodeConfig.nodeType == 2" v-model="nodeConfig" :disabled="disabled">
    <template #default="slot">
      <NodeWrap v-if="slot.node" v-model="slot.node.childNode" :disabled="disabled"></NodeWrap>
    </template>
  </BranchNode>

  <CallbackNode v-if="nodeConfig.nodeType == 3" v-model="nodeConfig" :disabled="disabled">
    <template #default="slot">
      <NodeWrap v-if="slot.node" v-model="slot.node.childNode" :disabled="disabled"></NodeWrap>
    </template>
  </CallbackNode>

  <NodeWrap v-if="nodeConfig.childNode" v-model="nodeConfig.childNode" :disabled="disabled" />
</template>
