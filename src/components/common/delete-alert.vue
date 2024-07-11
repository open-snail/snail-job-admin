<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/store/modules/auth';

const authStore = useAuthStore();

const type = defineModel<'job-task' | 'retry-scene' | 'workflow-task'>('type', { required: true });

const text = computed(() => {
  if (type.value === 'job-task') {
    return '删除前请检查待删除定时任务是存在通知配置或者工作流任务';
  }

  if (type.value === 'retry-scene') {
    return '删除前请检查待删除重试场景是存在通知配置或者重试任务';
  }

  if (type.value === 'workflow-task') {
    return '删除前请检查待删除工作流任务是存在通知配置';
  }

  return null;
});

const show = computed(() => authStore.getDeleteAlert(type.value));

const handleClose = () => {
  authStore.setDeleteAlert(type.value, false);
  return true;
};
</script>

<template>
  <NAlert v-if="text && show" :show-icon="false" type="warning" closable @close="handleClose">
    <div class="color-warning font-500">
      <!-- <span class="font-600">提示:</span> -->
      📢 {{ text }}；该删除为
      <span class="color-error font-600">物理删除</span>
      ，删除后不可恢复，必要时可以先导出备份
    </div>
  </NAlert>
</template>

<style scoped lang="scss">
.n-alert {
  --n-padding: 5px 13px !important;
  --n-close-margin: 0 13px 0 0 !important;

  :deep(.n-alert__close) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100% !important;
  }
}
</style>
