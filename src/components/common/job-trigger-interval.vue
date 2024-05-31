<script setup lang="ts">
import { ref, watch } from 'vue';
import CronInput from '@sa/cron-input';
import { useAppStore } from '@/store/modules/app';

defineOptions({
  name: 'JobTriggerInterval'
});

interface Props {
  triggerType: Api.Common.TriggerType;
}

const model = defineModel<string>();
const props = defineProps<Props>();

const app = useAppStore();

/** 保存 `固定时间` 类型的 时间间隔 */
const interval = ref<number>(props.triggerType === 2 ? Number(model.value) : 60);

/** 保存 `CRON表达式` 类型的 表达式 */
const cron = ref<string>(props.triggerType === 3 ? model.value! : '* * * * * ?');

/** 监视 触发间隔 变化 */
watch(
  interval,
  val => {
    if (props.triggerType === 2) {
      model.value = `${val}`;
    }
  },
  { immediate: true }
);

/** 监视 cron 表达式变化 */
watch(
  cron,
  val => {
    if (props.triggerType === 3) {
      model.value = val;
    }
  },
  { immediate: true }
);

/** 根据不同 triggerType, 为model赋值 */
watch(
  () => props.triggerType,
  triggerType => {
    if (triggerType === 2) {
      model.value = `${interval.value}`;
    } else if (triggerType === 3) {
      model.value = cron.value;
    } else {
      model.value = '*';
    }
  },
  { immediate: true }
);
</script>

<template>
  <div>
    <NInputGroup v-if="triggerType === 2">
      <NInputNumber v-model:value="interval" :placeholder="$t('page.jobTask.form.triggerInterval')" />
      <NInputGroupLabel>{{ $t('common.second') }}</NInputGroupLabel>
    </NInputGroup>
    <CronInput
      v-else-if="triggerType === 3"
      v-model="cron"
      :placeholder="$t('page.jobTask.form.triggerInterval_CRON')"
      :lang="app.locale"
    />
    <NInput v-else-if="triggerType === 99" disabled />
  </div>
</template>

<style scoped></style>
