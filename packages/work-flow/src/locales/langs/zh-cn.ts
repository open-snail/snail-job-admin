const local: FlowI18n.Schema = {
  snail: {
    groupName: '组名称',
    taskName: '任务名称',
    blockStrategy: '阻塞策略',
    failStrategy: '失败策略',
    retry: '重试',
    ignore: '忽略',
    stop: '停止',
    refresh: '刷新',
    form: {
      groupName: '请选择组',
      workflowTip: '请配置工作流',
      executeMessage: '执行重试成功',
      stopMessage: '停止任务成功',
      taskTip: '请选择任务'
    },
    jobBatch: {
      groupName: '组名称',
      jobName: '任务名称',
      executorInfo: '执行器名称',
      executorType: '执行器类型',
      executionAt: '开始执行时间',
      taskBatchStatus: '状态',
      operationReason: '操作原因',
      createDt: '创建时间',
      jobTask: {
        id: 'ID',
        groupName: '组名称',
        taskStatus: '状态',
        clientInfo: '地址',
        argsStr: '参数',
        resultMessage: '结果',
        retryCount: '重试次数',
        createDt: '开始执行时间'
      }
    },
    enum: {
      failStrategy: {
        skip: '跳过',
        blockage: '阻塞'
      },
      blockStrategy: {
        discards: '丢弃',
        overwrite: '覆盖',
        parallelism: '并行'
      },
      taskBatchStatus: {
        waiting: '待处理',
        running: '运行中',
        success: '成功',
        fail: '失败',
        stop: '停止',
        cancel: '取消',
        decisionFailed: '判定未通过',
        skip: '跳过'
      },
      workFlowNodeStatus: {
        open: '开启',
        close: '关闭'
      },
      triggerType: {
        time: '固定时间',
        cron: 'CRON 表达式'
      },
      jobOperationReason: {
        none: '无',
        taskExecutionTimeout: '任务执行超时',
        notClient: '无客户端节点',
        closed: '任务已关闭',
        discard: '任务丢弃',
        overlay: '任务被覆盖',
        notExecutionTask: '无可执行任务项',
        taskExecutionError: '任务执行期间发生非预期异常',
        mannerStop: '手动停止',
        workflowConditionNodeExecutionError: '条件节点执行异常',
        jobTaskInterrupted: '任务中断',
        workflowCallbackNodeExecutionError: '回调节点执行异常',
        workflowNodeNoRequired: '无需处理',
        workflowNodeClosedSkipExecution: '节点关闭跳过执行',
        workflowDecisionFailed: '判定未通过'
      },
      executorType: {
        java: 'Java'
      }
    }
  },
  node: {
    priority: '优先级',
    task: {
      name: '任务',
      add: '添加任务',
      nodeName: '任务节点',
      conditionNodes: {
        nodeName: '任务 1'
      }
    },
    condition: {
      nodeName: '决策节点',
      conditionNodes: {
        nodeName: '条件',
        otherNodeName: '其他情况',
        otherTip: '该分支为系统默认创建，与其他分支互斥。只有当其他分支都无法运行时，才会运行该分支。',
        priority: '优先级',
        conditionTip: '请设置条件',
        logicalCondition: '判定逻辑',
        expressionType: '表达式类型',
        nodeExpression: '节点表达式',
        otherNodeTip: '如存在未满足其他分支条件的情况，则进入此分支'
      },
      addBranch: '添加条件'
    },
    callback: {
      nodeName: '回调通知',
      conditionNodes: {
        nodeName: '回调通知',
        contentType: '请求类型',
        webhookTip: '请配置回调通知'
      }
    },
    endNode: '流程结束',
    log: {
      title: '日志详情'
    }
  }
};

export default local;
