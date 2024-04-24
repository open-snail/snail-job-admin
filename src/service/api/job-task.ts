import { request } from '../request';

/** get JobTask page */
export function fetchGetJobTaskPage(params?: Api.Job.JobSearchParams) {
  return request<Api.Job.JobList>({
    url: '/job/page/list',
    method: 'get',
    params
  });
}

/** add JobTask */
export function fetchAddJobTask(params?: Api.Job.Job) {
  return request<boolean>({
    url: '/job/page/list',
    method: 'post',
    params
  });
}

/** edit JobTask */
export function fetchEditJobTask(params?: Api.Job.Job) {
  return request<boolean>({
    url: '/job/page/list',
    method: 'put',
    params
  });
}
