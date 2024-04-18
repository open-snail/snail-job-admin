<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'NotifyConfigSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.NotifyConfig.NotifySearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.notifyConfig.groupName')" path="userName" class="pr-24px">
      <NSelect v-model:value="model.groupName" :placeholder="$t('page.notifyConfig.groupName')" clearable />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.notifyConfig.notifyStatus')" path="userName" class="pr-24px">
      <NSelect v-model:value="model.notifyStatus" :placeholder="$t('page.notifyConfig.notifyStatus')" clearable />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.notifyConfig.notifyScene')" path="userName" class="pr-24px">
      <NSelect v-model:value="model.notifyScene" :placeholder="$t('page.notifyConfig.notifyScene')" clearable />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
