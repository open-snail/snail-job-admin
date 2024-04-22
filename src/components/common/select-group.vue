<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { $t } from '@/locales';
import { translateOptions2 } from '@/utils/common';
import { fetchGetAllGroupNameList } from '@/service/api';

const emit = defineEmits<Emits>();

interface Emits {
  (e: 'update:value', value: string): void;
}

/** 组列表 */
const groupNameList = ref<string[]>([]);
/** 组列表 */
const groupNameRef = ref<string>('');

async function getGroupNameList() {
  const res = await fetchGetAllGroupNameList();
  groupNameList.value = res.data as string[];
}

// function handleGroupNameUpdate(groupName: string) {
//   emit('update:value', groupName);
// }

onMounted(() => {
  getGroupNameList();
});

watch(
  () => groupNameRef.value,
  () => {
    emit('update:value', groupNameRef.value);
  }
);
</script>

<template>
  <NSelect
    v-model:value="groupNameRef"
    :placeholder="$t('page.retryTask.form.groupName')"
    :options="translateOptions2(groupNameList)"
    clearable
    filterable
  />
</template>

<style scoped></style>
