import { $t } from '../locales';
import { transformRecordToOption } from '../utils/common';

export const blockStrategyRecord: Record<Flow.BlockStrategy, FlowI18n.I18nKey> = {
  1: 'snail.enum.blockStrategy.discards',
  2: 'snail.enum.blockStrategy.overwrite',
  3: 'snail.enum.blockStrategy.parallelism'
};

export const blockStrategyOptions = transformRecordToOption(blockStrategyRecord);

export const failStrategyRecord: Record<Flow.FailStrategy, FlowI18n.I18nKey> = {
  1: 'snail.enum.failStrategy.skip',
  2: 'snail.enum.failStrategy.blockage'
};

export const failStrategyOptions = transformRecordToOption(failStrategyRecord);

export const logicalConditionRecord: Record<Flow.LogicalCondition, string> = {
  1: 'and',
  2: 'or'
};

export const logicalConditionOptions = transformRecordToOption(logicalConditionRecord);

export const expressionRecord: Record<Flow.Expression, string> = {
  1: 'SpEl',
  2: 'Aviator',
  3: 'QL'
};

export const expressionOptions = transformRecordToOption(expressionRecord);

export const contentTypeRecord: Record<Flow.ContentType, string> = {
  1: 'application/json',
  2: 'application/x-www-form-urlencoded'
};

export const triggerTypeRecord: Record<Flow.TriggerType, FlowI18n.I18nKey> = {
  2: 'snail.enum.triggerType.time',
  3: 'snail.enum.triggerType.cron'
};

export const triggerTypeOptions = transformRecordToOption(triggerTypeRecord);

export const workFlowNodeStatusRecord: Record<Flow.WorkFlowNodeStatus, FlowI18n.I18nKey> = {
  0: 'snail.enum.workFlowNodeStatus.close',
  1: 'snail.enum.workFlowNodeStatus.open'
};

export const workFlowNodeStatusOptions = transformRecordToOption(workFlowNodeStatusRecord);

export const taskBatchStatusEnum: Record<Flow.TaskBatchStatus, Flow.TaskBatchStatusType> = {
  1: {
    title: $t('snail.enum.taskBatchStatus.waiting'),
    name: 'waiting',
    color: '#64a6ea',
    icon: 'ant-design:warning-outlined'
  },
  2: {
    title: $t('snail.enum.taskBatchStatus.running'),
    name: 'running',
    color: '#1b7ee5',
    icon: 'ant-design:clock-circle-outlined'
  },
  3: {
    title: $t('snail.enum.taskBatchStatus.success'),
    name: 'success',
    color: '#087da1',
    icon: 'ant-design:check-circle-outlined'
  },
  4: {
    title: $t('snail.enum.taskBatchStatus.fail'),
    name: 'fail',
    color: '#f52d80',
    icon: 'ant-design:close-circle-outlined'
  },
  5: {
    title: $t('snail.enum.taskBatchStatus.stop'),
    name: 'stop',
    color: '#ac2df5',
    icon: 'ant-design:stop-outlined'
  },
  6: {
    title: $t('snail.enum.taskBatchStatus.cancel'),
    name: 'cancel',
    color: '#f5732d',
    icon: 'ant-design:close-circle-outlined'
  },
  98: {
    title: $t('snail.enum.taskBatchStatus.decisionFailed'),
    name: 'decision-failed',
    color: '#b63f1a',
    icon: 'ant-design:close-circle-outlined'
  },
  99: {
    title: $t('snail.enum.taskBatchStatus.skip'),
    name: 'skip',
    color: '#00000036',
    icon: 'ant-design:close-circle-outlined'
  }
};

export const taskBatchStatusRecord: Record<Flow.TaskBatchStatus, FlowI18n.I18nKey> = {
  1: 'snail.enum.taskBatchStatus.waiting',
  2: 'snail.enum.taskBatchStatus.running',
  3: 'snail.enum.taskBatchStatus.success',
  4: 'snail.enum.taskBatchStatus.fail',
  5: 'snail.enum.taskBatchStatus.stop',
  6: 'snail.enum.taskBatchStatus.cancel',
  98: 'snail.enum.taskBatchStatus.decisionFailed',
  99: 'snail.enum.taskBatchStatus.skip'
};

export const taskBatchStatusOptions = transformRecordToOption(taskBatchStatusRecord);

export const operationReasonRecord: Record<Flow.OperationReason, FlowI18n.I18nKey> = {
  0: 'snail.enum.jobOperationReason.none',
  1: 'snail.enum.jobOperationReason.taskExecutionTimeout',
  2: 'snail.enum.jobOperationReason.notClient',
  3: 'snail.enum.jobOperationReason.closed',
  4: 'snail.enum.jobOperationReason.discard',
  5: 'snail.enum.jobOperationReason.overlay',
  6: 'snail.enum.jobOperationReason.notExecutionTask',
  7: 'snail.enum.jobOperationReason.taskExecutionError',
  8: 'snail.enum.jobOperationReason.mannerStop',
  9: 'snail.enum.jobOperationReason.workflowConditionNodeExecutionError',
  10: 'snail.enum.jobOperationReason.jobTaskInterrupted',
  11: 'snail.enum.jobOperationReason.workflowCallbackNodeExecutionError',
  12: 'snail.enum.jobOperationReason.workflowNodeNoRequired',
  13: 'snail.enum.jobOperationReason.workflowNodeClosedSkipExecution',
  14: 'snail.enum.jobOperationReason.workflowDecisionFailed'
};
export const operationReasonOptions = transformRecordToOption(operationReasonRecord);

export const executorTypeRecord: Record<Flow.ExecutorType, FlowI18n.I18nKey> = {
  1: 'snail.enum.executorType.java'
};

export const executorTypeRecordOptions = transformRecordToOption(executorTypeRecord);
