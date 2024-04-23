<script setup lang="ts">
import { $t } from '@/locales';
import SelectGroup from '@/components/common/select-group.vue';
import SelectScene from '@/components/common/select-scene.vue';

defineOptions({
  name: 'SceneSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.RetryScene.SceneSearchParams>('model', { required: true });

/** 组列表 */
// const groupNameList = ref<string[]>([]);
/** 场景列表 */
// const sceneNameList = ref<string[]>([]);

// async function getGroupNameList() {
//   const res = await fetchGetAllGroupNameList();
//   groupNameList.value = res.data as string[];
// }

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}

// async function handleGroupNameUpdate(groupName: string) {
//   if (groupName) {
//     const res = await fetchGetRetrySceneList({ groupName });
//     sceneNameList.value = res.data!.map((scene: Api.RetryScene.Scene) => scene.sceneName);
//   } else {
//     model.value.sceneName = '';
//     sceneNameList.value = [];
//   }
// }

// onMounted(() => {
//   getGroupNameList();
// });
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryScene.groupName')" path="userName" class="pr-24px">
      <!--      <NSelect-->
      <!--        v-model:value="model.groupName"-->
      <!--        :placeholder="$t('page.retryScene.form.groupName')"-->
      <!--        :options="translateOptions2(groupNameList)"-->
      <!--        clearable-->
      <!--        filterable-->
      <!--        @update:value="handleGroupNameUpdate"-->
      <!--      />-->

      <SelectGroup v-model="model.groupName" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryScene.sceneName')" path="userName" class="pr-24px">
      <!--      <NSelect-->
      <!--        v-model:value="model.sceneName"-->
      <!--        :placeholder="$t('page.retryScene.form.sceneName')"-->
      <!--        :options="translateOptions2(sceneNameList)"-->
      <!--        clearable-->
      <!--      />-->
      <SelectScene v-model:value="model.sceneName" :group-name="model.groupName as string" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
