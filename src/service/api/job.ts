import { request } from '../request';

/** get Job page */
export function fetchGetJobPage(params?: Api.Job.JobSearchParams) {
  return request<Api.Job.JobList>({
    url: '/job/page/list',
    method: 'get',
    params
  });
}

/** get Job list */
export function fetchGetJobList(params?: Api.Job.JobSearchParams) {
  return request<Api.Job.Job[]>({
    url: '/job/list',
    method: 'get',
    params
  });
}

/** get Job list */
export function fetchGetJobDetail(id: string) {
  return request<Workflow.JobTaskType>({
    url: `/job/${id}`,
    method: 'get'
  });
}

/** get Job Task list */
export function fetchGetJobTaskList(params?: Api.Job.jobTaskSearchParams) {
  return request<Api.Job.JobTaskList>({
    url: '/job/task/list',
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

/** edit Job status */
export function fetchUpdateJobStatus(data: Api.Job.JobUpdateJobStatusRequestVO) {
  return request<boolean>({
    url: '/job/status',
    method: 'put',
    data
  });
}

/** delete Job by id */
export function fetchDeleteJob(id: string) {
  return request<boolean>({
    url: `/job/${id}`,
    method: 'delete'
  });
}

/** trigger Job by id */
export function fetchTriggerJob(jobId: string) {
  return request<boolean>({
    url: `/job/trigger/${jobId}`,
    method: 'post'
  });
}

/** job name list */
export function fetchGetJobNameList(params?: Api.Job.JobNameListSearchParams) {
  return request<Api.Job.Job[]>({
    url: '/job/job-name/list',
    method: 'get',
    params
  });
}
