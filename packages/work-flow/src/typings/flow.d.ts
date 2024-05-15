declare namespace Flow {
  type FailStrategy = 1 | 2;
  type LogicalCondition = 1 | 2;
  type Expression = 1 | 2 | 3;
  type BlockStrategy = 1 | 2 | 3;
  type TaskBatchStatus = 1 | 2 | 3 | 4 | 5 | 6 | 98 | 99;
  type ContentType = 1 | 2;
  type TriggerType = 2 | 3;
  type WorkFlowNodeStatus = 0 | 1;

  /** 组 */
  type NodeDataType = {
    /** 流程ID */
    id?: string;
    /** 工作流名称 */
    workflowName?: string;
    /** 组名称 */
    groupName?: string;
    /** 触发类型 */
    triggerType?: TriggerType;
    /** 触发间隔 */
    triggerInterval?: string | number;
    /** 阻塞策略 */
    blockStrategy?: BlockStrategy;
    /** 执行超时时间 */
    executorTimeout?: number;
    /** 工作流状态 */
    workflowStatus?: WorkFlowNodeStatus;
    /** 描述 */
    description?: string;
    /** 流程配置 */
    nodeConfig?: NodeModelType;
  };

  /** 节点 */
  type NodeModelType = {
    /** 节点名称 */
    nodeName?: string;
    /** 节点类型 */
    nodeType?: number;
    /** 条件节点列表 */
    conditionNodes?: ConditionNodeType[];
    /** 子节点 */
    childNode?: NodeModelType;
  };

  /** 条件节点 */
  type ConditionNodeType = {
    id?: string;
    /** 节点名称 */
    nodeName?: string;
    /** 优先级 */
    priorityLevel?: number;
    /** 任务批次状态 */
    taskBatchStatus?: TaskBatchStatus;
    /** 任务执行时间 */
    executionAt?: string;
    /** 操作原因 */
    operationReason?: number;
    /** 失败策略 */
    failStrategy?: FailStrategy;
    /** 工作流状态 */
    workflowNodeStatus?: WorkFlowNodeStatus;
    /** 任务节点 */
    jobTask?: TaskNodeType;
    /** 任务实例列表 */
    jobBatchList?: {
      /** 任务实例 ID */
      id: string;
      /** 任务 ID */
      jobId: string;
      /** 任务批次状态 */
      taskBatchStatus: number;
    }[];
    /** 条件节点 */
    decision?: BrachNodeType;
    /** 回调节点 */
    callback?: CallbackNodeType;
    /** 子节点 */
    childNode?: NodeModelType;
  };

  /** 任务节点 */
  type TaskNodeType = {
    /** 任务ID */
    jobId?: string;
    /** 任务名称 */
    jobName?: string;
  };

  /** 条件节点 */
  type BrachNodeType = {
    /** 条件节点表达式 */
    nodeExpression?: string;
    /** 表达式类型 */
    expressionType?: Expression;
    /** 判定逻辑 */
    logicalCondition?: LogicalCondition;
    /** 其他情况标识 */
    defaultDecision?: number;
  };

  /** 回调节点 */
  type CallbackNodeType = {
    /** webhook */
    webhook?: string;
    /** 请求类型 */
    contentType?: ContentType;
    /** 秘钥 */
    secret?: string;
  };

  /** 任务批次状态 */
  type TaskBatchStatusType = {
    /** 名称 */
    name: string;
    /** 标识 */
    title: string;
    /** 颜色 */
    color: string;
    /** 图标 */
    icon: string;
  };
}
