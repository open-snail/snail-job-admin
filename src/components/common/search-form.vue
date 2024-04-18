<script setup lang="ts">
import { ref } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'SearchForm'
});

interface Props {
  model: Record<string, any>;
}

defineProps<Props>();

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const appStore = useAppStore();

const title = ref(appStore.isMobile ? $t('common.search') : undefined);

const { formRef, validate, restoreValidation } = useNaiveForm();

async function reset() {
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :title="title" :bordered="false" size="small" class="card-wrapper">
    <NForm ref="formRef" :model="model" label-placement="left" :label-width="80" :show-feedback="appStore.isMobile">
      <NGrid responsive="screen" item-responsive>
        <slot></slot>
        <NFormItemGi span="24 m:12 m:6" class="pr-24px lg:p-t-0 md:p-t-16px">
          <NSpace class="min-w-172px w-full" justify="end">
            <NButton @click="reset">
              <template #icon>
                <icon-ic-round-refresh class="text-icon" />
              </template>
              {{ $t('common.reset') }}
            </NButton>
            <NButton type="primary" ghost @click="search">
              <template #icon>
                <icon-ic-round-search class="text-icon" />
              </template>
              {{ $t('common.search') }}
            </NButton>
          </NSpace>
        </NFormItemGi>
      </NGrid>
    </NForm>
  </NCard>
</template>

<style scoped></style>
