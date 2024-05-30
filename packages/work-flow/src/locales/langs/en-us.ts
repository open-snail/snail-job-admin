const local: FlowI18n.Schema = {
  snail: {
    groupName: 'Group Name',
    taskName: 'Task Name',
    blockStrategy: 'Block Strategy',
    failStrategy: 'Fail Strategy',
    retry: 'Retry',
    ignore: 'Ignore',
    stop: 'Stop',
    refresh: 'Refresh',
    form: {
      groupName: 'Please select group',
      workflowTip: 'Please configure workflow',
      executeMessage: 'Execute Retry Succeeded',
      stopMessage: 'Stop mission successful',
      taskTip: 'Please select task'
    },
    jobBatch: {
      groupName: 'Group name',
      jobName: 'Job name',
      executorInfo: 'Executor Name',
      executorType: 'Executor type',
      executionAt: 'Start execution time',
      taskBatchStatus: 'Task Batch Status',
      operationReason: 'Reason for operation',
      createDt: 'Create time',
      jobTask: {
        id: 'ID',
        groupName: 'Group name',
        taskStatus: 'Status',
        clientInfo: 'Client address',
        argsStr: 'Argument string',
        resultMessage: 'Result message',
        retryCount: 'Number of retries',
        createDt: 'Create time'
      }
    },
    enum: {
      failStrategy: {
        skip: 'Skip',
        blockage: 'Blockage'
      },
      blockStrategy: {
        discards: 'Discards',
        overwrite: 'Overwrite',
        parallelism: 'Parallelism'
      },
      taskBatchStatus: {
        waiting: 'Waiting',
        running: 'Running',
        success: 'Success',
        fail: 'Fail',
        stop: 'Stop',
        cancel: 'Cancel',
        decisionFailed: 'Decision Failed',
        skip: 'Skip'
      },
      workFlowNodeStatus: {
        open: 'Open',
        close: 'Close'
      },
      triggerType: {
        time: 'Fixed Time',
        cron: 'CRON Expressions'
      },
      jobOperationReason: {
        none: 'None',
        taskExecutionTimeout: 'Task execution timeout',
        notClient: 'No client',
        closed: 'Job closed',
        discard: 'Job discard',
        overlay: 'Job overlapped',
        notExecutionTask: 'No execution task',
        taskExecutionError: 'Execution error',
        mannerStop: 'Manual stop',
        workflowConditionNodeExecutionError: 'Condition node execution error',
        jobTaskInterrupted: 'Job interrupted',
        workflowCallbackNodeExecutionError: 'Callback node execution error',
        workflowNodeNoRequired: 'No process required',
        workflowNodeClosedSkipExecution: 'Node closed, skip execution',
        workflowDecisionFailed: 'Workflow decision failed'
      },
      executorType: {
        java: 'Java'
      }
    }
  },
  node: {
    priority: 'Priority',
    task: {
      name: 'Task',
      add: 'Add Task',
      nodeName: 'Task Node',
      conditionNodes: {
        nodeName: 'Task 1'
      }
    },
    condition: {
      nodeName: 'Condition Node',
      conditionNodes: {
        nodeName: 'Condition 1',
        otherNodeName: 'Other Situations',
        otherTip:
          'This branch is created by default and is mutually exclusive with other branches. It will only be run if none of the other branches can be run.',
        priority: 'Priority',
        conditionTip: 'Please set conditions',
        logicalCondition: 'Logical Condition',
        expressionType: 'Expression Type',
        nodeExpression: 'Node Expression',
        otherNodeTip:
          'If there is a situation where the conditions of the other branches are not met, then go to this branch'
      },
      addBranch: 'Add Condition'
    },
    callback: {
      nodeName: 'Callback Notice',
      conditionNodes: {
        nodeName: 'Callback Notice',
        contentType: 'Content Type',
        webhookTip: 'Please configure callback notifications'
      }
    },
    endNode: 'End Node',
    log: {
      title: 'Log Detail'
    }
  }
};

export default local;
