<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { $t } from '@/locales';
import { localStg } from '@/utils/storage';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';

const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();
const namespaceId = ref<string>(localStg.get('namespaceId')!);
const userInfo = localStg.get('userInfo');
const selectOptions = computed(() =>
  userInfo?.namespaceIds.map(item => {
    return { label: item.name, value: item.uniqueId };
  })
);
const dropOptions = computed(() =>
  userInfo?.namespaceIds.map(item => {
    return { label: item.name, key: item.uniqueId };
  })
);

const onChange = (value: string) => {
  namespaceId.value = value;
  authStore.setNamespaceId(value);
  router.go(0);
};
</script>

<template>
  <NDropdown v-if="appStore.isMobile" :value="namespaceId" :options="dropOptions" trigger="hover" @select="onChange">
    <div>
      <ButtonIcon :tooltip-content="$t('icon.namespace')" tooltip-placement="left">
        <SvgIcon icon="oui:app-spaces" />
      </ButtonIcon>
    </div>
  </NDropdown>
  <NSelect
    v-else
    v-model:value="namespaceId"
    class="namespace-select"
    :options="selectOptions"
    @update:value="onChange"
  />
</template>

<style lang="scss" scoped>
.namespace-select {
  width: 150px;

  :deep(.n-base-selection) {
    border-radius: 32px !important;
  }
}
</style>
