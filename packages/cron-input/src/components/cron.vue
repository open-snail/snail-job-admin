<script setup lang="ts">
import cronParser from 'cron-parser';
import { computed, ref, watch } from 'vue';
import { DEFAULT_CRON_EXPRESSION, DEFAULT_LOCALE, FIELDS, LOCALE_CN, TYPE } from '../shared/constants';
import { weekNumberToLetter, zerofill } from '../shared/utils';
import Locales from '../i18n';
import CronBase from './internal/cron-base.vue';

defineOptions({ name: 'CronInput' });

interface Props {
  modelValue?: string;
  lang?: I18n.LocaleType;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: DEFAULT_CRON_EXPRESSION,
  lang: (JSON.parse(window.localStorage.getItem('lang')!) as I18n.LocaleType) || DEFAULT_LOCALE
});

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const emit = defineEmits<Emits>();

const [second, minute, hour, date, month, week, year = ''] = props.modelValue.split(' ');
const cron = ref({ second, minute, hour, date, month, week, year });
const activeKey = ref(FIELDS[0].value);
const previewTime = ref(5);

const width = computed(() => {
  return props.lang === LOCALE_CN ? '460px' : '520px';
});

const fields = computed(() => {
  return FIELDS.map(field => {
    const label = Locales[props.lang].field[field.value];
    return { ...field, label };
  });
});

const expressionLabel = computed(() => {
  return Locales[props.lang].expression;
});

const previewLabel = computed(() => {
  return Locales[props.lang].preview.join(previewTime.value.toString());
});

const expression = computed(() => {
  return Object.values(cron.value).join(' ');
});

const previews = computed(() => {
  let previewList = [];

  try {
    const interval = cronParser.parseExpression(expression.value);

    for (let i = 0; i < previewTime.value; i += 1) {
      const datetime = interval.next();
      const previewYear = zerofill(datetime.getFullYear());
      const previewMonth = zerofill(datetime.getMonth() + 1);
      const previewDate = zerofill(datetime.getDate());
      const previewHour = zerofill(datetime.getHours());
      const previewMinute = zerofill(datetime.getMinutes());
      const previewSecond = zerofill(datetime.getSeconds());

      previewList.push(
        `${previewYear}-${previewMonth}-${previewDate} ${previewHour}:${previewMinute}:${previewSecond}`
      );
    }
  } catch (error) {
    previewList = ['此表达式暂时无法解析！'];
  }

  return previewList;
});

watch(
  () => cron.value,
  val => {
    val.week = weekNumberToLetter(val.week);
    emit('update:modelValue', Object.values(val).join(' '));
  },
  { deep: true }
);

watch(
  () => cron.value.date,
  val => {
    if (val === TYPE.UNSPECIFIC) {
      if (cron.value.week === TYPE.UNSPECIFIC) {
        cron.value.week = TYPE.EVERY;
      }
    } else if (cron.value.week !== TYPE.UNSPECIFIC) {
      cron.value.week = TYPE.UNSPECIFIC;
    }
  }
);

watch(
  () => cron.value.week,
  val => {
    if (val === TYPE.UNSPECIFIC) {
      if (cron.value.date === TYPE.UNSPECIFIC) {
        cron.value.date = TYPE.EVERY;
      }
    } else if (cron.value.date !== TYPE.UNSPECIFIC) {
      cron.value.date = TYPE.UNSPECIFIC;
    }
  }
);
</script>

<template>
  <div class="cron-wrapper" :style="{ maxWidth: width }">
    <NTabs v-model:value="activeKey" class="cron-tabs" type="segment">
      <NTabPane v-for="field in fields" :key="field.value" :name="field.value" :tab="field.label">
        <CronBase v-model="cron[field.value]" class="cron-base" :field="field" :locale="lang" />
      </NTabPane>
    </NTabs>
    <div class="expression">
      <div class="title">
        <span class="label">{{ expressionLabel }}</span>
      </div>
      <div class="h-9px"></div>
      <span class="content">{{ expression }}</span>
    </div>
    <div class="preview">
      <div class="title">
        <span class="label">{{ previewLabel }}</span>
      </div>
      <div class="h-9px"></div>
      <ul class="list">
        <li v-for="(preview, index) in previews" :key="preview">
          <span class="index">{{ index + 1 }}</span>
          <span>{{ preview }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>

<style lang="scss" scoped>
.cron-wrapper {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);

  .cron-tabs {
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;

    .cron-base {
      padding: 0 16px 16px 18px;
    }
  }

  .expression,
  .preview {
    margin: 32px 0;
    padding: 16px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 3px;

    .title {
      display: flex;
      justify-content: center;
      margin-top: -28px;
    }

    .label {
      padding: 0 16px;
      background-color: #ffffff;
    }

    .list {
      margin-bottom: 0;

      li:not(:first-child) {
        margin-top: 3px;
      }
    }

    .index {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: rgb(var(--primary-color));
      color: #fff;
      margin-right: 10px;
      font-size: 13px;
    }
  }

  .preview {
    margin-bottom: 0;
  }
}
</style>
