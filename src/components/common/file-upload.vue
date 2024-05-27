<script setup lang="ts">
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui';
import { request } from '@/service/request';

defineOptions({
  name: 'FlieUpload'
});

interface Props {
  accept?: string;
  action?: string;
}

defineProps<Props>();

const beforeUpload = (fileData: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  if (fileData.file.file?.type !== 'application/json') {
    window.$message?.error('只能上传json格式的文件，请重新上传');
    return false;
  }
  return true;
};

const handleImport = ({
  file,
  data: uploadData,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress
}: UploadCustomRequestOptions) => {
  const formData = new FormData();
  if (uploadData) {
    Object.keys(uploadData).forEach(key => {
      formData.append(key, uploadData[key as keyof UploadCustomRequestOptions['data']]);
    });
  }
  formData.append('file', file.file as File);
  request<string>({
    url: action,
    method: 'post',
    data: formData,
    withCredentials,
    headers: headers as Record<string, string>,
    onUploadProgress: ({ progress }) => {
      onProgress({ percent: Math.ceil(progress!) });
    }
  })
    .then(() => {
      onFinish();
    })
    .catch(() => onError());
};
</script>

<template>
  <NUpload
    :action="action"
    :accept="accept"
    :custom-request="handleImport"
    :show-file-list="false"
    @before-upload="beforeUpload"
  >
    <NButton size="small" ghost type="primary">
      <template #icon>
        <IconPajamasImport class="text-icon" />
      </template>
      {{ $t('common.import') }}
    </NButton>
  </NUpload>
</template>

<style scoped lang="scss"></style>
