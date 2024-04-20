<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'SceneSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.RetryScene.SceneSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.scene.scene.groupName')" path="userName" class="pr-24px">
      <NInput v-model:value="model.groupName" :placeholder="$t('page.scene.scene.form.groupName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.scene.scene.sceneName')" path="userName" class="pr-24px">
      <NInput v-model:value="model.sceneName" :placeholder="$t('page.scene.scene.form.sceneName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.scene.scene.sceneStatus')" path="userName" class="pr-24px">
      <!--      <NInput v-model:value="model.sceneStatus" :placeholder="$t('page.scene.scene.form.sceneStatus')" />-->
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
