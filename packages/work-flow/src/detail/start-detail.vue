<script setup lang="ts">
import { ref, watch } from 'vue';
import { blockStrategyRecord, triggerTypeRecord, workFlowNodeStatusRecord } from '../constants/business';

defineOptions({
  name: 'StartDetail'
});

interface Props {
  modelValue?: Flow.NodeDataType;
  open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  modelValue: () => ({})
});

interface Emits {
  (e: 'update:open', open: boolean): void;
}

const emit = defineEmits<Emits>();

const visible = ref(false);

watch(
  () => props.open,
  val => {
    visible.value = val;
  },
  { immediate: true }
);

const onClose = () => {
  emit('update:open', false);
};
</script>

<template>
  <NDrawer v-model:open="visible" placement="right" :width="500" display-directive="if" @close="onClose">
    <NDrawerContent title="工作流详情">
      <NDescriptions :column="1" bordered :label-style="{ width: '120px' }">
        <NDescriptionsItem label="工作流名称">{{ modelValue.workflowName }}</NDescriptionsItem>
        <NDescriptionsItem label="组名称">{{ modelValue.groupName }}</NDescriptionsItem>
        <NDescriptionsItem label="触发类型">{{ triggerTypeRecord[modelValue.triggerType!] }}</NDescriptionsItem>
        <NDescriptionsItem label="触发间隔">
          {{ modelValue.triggerInterval }} {{ modelValue.triggerType === 2 ? '秒' : null }}
        </NDescriptionsItem>
        <NDescriptionsItem label="执行超时时间">{{ modelValue.executorTimeout }} 秒</NDescriptionsItem>
        <NDescriptionsItem label="阻塞策略">{{ blockStrategyRecord[modelValue.blockStrategy!] }}</NDescriptionsItem>
        <NDescriptionsItem label="工作流状态">
          {{ workFlowNodeStatusRecord[modelValue.workflowStatus!] }}
        </NDescriptionsItem>
      </NDescriptions>
    </NDrawerContent>
  </NDrawer>
</template>
