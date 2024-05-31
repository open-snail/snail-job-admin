<script setup lang="ts">
import { ref, watch } from 'vue';
import { contentTypeRecord } from '../constants/business';

defineOptions({
  name: 'CallbackDetail'
});

interface Props {
  modelValue?: Flow.ConditionNodeType;
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
  <NDrawer v-model:show="visible" placement="right" :width="500" display-directive="if" @after-leave="onClose">
    <NDrawerContent title="工作流详情">
      <NDescriptions :column="1" label-placement="left" bordered :label-style="{ width: '120px' }">
        <NDescriptionsItem label="节点名称">{{ modelValue.nodeName }}</NDescriptionsItem>
        <NDescriptionsItem label="webhook">{{ modelValue.callback?.webhook }}</NDescriptionsItem>
        <NDescriptionsItem label="请求类型">
          {{ contentTypeRecord[modelValue.callback?.contentType!] }}
        </NDescriptionsItem>
        <NDescriptionsItem label="密钥">
          {{ modelValue.callback?.secret }}
        </NDescriptionsItem>
      </NDescriptions>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped lang="scss"></style>
