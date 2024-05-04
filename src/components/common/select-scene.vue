<script setup lang="ts">
import { ref, watch } from 'vue';
import { $t } from '@/locales';
import { translateOptions2 } from '@/utils/common';
import { fetchGetRetrySceneList } from '@/service/api';

defineOptions({
  name: 'SelectScene'
});

const emit = defineEmits<Emits>();

interface Props {
  groupName: string | null;
}

const props = defineProps<Props>();

/** 场景列表 */
const sceneNameList = ref<string[]>([]);
/** 场景列表 */
const sceneNameRef = ref<string>('');

interface Emits {
  (e: 'update:value', value: string): void;
}

async function getRetrySceneList(groupName: string) {
  if (props.groupName) {
    const res = await fetchGetRetrySceneList({ groupName });
    sceneNameList.value = res.data!.map((scene: Api.RetryScene.Scene) => scene.sceneName);
  } else {
    sceneNameRef.value = '';
    sceneNameList.value = [];
  }
}

watch(
  () => props.groupName,
  () => {
    getRetrySceneList(props.groupName!);
  }
);

watch(
  () => sceneNameRef.value,
  () => {
    emit('update:value', sceneNameRef.value);
  }
);
</script>

<template>
  <NSelect
    v-model:value="sceneNameRef"
    :placeholder="$t('page.retryTask.form.sceneName')"
    :options="translateOptions2(sceneNameList)"
    clearable
  />
</template>

<style scoped></style>
