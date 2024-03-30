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
const dateRange = ref<[number, number] | null>();
const formattedValue = ref<[string, string] | null>(
  tabParams.value.startTime && tabParams.value.endTime ? [tabParams.value.startTime, tabParams.value.endTime] : null
);

const getCardData = async () => {
  const { data: cardData, error } = await fetchCardCount();
  if (!error) {
    cardCount.value = cardData;
  }
};

getCardData();

const onUpdateDate = (value: [string, string]) => {
  if (value) {
    tabParams.value.type = 'OTHERS';
    tabParams.value.startTime = value[0];
    tabParams.value.endTime = value[1];
  }
};

const onClearDate = () => {
  tabParams.value.type = 'WEEK';
  tabParams.value.startTime = undefined;
  tabParams.value.endTime = undefined;
};

const onUpdateType = (value: string) => {
  if (value !== 'OTHERS') {
    dateRange.value = null;
    formattedValue.value = null;
    tabParams.value.startTime = undefined;
    tabParams.value.endTime = undefined;
  }
};
</script>

<template>
  <NSpace vertical :size="16">
    <HeaderBanner />
    <CardData :model-value="cardCount!" />
    <NCard :bordered="false" class="card-wrapper">
      <div class="relative">
        <NTabs type="line" animated>
          <NTabPane name="retryTask" :tab="$t('page.home.retryTask')">
            <RetryTab :type="0" :line-params="tabParams" />
          </NTabPane>
          <NTabPane name="jobTask" :tab="$t('page.home.jobTask')">
            <RetryTab :type="1" :line-params="tabParams" />
          </NTabPane>
        </NTabs>
        <div class="absolute right-40px top-0 flex gap-16px">
          <NRadioGroup v-model:value="tabParams.type" @update:value="onUpdateType">
            <NRadioButton value="DAY" label="今日" />
            <NRadioButton value="WEEK" label="最近一周" />
            <NRadioButton value="MONTH" label="最近一月" />
            <NRadioButton value="YEAR" label="全年" />
          </NRadioGroup>
          <NDatePicker
            v-model:value="dateRange"
            v-model:formatted-value="formattedValue"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            class="w-300px"
            clearable
            @update:formatted-value="onUpdateDate"
            @clear="onClearDate"
          />
          <NSelect v-model:value="tabParams.groupName" class="w-200px" />
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
