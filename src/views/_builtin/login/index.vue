<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { getColorPalette, mixColor } from '@sa/utils';
import { $t } from '@/locales';
import GlobalFooter from '@/layouts/modules/global-footer/index.vue';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { loginModuleRecord } from '@/constants/app';
import PwdLogin from './modules/pwd-login.vue';

interface Props {
  /** The login module */
  module?: UnionKey.LoginModule;
}

const props = withDefaults(defineProps<Props>(), {
  module: 'pwd-login'
});

const { VITE_APP_VERSION } = import.meta.env;

const appStore = useAppStore();
const themeStore = useThemeStore();

interface LoginModule {
  key: UnionKey.LoginModule;
  label: string;
  component: Component;
}

const modules: LoginModule[] = [{ key: 'pwd-login', label: loginModuleRecord['pwd-login'], component: PwdLogin }];

const activeModule = computed(() => {
  const findItem = modules.find(item => item.key === props.module);
  return findItem || modules[0];
});

const bgThemeColor = computed(() =>
  themeStore.darkMode ? getColorPalette(themeStore.themeColor, 7) : themeStore.themeColor
);

const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';

  const ratio = themeStore.darkMode ? 0.5 : 0.2;

  return mixColor(COLOR_WHITE, themeStore.themeColor, ratio);
});
</script>

<template>
  <div class="relative size-full flex-center overflow-hidden" :style="{ backgroundColor: bgColor }">
    <WaveBg :theme-color="bgThemeColor" />
    <NCard :bordered="false" class="relative z-4 w-auto rd-12px">
      <div class="w-400px <sm:w-300px">
        <header class="flex-y-center justify-between">
          <SystemLogo class="text-64px text-primary <sm:text-48px" />
          <h3 class="flex text-28px text-primary font-500 <sm:text-22px">
            {{ $t('system.title') }}
            <span class="mt-3px pl-12px text-16px color-#00000072 font-600">{{ VITE_APP_VERSION }}</span>
          </h3>
          <div class="i-flex-vertical">
            <ThemeSchemaSwitch
              :theme-schema="themeStore.themeScheme"
              :show-tooltip="false"
              class="text-20px <sm:text-18px"
              @switch="themeStore.toggleThemeScheme"
            />
            <LangSwitch
              :lang="appStore.locale"
              :lang-options="appStore.localeOptions"
              :show-tooltip="false"
              @change-lang="appStore.changeLocale"
            />
          </div>
        </header>
        <main class="pt-24px">
          <!-- <h3 class="text-18px text-primary font-medium">{{ $t(activeModule.label) }}</h3> -->
          <div class="pt-12px">
            <Transition :name="themeStore.page.animateMode" mode="out-in" appear>
              <component :is="activeModule.component" />
            </Transition>
          </div>
          <div class="pt-12px text-center">
            <ButtonIcon tooltip-content="Mail" class="color-#272636 dark:color-#f0f2f5" icon="simple-icons:maildotru" />
            <ButtonIcon class="color-#c71d23" tooltip-content="Gitee" icon="simple-icons:gitee" />
            <ButtonIcon tooltip-content="Github" class="color-#010409 dark:color-#e6edf3" icon="simple-icons:github" />
          </div>
          <GlobalFooter />
        </main>
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
