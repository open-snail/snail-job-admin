<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { fetchGetAllGroupNameList } from '@/service/api';
import SelectGroup from '@/components/common/select-group.vue';
import SelectScene from '@/components/common/select-scene.vue';

defineOptions({
  name: 'RetryDeadLetterSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.RetryDeadLetter.RetryDeadLetterSearchParams>('model', { required: true });

/** 组列表 */
const groupNameList = ref<string[]>([]);

async function getGroupNameList() {
  const res = await fetchGetAllGroupNameList();
  groupNameList.value = res.data as string[];
}

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

onMounted(() => {
  getGroupNameList();
});
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.groupName')" path="groupName" class="pr-24px">
      <SelectGroup v-model:value="model.groupName" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.sceneName')" path="sceneName" class="pr-24px">
      <SelectScene v-model:value="model.sceneName" :group-name="model.groupName as string" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
