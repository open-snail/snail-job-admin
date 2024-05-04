<script setup lang="ts">
import { ref, watch } from 'vue';
import { $t } from '@/locales';
import { translateOptions2 } from '@/utils/common';
import { fetchGetAllGroupNameList } from '@/service/api';

defineOptions({
  name: 'SelectGroup'
});

const model = defineModel<string | null>();
interface Emits {
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<Emits>();

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
  () => model,
  () => {
    groupName.value = model.value!;
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
