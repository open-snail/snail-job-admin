<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { localStg } from '@/utils/storage';

const router = useRouter();

const namespaceId = ref<string>(localStg.get('namespaceId')!);

const userInfo = localStg.get('userInfo');
const options = ref(
  userInfo?.namespaceIds.map(item => {
    return { label: item.name, value: item.uniqueId };
  })
);

const onChange = (value: string) => {
  localStg.set('namespaceId', value);
  router.go(0);
};
</script>

<template>
  <NSelect v-model:value="namespaceId" class="namespace-select" :options="options" @update:value="onChange" />
</template>

<style lang="scss" scoped>
.namespace-select {
  width: 150px;

  :deep(.n-base-selection) {
    border-radius: 32px !important;
  }
}
</style>
