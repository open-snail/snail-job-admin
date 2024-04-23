<script setup lang="ts">
import { ref, watch } from 'vue';
import { $t } from '@/locales';
import { translateOptions2 } from '@/utils/common';
import { fetchGetAllGroupNameList } from '@/service/api';

defineOptions({
  name: 'SelectGroup'
});

interface Props {
  modelValue?: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

/** 组列表 */
const groupNameList = ref<string[]>([]);
/** 组列表 */
const groupName = ref<string>();

async function getGroupNameList() {
  const { data, error } = await fetchGetAllGroupNameList();
  if (!error) {
    groupNameList.value = data;
  }
}

getGroupNameList();

watch(
  () => props.modelValue,
  () => {
    groupName.value = props.modelValue!;
  },
  { immediate: true }
);

const handleUpdate = (value: string) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <NSelect
    v-model:value="groupName"
    :placeholder="$t('page.retryTask.form.groupName')"
    :options="translateOptions2(groupNameList)"
    clearable
    filterable
    @update:value="handleUpdate"
  />
</template>

<style scoped></style>
