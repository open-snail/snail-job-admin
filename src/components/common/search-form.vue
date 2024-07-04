<script setup lang="ts">
import { computed, ref } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useNaiveForm } from '@/hooks/common/form';

defineOptions({
  name: 'SearchForm'
});

interface Props {
  model: Record<string, any>;
  btnSpan?: string;
}

const props = defineProps<Props>();

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
  Object.assign(props.model, { ...props.model, page: 1 });
  emit('reset');
}

async function search() {
  await validate();
  Object.assign(props.model, { ...props.model, page: 1 });
  emit('search');
}

const btnSpan = computed(() => {
  const keyNum = Object.keys(props.model).length - 1;
  return props.btnSpan || (keyNum % 4 !== 0 ? `24 m:12 m:${(4 - ((keyNum - 1) % 4)) * 6}` : '24');
});
</script>

<template>
  <NCard :title="title" :bordered="false" size="small" class="card-wrapper">
    <NForm ref="formRef" :model="model" label-placement="left" :label-width="80" :show-feedback="appStore.isMobile">
      <NGrid responsive="screen" cols="24" item-responsive :y-gap="12">
        <slot></slot>
        <NFormItemGi :y-gap="8" :span="btnSpan" class="pr-24px lg:p-t-0 md:p-t-16px">
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
