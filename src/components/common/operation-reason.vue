<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';
import { operationReasonOptions } from '@/constants/business';

interface Emits {
  (e: 'update:value', value: Api.Common.OperationReason): void;
}
const emit = defineEmits<Emits>();

const handleUpdate = (operationReason: Api.Common.OperationReason) => {
  emit('update:value', operationReason);
};

const operationReasonRef = ref<Api.Common.OperationReason>();
</script>

<template>
  <NSelect
    v-model:value="operationReasonRef"
    :placeholder="$t('common.jobOperationReason.form')"
    :options="translateOptions(operationReasonOptions)"
    clearable
    @update:value="handleUpdate"
  />
</template>

<style scoped></style>
