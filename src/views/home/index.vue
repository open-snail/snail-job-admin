<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { fetchCardCount } from '@/service/api';
import HeaderBanner from './modules/header-banner.vue';
import CardData from './modules/card-data.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
import ProjectNews from './modules/project-news.vue';
import CreativityBanner from './modules/creativity-banner.vue';

const appStore = useAppStore();

const gap = computed(() => (appStore.isMobile ? 0 : 16));

const cardCount = ref<Api.Dashboard.CardCount>();

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
    <CardData class="h-165px" :model-value="cardCount!" />
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <NGi span="24 s:24 m:14">
        <NCard :bordered="false" class="card-wrapper">
          <LineChart :model-value="cardCount" />
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
