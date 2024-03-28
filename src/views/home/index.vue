<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { fetchCardCount } from '@/service/api';
import HeaderBanner from './modules/header-banner.vue';
import CardData from './modules/card-data.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
import ProjectNews from './modules/project-news.vue';
import RetryTab from './modules/retry-tab.vue';
import CreativityBanner from './modules/creativity-banner.vue';

const appStore = useAppStore();
const gap = computed(() => (appStore.isMobile ? 0 : 16));
const cardCount = ref<Api.Dashboard.CardCount>();
const tabParams = ref<Api.Dashboard.DashboardLineParams>({
  type: 'WEEK'
});

const getCardData = async () => {
  const { data: cardData, error } = await fetchCardCount();
  if (!error) {
    cardCount.value = cardData;
  }
};

getCardData();
</script>

<template>
  <NSpace vertical :size="16">
    <HeaderBanner />
    <CardData :model-value="cardCount!" />
    <NCard :bordered="false" class="card-wrapper">
      <div class="relative">
        <NTabs type="line" animated>
          <NTabPane name="retryTask" :tab="$t('page.home.retryTask')">
            <RetryTab :type="0" />
          </NTabPane>
          <NTabPane name="jobTask" :tab="$t('page.home.jobTask')">
            <RetryTab :type="1" />
          </NTabPane>
        </NTabs>
        <div class="absolute right-40px top-4px">
          <NRadioGroup v-model:value="tabParams.type">
            <NRadioButton value="DAY" label="今日" />
            <NRadioButton value="WEEK" label="最近一周" />
            <NRadioButton value="MONTH" label="最近一月" />
            <NRadioButton value="YEAR" label="全年" />
          </NRadioGroup>
        </div>
      </div>
    </NCard>
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <NCard :bordered="false" class="card-wrapper">
          <LineChart />
        </NCard>
      </NGi>
      <NGi span="24 s:24 m:10">
        <NCard :bordered="false" class="card-wrapper">
          <PieChart />
        </NCard>
      </NGi>
    </NGrid>
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <ProjectNews />
      </NGi>
      <NGi span="24 s:24 m:10">
        <CreativityBanner />
      </NGi>
    </NGrid>
  </NSpace>
</template>

<style scoped></style>
