<script setup lang="ts">
import { ref, watch } from 'vue';
import CronInput from '@sa/cron-input';
import { useAppStore } from '@/store/modules/app';

defineOptions({
  name: 'SceneTriggerInterval'
});

interface Props {
  backOff: number;
}

const model = defineModel<string>();
const props = defineProps<Props>();

const app = useAppStore();

/** 保存 `固定时间` 类型的 时间间隔 */
const interval = ref<number>(props.backOff === 2 || props.backOff === 4 ? Number(model.value) : 60);

/** 保存 `CRON表达式` 类型的 表达式 */
const cron = ref<string>(props.backOff === 3 ? model.value! : '* * * * * ?');

const delayLevelDesc = ref('10s,15s,30s,35s,40s,50s,1m,2m,4m,6m,8m,10m,20m,40m,1h,2h,3h,4h,5h,6h,7h,8h,9h,10h,11h,12h');

/** 监视 触发间隔 变化 */
watch(
  interval,
  val => {
    if (props.backOff === 2 || props.backOff === 4) {
      model.value = `${val}`;
    }
  },
  { immediate: true }
);

/** 监视 cron表达式 变化 */
watch(
  cron,
  val => {
    if (props.backOff === 3) {
      model.value = val;
    }
  },
  { immediate: true }
);

/** 根据不同 backOff 对model赋值 */
watch(
  () => props.backOff,
  backOff => {
    if (backOff === 2 || backOff === 4) {
      model.value = `${interval.value}`;
    } else if (backOff === 3) {
      model.value = cron.value;
    } else {
      model.value = '*';
    }
  },
  { immediate: true }
);
</script>

<template>
  <CronInput v-if="backOff === 3" v-model="cron" :lang="app.locale" />
  <NInputNumber
    v-else-if="backOff === 2 || backOff === 4"
    v-model:value="interval"
    :placeholder="$t('page.retryScene.form.triggerInterval')"
    clearable
  />
  <NInput v-else v-model:value="delayLevelDesc" type="textarea" :autosize="{ minRows: 1, maxRows: 3 }" readonly />
</template>

<style scoped></style>
