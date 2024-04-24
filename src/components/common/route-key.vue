<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';
import { routeKeyRecordOptions } from '@/constants/business';

const routeKeyRef = ref<Api.Common.RouteKey>();
const emit = defineEmits<Emits>();

interface Emits {
  (e: 'update:value', value: Api.Common.RouteKey): void;
}

const handleUpdate = (routeKey: Api.Common.RouteKey) => {
  emit('update:value', routeKey);
};
</script>

<template>
  <NSelect
    v-model:value="routeKeyRef"
    :placeholder="$t('common.routeKey.routeForm')"
    :options="translateOptions(routeKeyRecordOptions)"
    clearable
    @update:value="handleUpdate"
  />
</template>

<style scoped></style>
