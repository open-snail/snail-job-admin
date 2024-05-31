import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import { localStg } from '../utils/storage';
import messages from './locale';

const flowI18n = createI18n({
  locale: localStg.get('lang') || 'zh-CN',
  fallbackLocale: 'en',
  messages,
  legacy: false
});

/**
 * Setup plugin i18n
 *
 * @param app
 */
export function setupI18n(app: App) {
  app.use(flowI18n);
}

export const $t = flowI18n.global.t as FlowI18n.$T;

export function setLocale(locale: FlowI18n.LangType) {
  flowI18n.global.locale.value = locale;
}
