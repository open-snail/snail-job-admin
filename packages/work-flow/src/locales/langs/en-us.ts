const local: FlowI18n.Schema = {
  snail: {
    groupName: 'Group Name',
    taskName: 'Task Name',
    blockStrategy: 'Block Strategy',
    failStrategy: 'Fail Strategy',
    retry: 'Retry',
    ignore: 'Ignore',
    stop: 'Stop',
    form: {
      groupName: 'Please select group',
      workflowTip: 'Please configure workflow',
      executeMessage: 'Execute Retry Succeeded',
      stopMessage: 'Stop mission successful',
      taskTip: 'Please select task'
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
    endNode: 'End Node'
  }
};

export default local;
