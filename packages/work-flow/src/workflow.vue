<script setup lang="ts">
import { ref, watch } from 'vue';
import NodeWrap from './components/node-wrap.vue';
import StartNode from './components/start-node.vue';
import { $t } from './locales';

defineOptions({
  name: 'SnailWorkflow'
});

interface Props {
  modelValue?: Flow.NodeDataType;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:modelValue', modelValue: Flow.NodeDataType): void;
}

const emit = defineEmits<Emits>();

const nodeData = ref<Flow.NodeDataType>({});

watch(
  () => props.modelValue,
  val => {
    nodeData.value = val;
  },
  { immediate: true, deep: true }
);

watch(
  () => nodeData.value,
  val => {
    emit('update:modelValue', val);
  }
);
</script>

<template>
  <div class="workflow-design">
    <div class="box-scale">
      <StartNode v-model="nodeData" :disabled="disabled" />
      <NodeWrap v-if="nodeData.nodeConfig" v-model="nodeData.nodeConfig" :disabled="disabled" />
      <div class="end-node">
        <div class="end-node-circle"></div>
        <div class="end-node-text">{{ $t('node.endNode') }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import './styles/index';
</style>
