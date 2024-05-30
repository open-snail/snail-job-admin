declare namespace FlowApi {
  export type JobList = JobOption[];

  export type JobOption = {
    id: string;
    jobName: string;
  };

  /**
   * namespace JobLog
   *
   * backend api module: "JobLog"
   */
  namespace JobLog {
    type JobLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

    type JobLogSearchParams = {
      taskBatchId: string;
      jobId: string;
      taskId: string;
    } & LogSearchParams;

    type RetryLogSearchParams = {
      groupName: string;
      uniqueId: string;
    } & LogSearchParams;

    type LogSearchParams = {
      startId: string;
      fromIndex: number;
      size: number;
    };

    type JobLogList = {
      finished: boolean;
      fromIndex: number;
      message: JobMessage[];
      nextStartId: string;
    };

    type JobMessage = {
      level: JobLevel;
      host: string;
      port: string;
      location: string;
      message: string;
      thread: string;
      ['time_stamp']: string;
      throwable: string;
    };
  }
}
