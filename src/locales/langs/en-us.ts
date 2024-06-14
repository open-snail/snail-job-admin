const local: App.I18n.Schema = {
  system: {
    title: 'Snail Job',
    desc: 'A flexible, reliable, and fast platform for distributed task retry and distributed task scheduling.',
    updateTitle: 'System Version Update Notification',
    updateContent: 'A new version of the system has been detected. Do you want to refresh the page immediately?',
    updateConfirm: 'Refresh immediately',
    updateCancel: 'Later'
  },
  common: {
    action: 'Action',
    add: 'Add',
    addSuccess: 'Add Success',
    backToHome: 'Back to home',
    batchDelete: 'Batch Delete',
    batchAdd: 'Batch Add',
    cancel: 'Cancel',
    close: 'Close',
    check: 'Check',
    expandColumn: 'Expand Column',
    columnSetting: 'Column Setting',
    config: 'Config',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    rollback: 'Rollback',
    batchRollback: 'Batch Rollback',
    rollbackSuccess: 'Rollback Success',
    deleteSuccess: 'Delete Success',
    confirmDelete: 'Are you sure you want to delete?',
    checkUploadType: 'Only JSON format files can be uploaded, please re-upload',
    second: 's',
    millisecond: 'ms',
    import: 'Import',
    export: 'Export',
    exportAll: 'Are you sure to export all?',
    exportPar: 'Are you sure to export {num} pieces of data?',
    edit: 'Edit',
    detail: 'Detail',
    index: 'Index',
    keywordSearch: 'Please enter keyword',
    logout: 'Logout',
    logoutConfirm: 'Are you sure you want to log out?',
    updatePassword: 'Update password',
    changePassword: 'Change password',
    lookForward: 'Coming soon',
    modify: 'Modify',
    modifySuccess: 'Modify Success',
    noData: 'No Data',
    operate: 'Operate',
    pleaseCheckValue: 'Please check whether the value is valid',
    refresh: 'Refresh',
    reset: 'Reset',
    search: 'Search',
    switch: 'Switch',
    tip: 'Tip',
    trigger: 'Trigger',
    update: 'Update',
    updateSuccess: 'Update Success',
    updateFailed: 'Update Failed',
    downloadFail: 'File download failed',
    success: 'Success',
    fail: 'Fail',
    stop: 'Stop',
    confirmStop: 'Confirm Stop?',
    execute: 'Execute',
    batchList: 'Batch',
    copy: 'Copy',
    resume: 'Resume',
    pause: 'Pause',
    finish: 'Finish',
    retry: 'Retry',
    running: 'Running',
    operateSuccess: 'Operate successfully',
    operateFailed: 'Operate failed',
    executeSuccess: 'Execute successfully',
    executeFailed: 'Execute failed',
    confirmExecute: 'Are you sure you want to execute?',
    confirmResume: 'Are you sure you want to resume?',
    confirmPause: 'Are you sure you want to pause?',
    confirmFinish: 'Are you sure you want to finishe?',
    confirmRetry: 'Are you sure you want to retry?',
    yesOrNo: {
      yes: 'Yes',
      no: 'No'
    },
    status: {
      enable: 'Enable',
      disable: 'Disable'
    },
    systemTaskType: {
      retry: 'Retry Task',
      callback: 'Callback Task',
      job: 'Job Task',
      workflow: 'Workflow'
    },
    routeKey: {
      routeLabel: 'Route Key',
      routeForm: 'Please enter route key',
      items: {
        consistentHash: 'Consistent hash',
        random: 'Random',
        lru: 'LRU',
        round: 'Round robin'
      }
    },
    blockStrategy: {
      label: 'Block Strategy',
      form: 'Please enter block strategy',
      items: {
        discard: 'Discard',
        overwrite: 'Overwrite',
        parallel: 'Parallel'
      }
    },
    executorType: {
      label: 'Executor Type',
      form: 'Please enter executor type',
      items: {
        java: 'Java'
      }
    },
    taskType: {
      label: 'Task Type',
      form: 'Please enter task type',
      items: {
        cluster: 'Cluster',
        broadcast: 'Broadcast',
        slice: 'Static Slice',
        map: 'Map',
        mapreduce: 'MapReduce'
      }
    },
    triggerType: {
      label: 'Trigger type',
      form: 'Please enter trigger type',
      items: {
        cron: 'CRON',
        fixed: 'Fixed time',
        workflow: 'Workflow'
      }
    },
    taskBatchStatus: {
      label: 'Task Batch Status',
      form: 'Please enter task batch status',
      items: {
        waiting: 'Waiting',
        running: 'Running',
        success: 'Success',
        fail: 'Fail',
        stop: 'Stop',
        cancel: 'Cancel'
      }
    },
    taskStatus: {
      label: 'Task Status',
      form: 'Please enter task status',
      items: {
        running: 'Running',
        success: 'Success',
        fail: 'Fail',
        stop: 'Stop',
        cancel: 'Cancel'
      }
    },
    jobOperationReason: {
      label: 'Job Operation Reason',
      form: 'Please enter job operation reason',
      items: {
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
      }
    },
    updateDt: 'Updated Time',
    createDt: 'Created Time'
  },
  request: {
    logout: 'Logout user after request failed',
    logoutMsg: 'User status is invalid, please log in again',
    logoutWithModal: 'Pop up modal after request failed and then log out user',
    logoutWithModalMsg: 'User status is invalid, please log in again',
    refreshToken: 'The requested token has expired, refresh the token',
    tokenExpired: 'The requested token has expired'
  },
  theme: {
    themeSchema: {
      title: 'Theme Schema',
      light: 'Light',
      dark: 'Dark',
      auto: 'Follow System'
    },
    grayscale: 'Grayscale',
    layoutMode: {
      title: 'Layout Mode',
      vertical: 'Vertical Menu Mode',
      horizontal: 'Horizontal Menu Mode',
      'vertical-mix': 'Vertical Mix Menu Mode',
      'horizontal-mix': 'Horizontal Mix menu Mode'
    },
    recommendColor: 'Apply Recommended Color Algorithm',
    recommendColorDesc: 'The recommended color algorithm refers to',
    themeColor: {
      title: 'Theme Color',
      primary: 'Primary',
      info: 'Info',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
      followPrimary: 'Follow Primary'
    },
    scrollMode: {
      title: 'Scroll Mode',
      wrapper: 'Wrapper',
      content: 'Content'
    },
    page: {
      animate: 'Page Animate',
      mode: {
        title: 'Page Animate Mode',
        fade: 'Fade',
        'fade-slide': 'Slide',
        'fade-bottom': 'Fade Zoom',
        'fade-scale': 'Fade Scale',
        'zoom-fade': 'Zoom Fade',
        'zoom-out': 'Zoom Out',
        none: 'None'
      }
    },
    fixedHeaderAndTab: 'Fixed Header And Tab',
    header: {
      height: 'Header Height',
      breadcrumb: {
        visible: 'Breadcrumb Visible',
        showIcon: 'Breadcrumb Icon Visible'
      }
    },
    tab: {
      visible: 'Tab Visible',
      cache: 'Tab Cache',
      height: 'Tab Height',
      mode: {
        title: 'Tab Mode',
        chrome: 'Chrome',
        button: 'Button'
      }
    },
    sider: {
      inverted: 'Dark Sider',
      width: 'Sider Width',
      collapsedWidth: 'Sider Collapsed Width',
      mixWidth: 'Mix Sider Width',
      mixCollapsedWidth: 'Mix Sider Collapse Width',
      mixChildMenuWidth: 'Mix Child Menu Width'
    },
    footer: {
      visible: 'Footer Visible',
      fixed: 'Fixed Footer',
      height: 'Footer Height',
      right: 'Right Footer'
    },
    themeDrawerTitle: 'Theme Configuration',
    pageFunTitle: 'Page Function',
    configOperation: {
      copyConfig: 'Copy Config',
      copySuccessMsg: 'Copy Success, Please replace the variable "themeSettings" in "src/theme/settings.ts"',
      resetConfig: 'Reset Config',
      resetSuccessMsg: 'Reset Success'
    }
  },
  route: {
    login: 'Login',
    403: 'No Permission',
    404: 'Page Not Found',
    500: 'Server Error',
    'iframe-page': 'Iframe',
    home: 'Home',
    document: 'Document',
    document_project: 'Project Document',
    'document_project-link': 'Project Document(External Link)',
    document_vue: 'Vue Document',
    document_vite: 'Vite Document',
    document_unocss: 'UnoCSS Document',
    document_naive: 'Naive UI Document',
    document_antd: 'Ant Design Vue Document',
    about: 'About',
    pods: 'Online Machine',
    namespace: 'Namespace',
    notify: 'Notify',
    notify_recipient: 'Notify Recipient',
    notify_scene: 'Notify Scene',
    retry: 'Retry Task',
    retry_task: 'Retry Task',
    retry_scene: 'Retry Scene',
    retry_log: 'Retry Log',
    'retry_dead-letter': 'Retry Dead Letter',
    user: 'User',
    user_manager: 'User Info',
    workflow: 'Workflow',
    workflow_task: 'Workflow Task',
    workflow_batch: 'Workflow Batch',
    workflow_form: 'Workflow',
    workflow_form_copy: 'Copy Workflow',
    workflow_form_batch: 'Workflow Batch Detail',
    workflow_form_detail: 'Workflow Detail',
    workflow_form_edit: 'Edit Workflow',
    workflow_form_add: 'Add Workflow',
    job: 'Schedule Task Management',
    job_task: 'Schedule Task List',
    job_batch: 'Schedule Task Batch List',
    exception: 'Exception',
    exception_403: '403',
    exception_404: '404',
    exception_500: '500',
    group: 'Group Config'
  },
  page: {
    common: {
      upadteTime: 'Update Time',
      createTime: 'Create Time'
    },
    login: {
      common: {
        loginOrRegister: 'Login/Register',
        userNamePlaceholder: 'Please enter user name',
        phonePlaceholder: 'Please enter phone number',
        codePlaceholder: 'Please enter verification code',
        passwordPlaceholder: 'Please enter password',
        confirmPasswordPlaceholder: 'Please enter password again',
        codeLogin: 'Verification code login',
        confirm: 'Confirm',
        login: 'Login',
        back: 'Back',
        validateSuccess: 'Verification passed',
        loginSuccess: 'Login successfully',
        welcomeBack: 'Welcome back, {userName} !'
      },
      pwdLogin: {
        title: 'Password Login',
        rememberMe: 'Remember Me',
        forgetPassword: 'Forget Password?',
        register: 'Register',
        otherAccountLogin: 'Other Account Login',
        otherLoginMode: 'Other Login Mode',
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User'
      }
    },
    about: {
      title: 'About',
      introduction: `SoybeanAdmin is an elegant and powerful admin template, based on the latest front-end technology stack, including Vue3, Vite5, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. SoybeanAdmin provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.`,
      projectInfo: {
        title: 'Project Info',
        version: 'Version',
        latestBuildTime: 'Latest Build Time',
        githubLink: 'Github Link',
        giteeLink: 'Gitee Link',
        officialWebsite: 'Home Page',
        previewLink: 'Preview Link',
        videoTutorial: 'Video Tutorial'
      },
      prdDep: 'Production Dependency',
      devDep: 'Development Dependency'
    },
    home: {
      // 卡片统计
      retryTaskCount: 'Retry Task',
      jobTaskCount: 'Job Task',
      userCount: 'User',
      retryDeadLetter: 'Retry DeadLetter',
      retryTaskTip: 'Total task volume: retry/callback task volume',
      jobTask: 'Job Task',
      jobBatch: 'Job Batch',
      jobTaskTip: 'Success rate: total completion/total dispatch amount',
      onlineServiceCount: 'Online Machine',
      onlineServiceTip: 'Always online machines: the sum of clients and servers registered to the system',
      workflow: 'Workflow',
      workflowTip: 'Success rate: total completion/total dispatch amount',
      machine: {
        type: {
          client: 'Client',
          server: 'Server'
        }
      },
      retryTask: {
        title: 'Retry Task',
        status: {
          maxRetryTimes: 'Max times',
          pauseRetry: 'Pause'
        }
      },
      retryTab: {
        params: {
          day: 'Today',
          week: 'Lask Week',
          month: 'Last Month',
          year: 'Year Round'
        },
        rank: {
          title: 'Failure Ranking',
          titleRetry: 'Total Amount Ranking'
        },
        task: {
          title: 'Task Summary',
          groupName: 'Group Name',
          run: 'Running Task Total',
          total: 'Task Total'
        },
        pie: {
          title: 'Success scale chart'
        }
      },
      projectNews: {
        title: 'Project News',
        moreNews: 'More News',
        desc1: 'Soybean created the open source project soybean-admin on May 28, 2021!',
        desc2: 'Yanbowe submitted a bug to soybean-admin, the multi-tab bar will not adapt.',
        desc3: 'Soybean is ready to do sufficient preparation for the release of soybean-admin!',
        desc4: 'Soybean is busy writing project documentation for soybean-admin!',
        desc5: 'Soybean just wrote some of the workbench pages casually, and it was enough to see!'
      },
      creativity: 'Creativity'
    },
    pods: {
      title: 'Online Machine',
      nodeType: 'Node Type',
      groupName: 'Group Name',
      hostId: 'Pod ID',
      hostIp: 'IP',
      hostPort: 'Port',
      consumerBuckets: 'Path/Buckets',
      updateDt: 'Update Time',
      contextPath: 'Path/Buckets',
      form: {
        groupName: 'Please enter group name'
      },
      type: {
        client: 'Client',
        server: 'Server'
      }
    },
    namespace: {
      title: 'Namespace',
      name: 'Name',
      keyword: 'Name/UniqueId',
      uniqueId: 'Unique ID (default UUID)',
      form: {
        name: 'Please enter name',
        keyword: 'Please enter name/uniqueId',
        uniqueId: 'Please enter Unique ID',
        uniqueIdRule:
          'Must be between 1 and 64 characters in length. Format: numbers, letters, underscores, or hyphens.'
      },
      addNamespace: 'Add Namespace',
      editNamespace: 'Edit Namespace'
    },
    groupConfig: {
      title: 'Group Config List',
      detail: 'Group Detail',
      namespaceId: 'Namespace ID',
      groupName: 'Group Name',
      token: 'Token',
      groupStatus: 'Status',
      idGeneratorMode: 'ID Generator Mode',
      version: 'Version',
      groupPartition: 'Partition',
      initScene: 'Initial Scene',
      bucketIndex: 'Bucket',
      updateDt: 'Update Time',
      description: 'Description',
      commonConfig: 'Common Config',
      retryConfig: 'RetryConfig',
      form: {
        groupName: 'Please enter group name',
        token: 'Please enter token',
        groupStatus: 'Please select group status',
        description: 'Please enter description',
        idGeneratorMode: 'Please select ID generator mode',
        groupPartition: 'Please select group partition',
        initScene: 'Initialized scene',
        collapseCommon: 'Common config',
        collapseRetry: 'Retry config',
        groupNameRule:
          'Group name: Must be between 1 and 64 characters in length. Format: numbers, letters, underscores, or hyphens.'
      },
      idMode: {
        idWorker: 'Id Workder',
        segment: 'Segment'
      },
      addGroupConfig: 'Add Group Config',
      editGroupConfig: 'Edit Group Config',
      generateToken: 'Generate Randomly'
    },
    notifyConfig: {
      title: 'Alarm Notify List',
      groupName: 'Group name',
      businessName: 'Business ID',
      notifyStatus: 'State',
      notifyType: 'Notify type',
      notifyScene: 'Notify scene',
      notifyThreshold: 'Notify threshold',
      description: 'Describe',
      notifyAttribute: 'Notify Attribute',
      retryScene: 'Retry Scene',
      job: 'Job',
      workflow: 'Workflow',
      form: {
        businessId: 'Please select Business ID',
        description: 'Please enter Describe',
        notifyType: 'Please select Notification type',
        notifyAttribute: 'Please enter notify attribute',
        notifyScene: 'Please select Notification scene',
        groupName: 'Please select Group name',
        notifyThreshold: 'Please enter Notification threshold',
        notifyStatus: 'Please select State',
        systemTaskType: 'Please enter task type',
        notifyRecipient: 'Please enter recipient',
        rateLimiterThreshold: 'Please enter rate limiter threshold',
        sceneName: 'Please enter scene name',
        jobName: 'Please enter job name',
        workflowName: 'Please enter workflow name'
      },
      addNotifyConfig: 'Add Alarm notification',
      editNotifyConfig: 'Add Alarm notification',
      systemTaskType: 'Task type',
      retryNotifyScene: {
        maxRetry: 'Maximum retry count reached',
        maxRetryError: 'Maximum retry error count reached',
        clientReportError: 'Client report error',
        clientComponentError: 'Client component error',
        retryTaskReachThreshold: 'Retry task reach threshold',
        retryTaskEnterDeadLetter: 'Retry task enter dead letter'
      },
      jobNotifyScene: {
        jobTaskError: 'Task execute error',
        jobClientError: 'Client execute error'
      },
      workflowNotifyScene: {
        workTaskError: 'Workflow task execute error',
        workflowClientError: 'Client execute error'
      },
      notifyRecipient: 'Notify recipient',
      rateLimiterStatus: 'Rate limiter status',
      rateLimiterThreshold: 'Rate limiter threshold'
    },
    notifyRecipient: {
      title: 'Notify Recipient List',
      detail: 'Notify Recipient Detail',
      recipientName: 'Recipient Name',
      notifyType: 'Notification Type',
      notifyAttribute: 'Attribute Information',
      description: 'Description',
      form: {
        description: 'Please enter description',
        notifyAttribute: 'Please enter attribute information',
        recipientName: 'Please enter recipient name',
        notifyType: 'Please select notification type',
        dingDingAts: "Please enter the {'@'} phone number or DingTalk ID",
        weComAts: "Please enter the {'@'} Enterprise WeChat user ID",
        larkAts: "Please enter the {'@'} open_id",
        webhookUrl: 'Please enter URL',
        secret: 'Please enter secret',
        contentType: 'Please enter Request type',
        applicationJson: 'application/json',
        applicationXWwwFormUrlencoded: 'application/x-www-form-urlencoded'
      },
      addNotifyRecipient: 'Add Notify Recipient',
      editNotifyRecipient: 'Edit Notify Recipient',
      ats: "{'@'} Notification Recipient",
      webhookUrl: 'Notification Address',
      secret: 'secret',
      tos: 'Recipient Email Address',
      dingDing: 'DingTalk',
      email: 'Email',
      weCom: 'WeCom',
      lark: 'Lark',
      webhook: 'webhook',
      contentType: 'Request type'
    },
    retryDeadLetter: {
      title: 'RetryDeadLetter List',
      detail: 'RetryDeadLetter Detail',
      uniqueId: 'UniqueId',
      groupName: 'Group name',
      sceneName: 'Scene name',
      idempotentId: 'Idempotent ID',
      bizNo: 'bizNo',
      taskType: 'taskType',
      createDt: 'createDt',
      form: {
        title: 'Please enter RetryDeadLetter List',
        uniqueId: 'Please enter UniqueId',
        groupName: 'Please enter Group name',
        sceneName: 'Please enter Scene name',
        idempotentId: 'Please enter Idempotent ID',
        bizNo: 'Please enter bizNo',
        taskType: 'Please enter taskType',
        createDt: 'Please enter createDt'
      }
    },
    retryTask: {
      title: 'RetryTask List',
      detail: 'RetryTask Detail',
      uniqueId: 'UniqueId',
      groupName: 'Group name',
      sceneName: 'Scene name',
      idempotentId: 'Idempotent ID',
      bizNo: 'Business Number',
      executorName: 'Actuator name',
      argsStr: 'Actuator arguments',
      nextTriggerAt: 'Next trigger time',
      retryCount: 'Number of retries',
      retryStatus: 'Retry status',
      taskType: 'Task type',
      form: {
        retryStatus: 'Please enter Retry status',
        bizNo: 'Please enter Business Number',
        uniqueId: 'Please enter UniqueId',
        groupName: 'Please enter Group name',
        argsStr: 'Please enter Execution method parameters',
        sceneName: 'Please enter Scene name',
        executorName: 'Please enter Actuator name',
        taskType: 'Please enter Task type',
        idempotentId: 'Please enter Idempotent ID',
        logStr: 'Please enter log info'
      },
      retryStatusType: {
        retrying: 'Retrying',
        finished: 'Finished',
        maxRetry: 'Maximum retry count reached',
        paused: 'Paused'
      },
      taskTypeDict: {
        retry: 'Retry data',
        callback: 'Callback data'
      },
      generateIdempotentId: 'Generate by client',
      addRetryTask: 'Add Retry task',
      editRetryTask: 'Add Retry task',
      batchAddRetryTask: 'Batch add retry task'
    },
    retryScene: {
      title: 'Scene List',
      detail: 'Scene Detail',
      groupName: 'Group name',
      sceneName: 'Scene name',
      sceneStatus: 'State',
      backOff: 'Backoff strategy',
      maxRetryCount: 'Maximum number of retries',
      triggerInterval: 'Intervals',
      deadlineRequest: 'Call chain timeout',
      executorTimeout: 'Overtime time',
      createDt: 'Creation time',
      updateDt: 'Update time',
      description: 'Describe',
      routeKey: 'Routing strategy',
      form: {
        maxRetryCount: 'Please enter Maximum number of retries',
        triggerInterval: 'Please enter Intervals(s)',
        groupName: 'Please enter Group name',
        description: 'Please enter Describe',
        executorTimeout: 'Please enter Overtime time(s)',
        sceneName: 'Please enter Scene name',
        sceneStatus: 'Please enter State',
        deadlineRequest: 'Please enter Call chain timeout(ms)',
        routeKey: 'Please enter Routing strategy',
        backOff: 'Please enter Backoff strategy',
        sceneName2: 'Scene name: 1~64 characters. allowing: digit, letters, underscore or hyphens..'
      },
      addScene: 'Add Scenes',
      editScene: 'Add Scenes',
      backOffItem: {
        delayLevel: 'Delay level',
        fixed: 'Fixed rate',
        cron: 'CRON expression',
        random: 'Random delay'
      }
    },
    retryLog: {
      title: 'RetryLog List',
      detail: 'Retry Log Detail',
      UniqueId: 'UniqueId',
      groupName: 'Group name',
      sceneName: 'Scene name',
      retryStatus: 'Retry status',
      taskType: 'Task type',
      idempotentId: 'Idempotent ID',
      bizNo: 'Business Number',
      createDt: 'Creation time',

      form: {
        groupName: 'Please enter Group name',
        idempotentId: 'Please enter Idempotent ID',
        sceneName: 'Please enter Scene name',
        bizNo: 'Please enter Business Number',
        UniqueId: 'Please enter UniqueId'
      },
      addRetryLog: 'Add Retry log',
      editRetryLog: 'Add Retry log'
    },
    workflowBatch: {
      title: 'Workflow Batch List',
      workflowName: 'Workflow name',
      groupName: 'Group name',
      executionAt: 'Execution time',
      taskBatchStatus: 'State',
      operationReason: 'Reason for operation',
      createDt: 'Creation time',
      form: {
        workflowName: 'Please enter Workflow name',
        taskBatchStatus: 'Please enter State',
        groupName: 'Please enter Group name'
      },
      addWorkflowBatch: 'Add Workflow batch',
      editWorkflowBatch: 'Add Workflow batch'
    },
    workflow: {
      title: 'Workflow List',
      workflowName: 'Workflow name',
      groupName: 'Group name',
      nextTriggerAt: 'Trigger time',
      workflowStatus: 'State',
      triggerType: 'Trigger type',
      triggerInterval: 'Interval duration',
      executorTimeout: 'Overtime time',
      updateDt: 'Update time',
      form: {
        workflowName: 'Please enter Workflow name',
        groupName: 'Please enter Group name',
        workflowStatus: 'Please enter State'
      },
      addWorkflow: 'Add Workflow',
      editWorkflow: 'Add Workflow'
    },
    jobTask: {
      title: 'JobTask List',
      groupName: 'Group name',
      jobName: 'Mission name',
      argsStr: 'Method parameters',
      argsType: 'Parameter Type',
      nextTriggerAt: 'Next trigger time',
      jobStatus: 'State',
      routeKey: 'Routing strategy',
      executorType: 'Executor type',
      executorInfo: 'Executor name',
      triggerType: 'Trigger type',
      triggerInterval: 'Interval duration',
      blockStrategy: 'Blocking strategy',
      executorTimeout: 'Overtime time(s)',
      maxRetryTimes: 'Maximum number of retries',
      retryInterval: 'Retry interval',
      taskType: 'Task type',
      parallelNum: 'Parallel number',
      bucketIndex: 'Bucket',
      description: 'Description',
      updateDt: 'Update time',
      form: {
        jobStatus: 'Please enter status',
        maxRetryTimes: 'Please enter maximum number of retry',
        description: 'Please enter description',
        triggerType: 'Please enter trigger type',
        jobName: 'Please enter Mission name',
        executorTimeout: 'Please enter executor timeout',
        triggerInterval: 'Please enter interval duration',
        triggerInterval_CRON: 'Please enter cron expression',
        taskType: 'Please enter Task type',
        parallelNum: 'Please enter Parallel number',
        bucketIndex: 'Please enter Bucket',
        executorType: 'Please enter executor type',
        executorInfo: 'Please enter executor name',
        routeKey: 'Please enter Routing strategy',
        blockStrategy: 'Please enter Blocking strategy',
        argsType: 'Please enter Parameter Type',
        argsStr: 'Please enter executor arguments',
        groupName: 'Please enter Group name',
        retryInterval: 'Please enter retry interval'
      },
      addJobTask: 'Add job task',
      editJobTask: 'Edit job task',
      triggerTypeItem: {
        fixed: 'Fixed rate',
        cron: 'CRON expression',
        workflow: 'Workflow'
      },
      detail: 'Job Task Detail'
    },
    jobBatch: {
      title: 'Job Batch List',
      groupName: 'Group name',
      jobName: 'Job name',
      taskType: 'Task Type',
      executorInfo: 'Executor Name',
      executorType: 'Executor type',
      executionAt: 'Start execution time',
      taskBatchStatus: 'Task Batch Status',
      operationReason: 'Reason for operation',
      form: {
        groupName: 'Please enter group name',
        jobName: 'Please enter job name',
        taskBatchStatus: 'Please enter state'
      },
      detail: 'Job Batch Detail',
      jobTask: {
        title: 'Job task list',
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
    userManager: {
      title: 'UserCenter List',
      username: 'Username',
      role: 'Role',
      permissions: 'Permission',
      checkPassword: 'Confirm Password',
      password: 'Password',
      updatePassword: 'Update Password',
      permissionList: 'Permission List',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      form: {
        role: 'Please enter role',
        password: 'Please enter password',
        username: 'Please enter username',
        checkPassword: 'Please enter confirm password',
        permissions: 'Please select group',
        namespaceIds: 'Please select namespaces',
        oldPassword: 'Please enter old password',
        newPassword: 'Please enter new password'
      },
      addUser: 'Add User',
      editUser: 'Add User',
      roleItem: {
        user: 'User',
        admin: 'Admin'
      }
    },
    log: {
      title: 'Log Detail',
      view: 'View Log',
      info: 'Info'
    }
  },
  form: {
    required: 'Cannot be empty',
    userName: {
      required: 'Please enter user name',
      invalid: 'User name format is incorrect'
    },
    phone: {
      required: 'Please enter phone number',
      invalid: 'Phone number format is incorrect'
    },
    pwd: {
      required: 'Please enter password',
      invalid: '6-18 characters, including letters, numbers, and underscores'
    },
    confirmPwd: {
      required: 'Please enter password again',
      invalid: 'The two passwords are inconsistent'
    },
    code: {
      required: 'Please enter verification code',
      invalid: 'Verification code format is incorrect'
    },
    email: {
      required: 'Please enter email',
      invalid: 'Email format is incorrect'
    }
  },
  dropdown: {
    closeCurrent: 'Close Current',
    closeOther: 'Close Other',
    closeLeft: 'Close Left',
    closeRight: 'Close Right',
    closeAll: 'Close All'
  },
  icon: {
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    lang: 'Switch Language',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    magnify: 'Magnify',
    restore: 'Restore',
    reload: 'Reload Page',
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    pin: 'Pin',
    unpin: 'Unpin',
    namespace: 'Switch namespace'
  },
  datatable: {
    itemCount: 'Total {total} items'
  }
};

export default local;
