declare namespace FlowI18n {
  type LangType = 'en-US' | 'zh-CN';

  type Schema = {
    snail: {
      groupName: string;
      taskName: string;
      blockStrategy: string;
      retry: string;
      ignore: string;
      stop: string;
      failStrategy: string;
      form: {
        groupName: string;
        workflowTip: string;
        executeMessage: string;
        stopMessage: string;
        taskTip: string;
      };
      enum: {
        failStrategy: {
          skip: string;
          blockage: string;
        };
        blockStrategy: {
          discards: string;
          overwrite: string;
          parallelism: string;
        };
        taskBatchStatus: {
          waiting: string;
          running: string;
          success: string;
          fail: string;
          stop: string;
          cancel: string;
          decisionFailed: string;
          skip: string;
        };
        workFlowNodeStatus: {
          open: string;
          close: string;
        };
        triggerType: {
          time: string;
          cron: string;
        };
      };
    };
    node: {
      priority: string;
      task: {
        name: string;
        add: string;
        nodeName: string;
        conditionNodes: {
          nodeName: string;
        };
      };
      condition: {
        nodeName: string;
        conditionNodes: {
          nodeName: string;
          otherNodeName: string;
          otherTip: string;
          priority: string;
          conditionTip: string;
          logicalCondition: string;
          expressionType: string;
          nodeExpression: string;
          otherNodeTip: string;
        };
        addBranch: string;
      };
      callback: {
        nodeName: string;
        conditionNodes: {
          nodeName: string;
          contentType: string;
          webhookTip: string;
        };
      };
      endNode: string;
    };
  };

  type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never;

  type I18nKey = GetI18nKey<Schema>;

  type TranslateOptions<Locales extends string> = import('vue-i18n').TranslateOptions<Locales>;

  interface $T {
    (key: I18nKey): string;
    (key: I18nKey, plural: number, options?: TranslateOptions<LangType>): string;
    (key: I18nKey, defaultMsg: string, options?: TranslateOptions<I18nKey>): string;
    (key: I18nKey, list: unknown[], options?: TranslateOptions<I18nKey>): string;
    (key: I18nKey, list: unknown[], plural: number): string;
    (key: I18nKey, list: unknown[], defaultMsg: string): string;
    (key: I18nKey, named: Record<string, unknown>, options?: TranslateOptions<LangType>): string;
    (key: I18nKey, named: Record<string, unknown>, plural: number): string;
    (key: I18nKey, named: Record<string, unknown>, defaultMsg: string): string;
  }
}
