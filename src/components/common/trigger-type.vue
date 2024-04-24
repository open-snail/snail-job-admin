<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { translateOptions } from '@/utils/common';
import { triggerTypeOptions } from '@/constants/business';

defineOptions({
  name: 'TriggerType'
});

const valueRef = ref<Api.Common.TriggerType>();
const emit = defineEmits<Emits>();

interface Emits {
  (e: 'update:value', value: Api.Common.TriggerType): void;
}

const handleUpdate = (value: Api.Common.TriggerType) => {
  emit('update:value', value);
};
</script>

<template>
  <NSelect
    v-model:value="valueRef"
    :placeholder="$t('common.triggerType.form')"
    :options="translateOptions(triggerTypeOptions)"
    clearable
    @update:value="handleUpdate"
  />
</template>

<style scoped></style>
