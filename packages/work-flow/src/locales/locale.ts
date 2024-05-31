import zhCN from './langs/zh-cn';
import enUS from './langs/en-us';

const locales: Record<FlowI18n.LangType, FlowI18n.Schema> = {
  'zh-CN': zhCN,
  'en-US': enUS
};

export default locales;
