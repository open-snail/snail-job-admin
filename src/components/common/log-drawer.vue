<script setup lang="tsx">
import { NCollapse, NCollapseItem } from 'naive-ui';
import { defineComponent, ref, watch } from 'vue';

defineOptions({
  name: 'LogDrawer'
});

interface Props {
  title?: string;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '日志详情',
  show: false
});

interface Emits {
  (e: 'update:show', show: boolean): void;
}

const emit = defineEmits<Emits>();
const visible = defineModel<boolean>('visible', {
  default: true
});

const messageList = ref([
  {
    time_stamp: '1712021845601',
    level: 'ERROR',
    port: '8018',
    throwable:
      'java.lang.ArithmeticException: / by zero\n\tat com.example.easy.retry.service.impl.RemoteRetryServiceImpl.remoteSync(RemoteRetryServiceImpl.java:46)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)\n\tat java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.base/java.lang.reflect.Method.invoke(Method.java:568)\n\tat org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:343)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:756)\n\tat com.aizuda.easy.retry.client.core.intercepter.EasyRetryInterceptor.invoke(EasyRetryInterceptor.java:92)\n\tat org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)\n\tat org.springframework.aop.framework.CglibAopProxy$CglibMethodInvocation.proceed(CglibAopProxy.java:756)\n\tat org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:708)\n\tat com.example.easy.retry.service.impl.RemoteRetryServiceImpl$$SpringCGLIB$$0.remoteSync(<generated>)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)\n\tat java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)\n\tat java.base/java.lang.reflect.Method.invoke(Method.java:568)\n\tat org.springframework.util.ReflectionUtils.invokeMethod(ReflectionUtils.java:281)\n\tat com.aizuda.easy.retry.client.core.strategy.ExecutorAnnotationMethod.doExecute(ExecutorAnnotationMethod.java:28)\n\tat com.aizuda.easy.retry.client.core.executor.AbstractRetryExecutor.doExecute(AbstractRetryExecutor.java:32)\n\tat com.aizuda.easy.retry.client.core.executor.AbstractRetryExecutor.execute(AbstractRetryExecutor.java:23)\n\tat com.aizuda.easy.retry.client.core.strategy.RemoteRetryStrategies.lambda$doGetCallable$2(RemoteRetryStrategies.java:89)\n\tat com.github.rholder.retry.AttemptTimeLimiters$NoAttemptTimeLimit.call(AttemptTimeLimiters.java:78)\n\tat com.github.rholder.retry.Retryer.call(Retryer.java:160)\n\tat com.aizuda.easy.retry.client.core.executor.GuavaRetryExecutor.call(GuavaRetryExecutor.java:56)\n\tat com.aizuda.easy.retry.client.core.strategy.AbstractRetryStrategies.openRetry(AbstractRetryStrategies.java:88)\n\tat com.aizuda.easy.retry.client.core.client.RetryEndPoint.dispatch(RetryEndPoint.java:99)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)\n\tat java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77)',
    host: '127.0.0.1',
    location: 'com.aizuda.easy.retry.client.core.client.RetryEndPoint.dispatch(RetryEndPoint.java:124)',
    thread: 'http-nio-8018-exec-5',
    message: 'remote retry complete. count:[1] '
  },
  {
    time_stamp: '1712021875512',
    level: 'INFO',
    port: '8018',
    host: '127.0.0.1',
    location: 'com.aizuda.easy.retry.client.core.client.RetryEndPoint.dispatch(RetryEndPoint.java:117)',
    thread: 'http-nio-8018-exec-2',
    message: 'remote retry complete. count:[4] result:[null]'
  },
  {
    time_stamp: '1712021875512',
    level: 'ERROR',
    port: '8018',
    host: '127.0.0.1',
    location: 'com.aizuda.easy.retry.client.core.client.RetryEndPoint.dispatch(RetryEndPoint.java:124)',
    thread: 'http-nio-8018-exec-2',
    message: 'remote retry complete. count:[4] '
  }
]);

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
  <NDrawer v-model:show="visible" width="100%" display-directive="if" @update:show="onUpdateShow">
    <NDrawerContent title="日志详情" closable>
      <div class="snail-log">
        <div class="snail-log-scrollbar">
          <code>
            <pre
              v-for="(message, index) in messageList"
              :key="index"
            ><NDivider v-if="index !== 0" /><span class="log-hljs-time">{{timestampToDate(message.time_stamp)}}</span><span :class="`log-hljs-level-${message.level}`">{{`\t${message.level}\t`}}</span><span class="log-hljs-thread">{{`[${message.thread}]\t`}}</span><span class="log-hljs-location">{{`${message.location}: \n`}}</span> -<span class="pl-6px">{{`${message.message}\n`}}</span><ThrowableComponent :throwable="message.throwable" /></pre>
          </code>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
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
