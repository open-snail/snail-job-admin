<script setup lang="tsx">
import { NCollapse, NCollapseItem } from 'naive-ui';
import { defineComponent, watch } from 'vue';
import { $t } from '@/locales';

defineOptions({
  name: 'LogDrawer'
});

interface Props {
  title?: string;
  show?: boolean;
  drawer?: boolean;
  modelValue?: Api.JobLog.JobMessage[];
}

const props = withDefaults(defineProps<Props>(), {
  title: $t('page.log.title'),
  show: false,
  drawer: true,
  modelValue: () => []
});

interface Emits {
  (e: 'update:show', show: boolean): void;
}

const emit = defineEmits<Emits>();
const visible = defineModel<boolean>('visible', {
  default: true
});

const ThrowableComponent = defineComponent({
  props: {
    throwable: String
  },
  setup(thProps) {
    return () => {
      if (!thProps.throwable) {
        return <></>;
      }
      const firstLine = thProps.throwable.match(/^.+/m);
      if (!firstLine) {
        return <></>;
      }
      const restOfText = thProps.throwable.replace(/^.+(\n|$)/m, '');
      return (
        <NCollapse>
          <NCollapseItem title={firstLine[0]} name="1">
            {`${restOfText}`}
          </NCollapseItem>
        </NCollapse>
      );
    };
  }
});

watch(
  () => props.show,
  val => {
    visible.value = val;
  },
  { immediate: true }
);

const onUpdateShow = (value: boolean) => {
  emit('update:show', value);
};

function timestampToDate(timestamp: string): string {
  const date = new Date(Number.parseInt(timestamp.toString(), 10));
  const year = date.getFullYear();
  const month =
    (date.getMonth() + 1).toString().length === 1 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
  const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate().toString();
  const hours = date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours().toString();
  const minutes = date.getMinutes().toString().length === 1 ? `0${date.getMinutes()}` : date.getMinutes().toString();
  const seconds = date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` : date.getSeconds().toString();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${date.getMilliseconds()}`;
}
</script>

<template>
  <NDrawer
    v-if="drawer && modelValue.length > 0"
    v-model:show="visible"
    width="100%"
    display-directive="if"
    @update:show="onUpdateShow"
  >
    <NDrawerContent :title="title" closable>
      <div class="snail-log">
        <div class="snail-log-scrollbar">
          <code>
            <pre
              v-for="(message, index) in modelValue"
              :key="index"
            ><NDivider v-if="index !== 0" /><span class="log-hljs-time">{{timestampToDate(message.time_stamp)}}</span><span :class="`log-hljs-level-${message.level}`">{{`\t${message.level}\t`}}</span><span class="log-hljs-thread">{{`[${message.thread}]\t`}}</span><span class="log-hljs-location">{{`${message.location}: \n`}}</span> -<span class="pl-6px">{{`${message.message}\n`}}</span><ThrowableComponent :throwable="message.throwable" /></pre>
          </code>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
  <div v-if="!drawer && modelValue.length > 0" class="snail-log">
    <div class="snail-log-scrollbar">
      <code>
        <pre
          v-for="(message, index) in modelValue"
          :key="index"
        ><NDivider v-if="index !== 0" /><span class="log-hljs-time">{{timestampToDate(message.time_stamp)}}</span><span :class="`log-hljs-level-${message.level}`">{{`\t${message.level}\t`}}</span><span class="log-hljs-thread">{{`[${message.thread}]\t`}}</span><span class="log-hljs-location">{{`${message.location}: \n`}}</span> -<span class="pl-6px">{{`${message.message}\n`}}</span><ThrowableComponent :throwable="message.throwable" /></pre>
      </code>
    </div>
  </div>
  <NEmpty v-else class="h-full" />
</template>

<style scoped lang="scss">
.snail-log {
  width: 100%;
  height: 100%;

  &-scrollbar {
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    @include scrollbar();

    .n-divider:not(.n-divider--vertical) {
      margin-top: 6px;
      margin-bottom: 6px;
    }

    pre {
      white-space: pre-wrap;
      word-break: break-word;
      margin: 0;
      font-size: 16px;
      color: #333639;
    }
  }
}

.dark {
  .snail-log {
    background-color: #1e1f22;

    pre {
      color: #ffffffe6;
    }
  }
}

.log-hljs {
  &-time {
    color: #2db7f5;
  }

  &-level {
    &-DEBUG {
      color: #2647cc;
    }

    &-INFO {
      color: #5c962c;
    }

    &-WARN {
      color: #da9816;
    }

    &-ERROR {
      color: #dc3f41;
    }
  }

  &-thread {
    color: #00a3a3;
  }

  &-location {
    color: #a771bf;
  }
}
</style>
