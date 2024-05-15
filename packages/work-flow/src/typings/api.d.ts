declare namespace FlowApi {
  export type JobList = JobOption[];

  export type JobOption = {
    id: string;
    jobName: string;
  };
}
