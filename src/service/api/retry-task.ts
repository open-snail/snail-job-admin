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

/** edit retryTask */
export function fetchEditRetryTask(data: Api.RetryTask.RetryTask) {
  return request<boolean>({
    url: '/retry-task',
    method: 'put',
    data
  });
}
