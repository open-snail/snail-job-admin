import { request } from '../request';

/** get Job page */
export function fetchGetJobPage(params?: Api.Job.JobSearchParams) {
  return request<Api.Job.JobList>({
    url: '/job/page/list',
    method: 'get',
    params
  });
}

/** add Job */
export function fetchAddJob(data: Api.Job.Job) {
  return request<boolean>({
    url: '/job',
    method: 'post',
    data
  });
}

/** edit Job */
export function fetchEditJob(data: Api.Job.Job) {
  return request<boolean>({
    url: '/job',
    method: 'put',
    data
  });
}

/** edit Job */
export function fetchUpdateJobStatus(data: Api.Job.JobUpdateJobStatusRequestVO) {
  return request<boolean>({
    url: '/job/status',
    method: 'put',
    data
  });
}
