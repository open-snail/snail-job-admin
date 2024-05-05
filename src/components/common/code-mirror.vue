<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import CodeMirror from 'vue-codemirror6';
import { oneDark } from '@codemirror/theme-one-dark';
import { json } from '@codemirror/lang-json';
import { javascript } from '@codemirror/lang-javascript';
import { useThemeStore } from '@/store/modules/theme';

defineOptions({
  name: 'CodeMirror'
});

interface Props {
  modelValue: string;
  lang?: NaiveUI.CodeMirrorLang;
  height?: string;
  fontSize?: string;
  readonly?: boolean;
  disabled?: boolean;
  placeholder: string;
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'js',
  readonly: false,
  disabled: false,
  height: 'auto',
  fontSize: '13px'
});

interface Emits {
  (e: 'update:modelValue', modelValue: string): void;
}

const emit = defineEmits<Emits>();

const themeStore = useThemeStore();

const nodeExpression = ref<string>(props.modelValue);

const codeLang = computed(() => {
  switch (props.lang) {
    case 'json':
      return json();
    case 'js':
      return javascript();
    default:
      return json();
  }
});

const theme = computed(() => {
  return {
    '&': {
      border: `1px solid ${themeStore.darkMode ? '#0000' : 'rgb(224, 224, 230)'}`,
      borderRadius: '6px',
      fontFamily: 'system-ui',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    '.cm-line': {
      height: '21px',
      fontSize: props.fontSize,
      fontFamily: 'monospace'
    },
    '.cm-lineNumbers': {
      fontFamily: 'system-ui',
      marginLeft: '5px',
      borderColor: '#0000',
      color: 'rgba(255, 255, 255, 0.82)'
    },
    '.cm-activeLineGutter': {
      backgroundColor: themeStore.darkMode ? '#262626' : '#a1a1a1'
    },
    '.cm-activeLine ': {
      backgroundColor: '#0000'
    },
    '.cm-gutters': {
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
      backgroundColor: themeStore.darkMode ? '#262626' : '#a1a1a1'
    },
    '.cm-content': {
      padding: '5px 5px 5px 0'
    },
    '.cm-scroller': {
      height: props.height,
      overflowY: 'auto',
      overflowX: 'hidden'
    },
    '.cm-placeholder': {
      color: 'rgba(255, 255, 255, 0.38)'
    },
    '&.cm-focused': {
      outline: 'none',
      borderRadius: '6px',
      border: '1px solid #3388ff',
      boxShadow: '0 0 0 2px rgba(19, 102, 255, 0.2)',
      zIndex: '100'
    }
  };
});

watch(
  () => nodeExpression.value,
  val => {
    emit('update:modelValue', val);
  }
);
</script>

<template>
  <CodeMirror
    v-model="nodeExpression"
    class="w-100%"
    :readonly="readonly"
    :disabled="disabled"
    :theme="theme"
    :placeholder="placeholder"
    basic
    :line-number="false"
    :lang="codeLang"
    :extensions="[oneDark]"
  />
</template>
