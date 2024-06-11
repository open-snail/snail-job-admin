<script lang="tsx" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { $t } from '@/locales';
import { localStg } from '@/utils/storage';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import ButtonIcon from '@/components/custom/button-icon.vue';
import SvgIcon from '@/components/custom/svg-icon.vue';

defineOptions({
  name: 'NamespaceSelect'
});

const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();
const namespaceId = ref<string>(localStg.get('namespaceId')!);
const userInfo = localStg.get('userInfo');

const dropOptions = computed(() =>
  userInfo?.namespaceIds.map(item => {
    return {
      label: () => <span class="block w-120px">{item.name}</span>,
      key: item.uniqueId
    };
  })
);

const onChange = (value: string) => {
  namespaceId.value = value;
  authStore.setNamespaceId(value);
  router.go(0);
};

const namespaceName = computed(() => {
  return userInfo?.namespaceIds.filter(item => (item.id = namespaceId.value))[0].name || 'Default';
});
</script>

<template>
  <NDropdown v-if="appStore.isMobile" :value="namespaceId" :options="dropOptions" trigger="hover" @select="onChange">
    <div>
      <ButtonIcon :tooltip-content="$t('icon.namespace')" tooltip-placement="left">
        <SvgIcon icon="eos-icons:namespace" />
      </ButtonIcon>
    </div>
  </NDropdown>

  <NDropdown v-else :value="namespaceId" :options="dropOptions" trigger="click" @select="onChange">
    <div class="namespace-select">
      <ButtonIcon class="w-full" :tooltip-content="$t('icon.namespace')" tooltip-placement="left">
        <SvgIcon icon="eos-icons:namespace" />
        <NEllipsis class="text-14px">{{ namespaceName }}</NEllipsis>
        <SvgIcon icon="material-symbols:expand-more-rounded" />
      </ButtonIcon>
    </div>
  </NDropdown>
</template>

<style lang="scss" scoped>
.namespace-select {
  width: 150px;
  border: 1px solid rgb(224, 224, 230);
  border-radius: 6px;

  :deep(.n-button):hover {
    background-color: var(--n-color);
  }

  :deep(.n-ellipsis) {
    max-width: 96px;
  }

  :deep(.n-button) {
    width: 100% !important;
    padding: 0 5px 0 10px !important;
  }

  :deep(.n-button__content) {
    width: 100% !important;
  }

  :deep(.gap-8px) {
    gap: 0 !important;
  }

  :deep(.flex-center) {
    width: 100% !important;
    justify-content: space-between !important;
  }
}

.namespace-select:hover {
  border-color: rgb(var(--nprogress-color));
}
</style>
