<script setup lang="ts">
const content = defineModel<{ key: string; value: string | number | boolean; type: string }[]>('value', {
  required: true,
  default: () => []
});

const path = defineModel<string>('path', {
  required: true
});

const onCreate = () => {
  return {
    key: '',
    value: '',
    type: 'string'
  };
};

const dynamicInputRule = [
  {
    trigger: ['input', 'blur'],
    validator(_: unknown, value: string) {
      if (!value) return new Error('不能为空');
      return true;
    }
  }
];

const typeOptions = [
  {
    label: 'string',
    value: 'string'
  },
  {
    label: 'number',
    value: 'number'
  },
  {
    label: 'boolean',
    value: 'boolean'
  }
];

const boolenOptions = [
  {
    label: 'true',
    value: 0
  },
  {
    label: 'false',
    value: 1
  }
];
</script>

<template>
  <NDynamicInput v-model:value="content" item-style="margin-bottom: 0;" :on-create="onCreate" #="{ index }">
    <div class="flex">
      <NFormItem
        ignore-path-change
        :show-label="false"
        :show-feedback="false"
        :rule="dynamicInputRule"
        :path="`${path}[${index}].key`"
      >
        <NInput v-model:value="content[index].key" placeholder="key" @keydown.enter.prevent />
      </NFormItem>
      <div class="mx-8px h-34px lh-34px">=</div>
      <NFormItem
        ignore-path-change
        :show-label="false"
        :show-feedback="false"
        :rule="dynamicInputRule"
        :path="`${path}[${index}].value`"
      >
        <NInput
          v-if="content[index].type === 'string'"
          v-model:value="content[index].value as string"
          placeholder="value"
          @keydown.enter.prevent
        />
        <NInputNumber
          v-if="content[index].type === 'number'"
          v-model:value="content[index].value as number"
          placeholder="value"
          @keydown.enter.prevent
        />
        <NSelect
          v-if="content[index].type === 'boolen'"
          v-model:value="content[index].value as number"
          :options="boolenOptions"
          placeholder="value"
          @keydown.enter.prevent
        />
      </NFormItem>
      <div class="mx-3px h-34px lh-34px">(</div>
      <NFormItem
        class="w-170px"
        ignore-path-change
        :show-label="false"
        :show-feedback="false"
        :path="`${path}[${index}].type`"
      >
        <NSelect
          v-model:value="content[index].type"
          :options="typeOptions"
          placeholder="字段类型"
          @keydown.enter.prevent
        />
      </NFormItem>
      <div class="ml-3px h-34px lh-34px">)</div>
    </div>
  </NDynamicInput>
</template>

<style scoped></style>
