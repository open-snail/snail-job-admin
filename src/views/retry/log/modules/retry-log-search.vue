<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'RetryLogSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.RetryLog.RetryLogSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.groupName')" path="groupName" class="pr-24px">
      <NInput v-model:value="model.groupName" :placeholder="$t('page.retryLog.form.groupName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.sceneName')" path="sceneName" class="pr-24px">
      <NInput v-model:value="model.sceneName" :placeholder="$t('page.retryLog.form.sceneName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.UniqueId')" path="UniqueId" class="pr-24px">
      <NInput v-model:value="model.UniqueId" :placeholder="$t('page.retryLog.form.UniqueId')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.idempotentId')" path="idempotentId" class="pr-24px">
      <NInput v-model:value="model.idempotentId" :placeholder="$t('page.retryLog.form.idempotentId')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.retryLog.bizNo')" path="bizNo" class="pr-24px">
      <NInput v-model:value="model.bizNo" :placeholder="$t('page.retryLog.form.bizNo')" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
