import { request } from '../request';

/** get JobTask page */
export function fetchGetJobTaskPage(params?: Api.JobTask.JobTaskSearchParams) {
  return request<Api.JobTask.JobTaskList>({
    url: '/job/page/list',
    method: 'get',
    params
  });
}

/** add JobTask */
export function fetchAddJobTask(params?: Api.JobTask.JobTask) {
  return request<boolean>({
    url: '/job/page/list',
    method: 'post',
    params
  });
}

/** edit JobTask */
export function fetchEditJobTask(params?: Api.JobTask.JobTask) {
  return request<boolean>({
    url: '/job/page/list',
    method: 'put',
    params
  });
}
