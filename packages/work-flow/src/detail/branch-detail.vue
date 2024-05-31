<script setup lang="ts">
import { ref, watch } from 'vue';
import BranchDesc from './branch-desc.vue';

defineOptions({
  name: 'BranchDetail'
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

const onClose = () => {
  emit('update:open', false);
};

watch(
  () => props.open,
  val => {
    visible.value = val;
  },
  { immediate: true }
);
</script>

<template>
  <NDrawer v-model:show="visible" placement="right" :width="500" display-directive="if" @after-leave="onClose">
    <NDrawerContent title="决策详情">
      <BranchDesc v-if="visible" :model-value="modelValue" />
    </NDrawerContent>
  </NDrawer>
</template>
