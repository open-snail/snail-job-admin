declare namespace StorageType {
  type workflow = {
    id?: string;
    type?: number;
    groupName?: string;
    jobList?: FlowApi.JobList;
  };

  interface Local {
    token: string;
    namespaceId: string;
    lang: FlowI18n.LangType;
    workflow: workflow;
  }
}
