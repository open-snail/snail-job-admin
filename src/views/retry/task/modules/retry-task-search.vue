<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions, translateOptions2 } from '@/utils/common';
import { retryTaskStatusTypeOptions } from '@/constants/business';
import { fetchGetAllGroupNameList, fetchGetRetrySceneList } from '@/service/api';

defineOptions({
  name: 'RetryTaskSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.RetryTask.RetryTaskSearchParams>('model', { required: true });

/** 组列表 */
const groupNameList = ref<string[]>([]);
/** 场景列表 */
const sceneNameList = ref<string[]>([]);

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

async function getGroupNameList() {
  const res = await fetchGetAllGroupNameList();
  groupNameList.value = res.data as string[];
}

async function handleGroupNameUpdate(groupName: string) {
  if (groupName) {
    const res = await fetchGetRetrySceneList({ groupName });
    sceneNameList.value = res.data!.map((scene: Api.RetryScene.Scene) => scene.sceneName);
  } else {
    model.value.sceneName = '';
    sceneNameList.value = [];
  }
}

onMounted(() => {
  getGroupNameList();
});
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryTask.uniqueId')" path="uniqueId" class="pr-24px">
      <NInput v-model:value="model.uniqueId" :placeholder="$t('page.retryTask.form.uniqueId')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryTask.groupName')" path="groupName" class="pr-24px">
      <NSelect
        v-model:value="model.groupName"
        :placeholder="$t('page.retryTask.form.groupName')"
        :options="translateOptions2(groupNameList)"
        clearable
        filterable
        @update:value="handleGroupNameUpdate"
      />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryTask.sceneName')" path="sceneName" class="pr-24px">
      <NSelect
        v-model:value="model.sceneName"
        :placeholder="$t('page.retryTask.form.sceneName')"
        :options="translateOptions2(sceneNameList)"
        clearable
      />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryTask.idempotentId')" path="idempotentId" class="pr-24px">
      <NInput v-model:value="model.idempotentId" :placeholder="$t('page.retryTask.form.idempotentId')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryTask.bizNo')" path="bizNo" class="pr-24px">
      <NInput v-model:value="model.bizNo" :placeholder="$t('page.retryTask.form.bizNo')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryTask.retryStatus')" path="retryStatus" class="pr-24px">
      <NSelect
        v-model:value="model.retryStatus"
        :placeholder="$t('page.retryTask.form.retryStatus')"
        :options="translateOptions(retryTaskStatusTypeOptions)"
      />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
