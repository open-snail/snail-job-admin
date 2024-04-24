<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'JobTaskSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.Job.JobSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobTask.groupName')" path="groupName" class="pr-24px">
      <NInput v-model:value="model.groupName" :placeholder="$t('page.jobTask.form.groupName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobTask.jobName')" path="jobName" class="pr-24px">
      <NInput v-model:value="model.jobName" :placeholder="$t('page.jobTask.form.jobName')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.jobTask.jobStatus')" path="jobStatus" class="pr-24px">
      <NInput v-model:value="model.jobStatus" :placeholder="$t('page.jobTask.form.jobStatus')" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
