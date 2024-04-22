<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'GroupConfigSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.GroupConfig.GroupConfigSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.groupConfig.groupName')" path="groupName" class="pr-24px">
      <NInput v-model:value="model.groupName" :placeholder="$t('page.groupConfig.form.groupName')" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
