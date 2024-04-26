<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'UserCenterSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const model = defineModel<Api.UserManager.UserManagerSearchParams>('model', { required: true });

function reset() {
  emit('reset');
}

function search() {
  emit('search');
}
</script>

<template>
  <SearchForm :model="model" @search="search" @reset="reset">
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.userManager.username')" path="username" class="pr-24px">
      <NInput v-model:value="model.username" :placeholder="$t('page.userManager.form.username')" />
    </NFormItemGi>
    <NFormItemGi span="24 s:12 m:6" :label="$t('page.userManager.role')" path="role" class="pr-24px">
      <NInput v-model:value="model.role" :placeholder="$t('page.userManager.form.role')" />
    </NFormItemGi>
  </SearchForm>
</template>

<style scoped></style>
