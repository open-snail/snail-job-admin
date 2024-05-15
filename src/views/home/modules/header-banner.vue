<script setup lang="ts">
import { computed } from 'vue';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';

defineOptions({
  name: 'HeaderBanner'
});

const appStore = useAppStore();
const authStore = useAuthStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));

const timeFix = () => {
  const time = new Date();
  const hour = time.getHours();
  let text = '';
  if (hour > 5 && hour <= 8) {
    text = 'morning';
  } else if (hour > 8 && hour <= 11) {
    text = 'bth';
  } else if (hour > 11 && hour < 14) {
    text = 'noon';
  } else if (hour >= 14 && hour < 17) {
    text = 'ath';
  } else if (hour >= 17 && hour <= 19) {
    text = 'dusk';
  } else if (hour > 19 && hour < 21) {
    text = 'evening';
  } else if (hour >= 21 && hour <= 5) {
    text = 'earlyMorning';
  }
  return text;
};

const href = (url: string) => {
  window.open(url, '_blank');
};
</script>

<template>
  <NCard :bordered="false" class="card-wrapper">
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi class="flex" span="24 s:24 m:18">
        <div class="flex-y-center">
          <div class="pl-12px">
            <h3 class="text-22px font-semibold">
              {{ $t(`page.home.${timeFix()}Greeting`, { userName: authStore.userInfo.username }) }}
            </h3>
            <!-- <p class="text-#999 leading-30px">{{ $t('system.title') + ' - ' + $t('system.desc') }}</p> -->
          </div>
        </div>
      </NGi>
      <NGi span="24 s:24 m:6">
        <NSpace :size="4" justify="end">
          <NButton quaternary class="h-full" @click="href('https://doc.flowlong.com/?from=snail-job')">
            <NThing class="max-w-full w-full">
              <template #avatar>
                <img class="h-14 w-14 flex-none object-contain" src="@/assets/imgs/flowlong.png" />
              </template>
              <template #header><div class="text-base font-semibold">FlowLong</div></template>
              <template #description><div class="text-slate-700">为中国特色审批流打造的国产JSON流程引擎</div></template>
            </NThing>
          </NButton>
        </NSpace>
      </NGi>
    </NGrid>
  </NCard>
</template>

<style scoped></style>
