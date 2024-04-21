import { request } from '../request';

/** get retryTask list */
export function fetchGetRetryTaskList(params?: Api.RetryTask.RetryTaskSearchParams) {
  return request<Api.RetryTask.RetryTaskList>({
    url: '/retry-task/list',
    method: 'get',
    params
  });
}

/** add retryTask */
export function fetchAddRetryTask(data: Api.RetryTask.RetryTask) {
  return request<boolean>({
    url: '/retry-task',
    method: 'post',
    data
  });
}

/** batch add retryTask */
export function fetchBatchAddRetryTask(data: Api.RetryTask.RetryTaskBatchAdd) {
  return request<boolean>({
    url: '/retry-task/batch',
    method: 'post',
    data
  });
}

/** edit retryTask */
export function fetchEditRetryTask(data: Api.RetryTask.RetryTask) {
  return request<boolean>({
    url: '/retry-task',
    method: 'put',
    data
  });
}

/** update retryTask status */
export function fetchUpdateRetryTaskStatus(data: Api.RetryTask.RetryTaskUpdateStatusRequest) {
  return request<boolean>({
    url: '/retry-task/status',
    method: 'put',
    data
  });
}
