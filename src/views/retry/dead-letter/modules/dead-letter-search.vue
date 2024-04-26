<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions2 } from '@/utils/common';
import { fetchGetAllGroupNameList, fetchGetRetrySceneList } from '@/service/api';

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
/** 场景列表 */
const sceneNameList = ref<string[]>([]);

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
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryDeadLetter.groupName')" path="groupName" class="py-1 pr-24px">
      <NSelect
        v-model:value="model.groupName"
        :placeholder="$t('page.retryDeadLetter.form.groupName')"
        :options="translateOptions2(groupNameList)"
        clearable
        filterable
        @update:value="handleGroupNameUpdate"
      />
    </NFormItemGi>

    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryDeadLetter.sceneName')" path="sceneName" class="py-1 pr-24px">
      <NSelect
        v-model:value="model.sceneName"
        :placeholder="$t('page.retryDeadLetter.form.sceneName')"
        :options="translateOptions2(sceneNameList)"
        clearable
      />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
