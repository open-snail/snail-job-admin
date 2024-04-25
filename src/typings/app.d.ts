/** The global namespace for the app */
declare namespace App {
  /** Theme namespace */
  namespace Theme {
    type ColorPaletteNumber = import('@sa/color-palette').ColorPaletteNumber;

    /** Theme token */
    type ThemeToken = {
      colors: ThemeTokenColor;
      boxShadow: {
        header: string;
        sider: string;
        tab: string;
      };
    };

    /** Theme setting */
    interface ThemeSetting {
      /** Theme scheme */
      themeScheme: UnionKey.ThemeScheme;
      /** Theme color */
      themeColor: string;
      /** Other color */
      otherColor: OtherColor;
      /** Whether info color is followed by the primary color */
      isInfoFollowPrimary: boolean;
      /** Layout */
      layout: {
        /** Layout mode */
        mode: UnionKey.ThemeLayoutMode;
        /** Scroll mode */
        scrollMode: UnionKey.ThemeScrollMode;
      };
      /** Page */
      page: {
        /** Whether to show the page transition */
        animate: boolean;
        /** Page animate mode */
        animateMode: UnionKey.ThemePageAnimateMode;
      };
      /** Header */
      header: {
        /** Header height */
        height: number;
        /** Header breadcrumb */
        breadcrumb: {
          /** Whether to show the breadcrumb */
          visible: boolean;
          /** Whether to show the breadcrumb icon */
          showIcon: boolean;
        };
      };
      /** Tab */
      tab: {
        /** Whether to show the tab */
        visible: boolean;
        /**
         * Whether to cache the tab
         *
         * If cache, the tabs will get from the local storage when the page is refreshed
         */
        cache: boolean;
        /** Tab height */
        height: number;
        /** Tab mode */
        mode: UnionKey.ThemeTabMode;
      };
      /** Fixed header and tab */
      fixedHeaderAndTab: boolean;
      /** Sider */
      sider: {
        /** Inverted sider */
        inverted: boolean;
        /** Sider width */
        width: number;
        /** Collapsed sider width */
        collapsedWidth: number;
        /** Sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixWidth: number;
        /** Collapsed sider width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixCollapsedWidth: number;
        /** Child menu width when the layout is 'vertical-mix' or 'horizontal-mix' */
        mixChildMenuWidth: number;
      };
      /** Footer */
      footer: {
        /** Whether to show the footer */
        visible: boolean;
        /** Whether fixed the footer */
        fixed: boolean;
        /** Footer height */
        height: number;
        /** Whether float the footer to the right when the layout is 'horizontal-mix' */
        right: boolean;
      };
    }

    interface OtherColor {
      info: string;
      success: string;
      warning: string;
      error: string;
    }

    interface ThemeColor extends OtherColor {
      primary: string;
    }

    type ThemeColorKey = keyof ThemeColor;

    type ThemePaletteColor = {
      [key in ThemeColorKey | `${ThemeColorKey}-${ColorPaletteNumber}`]: string;
    };

    type BaseToken = Record<string, Record<string, string>>;

    interface ThemeTokenColor extends ThemePaletteColor {
      nprogress: string;
      container: string;
      layout: string;
      inverted: string;
      base_text: string;
      [key: string]: string;
    }
  }

  /** Global namespace */
  namespace Global {
    type VNode = import('vue').VNode;
    type RouteLocationNormalizedLoaded = import('vue-router').RouteLocationNormalizedLoaded;
    type RouteKey = import('@elegant-router/types').RouteKey;
    type RouteMap = import('@elegant-router/types').RouteMap;
    type RoutePath = import('@elegant-router/types').RoutePath;
    type LastLevelRouteKey = import('@elegant-router/types').LastLevelRouteKey;

    /** The global header props */
    interface HeaderProps {
      /** Whether to show the logo */
      showLogo?: boolean;
      /** Whether to show the menu toggler */
      showMenuToggler?: boolean;
      /** Whether to show the menu */
      showMenu?: boolean;
    }

    /** The global menu */
    interface Menu {
      /**
       * The menu key
       *
       * Equal to the route key
       */
      key: string;
      /** The menu label */
      label: string;
      /** The menu i18n key */
      i18nKey?: I18n.I18nKey;
      /** The route key */
      routeKey: RouteKey;
      /** The route path */
      routePath: RoutePath;
      /** The menu icon */
      icon?: () => VNode;
      /** The menu children */
      children?: Menu[];
    }

    type Breadcrumb = Omit<Menu, 'children'> & {
      options?: Breadcrumb[];
    };

    /** Tab route */
    type TabRoute = Pick<RouteLocationNormalizedLoaded, 'name' | 'path' | 'meta'> &
      Partial<Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query' | 'matched'>>;

    /** The global tab */
    type Tab = {
      /** The tab id */
      id: string;
      /** The tab label */
      label: string;
      /**
       * The new tab label
       *
       * If set, the tab label will be replaced by this value
       */
      newLabel?: string;
      /**
       * The old tab label
       *
       * when reset the tab label, the tab label will be replaced by this value
       */
      oldLabel?: string;
      /** The tab route key */
      routeKey: LastLevelRouteKey;
      /** The tab route path */
      routePath: RouteMap[LastLevelRouteKey];
      /** The tab route full path */
      fullPath: string;
      /** The tab fixed index */
      fixedIndex?: number;
      /**
       * Tab icon
       *
       * Iconify icon
       */
      icon?: string;
      /**
       * Tab local icon
       *
       * Local icon
       */
      localIcon?: string;
      /** I18n key */
      i18nKey?: I18n.I18nKey;
    };

    /** Form rule */
    type FormRule = import('naive-ui').FormItemRule;

    /** The global dropdown key */
    type DropdownKey = 'closeCurrent' | 'closeOther' | 'closeLeft' | 'closeRight' | 'closeAll';
  }

  /**
   * I18n namespace
   *
   * Locales type
   */
  namespace I18n {
    type RouteKey = import('@elegant-router/types').RouteKey;

    type LangType = 'en-US' | 'zh-CN';

    type LangOption = {
      label: string;
      key: LangType;
    };

    type I18nRouteKey = Exclude<RouteKey, 'root' | 'not-found'>;

    type FormMsg = {
      required: string;
      invalid: string;
    };

    type Schema = {
      system: {
        title: string;
        desc: string;
      };
      common: {
        action: string;
        add: string;
        batchAdd: string;
        addSuccess: string;
        backToHome: string;
        batchDelete: string;
        cancel: string;
        close: string;
        check: string;
        columnSetting: string;
        config: string;
        confirm: string;
        save: string;
        delete: string;
        deleteSuccess: string;
        confirmDelete: string;
        edit: string;
        detail: string;
        index: string;
        keywordSearch: string;
        logout: string;
        logoutConfirm: string;
        lookForward: string;
        modify: string;
        modifySuccess: string;
        noData: string;
        operate: string;
        pleaseCheckValue: string;
        refresh: string;
        reset: string;
        search: string;
        switch: string;
        tip: string;
        trigger: string;
        update: string;
        updateSuccess: string;
        updateFailed: string;
        userCenter: string;
        success: string;
        fail: string;
        stop: string;
        execute: string;
        resume: string;
        pause: string;
        finish: string;
        running: string;
        executeSuccess: string;
        executeFailed: string;
        confirmExecute: string;
        confirmResume: string;
        confirmPause: string;
        confirmFinish: string;
        yesOrNo: {
          yes: string;
          no: string;
        };
        systemTaskType: {
          retry: string;
          callback: string;
          job: string;
          workflow: string;
        };
        routeKey: {
          routeLabel: string;
          routeForm: string;
          items: {
            consistentHash: string;
            random: string;
            lru: string;
            round: string;
          };
        };
        blockStrategy: {
          label: string;
          form: string;
          items: {
            discard: string;
            overwrite: string;
            parallel: string;
          };
        };
        executorType: {
          label: string;
          form: string;
          items: {
            java: string;
          };
        };
        taskType: {
          label: string;
          form: string;
          items: {
            cluster: string;
            broadcast: string;
            slice: string;
          };
        };
        triggerType: {
          label: string;
          form: string;
          items: {
            cron: string;
            fixed: string;
            workflow: string;
          };
        };
        taskBatchStatus: {
          label: string;
          form: string;
          items: {
            waiting: string;
            running: string;
            success: string;
            fail: string;
            stop: string;
            cancel: string;
          };
        };
        jobOperationReason: {
          label: string;
          form: string;
          items: {
            none: string;
            taskExecutionTimeout: string;
            notClient: string;
            closed: string;
            discard: string;
            overlay: string;
            notExecutionTask: string;
            taskExecutionError: string;
            mannerStop: string;
            workflowConditionNodeExecutionError: string;
            jobTaskInterrupted: string;
            workflowCallbackNodeExecutionError: string;
            workflowNodeNoRequired: string;
            workflowNodeClosedSkipExecution: string;
            workflowDecisionFailed: string;
          };
        };
      };
      request: {
        logout: string;
        logoutMsg: string;
        logoutWithModal: string;
        logoutWithModalMsg: string;
        refreshToken: string;
        tokenExpired: string;
      };
      theme: {
        themeSchema: { title: string } & Record<UnionKey.ThemeScheme, string>;
        layoutMode: { title: string } & Record<UnionKey.ThemeLayoutMode, string>;
        themeColor: {
          title: string;
          followPrimary: string;
        } & Theme.ThemeColor;
        scrollMode: { title: string } & Record<UnionKey.ThemeScrollMode, string>;
        page: {
          animate: string;
          mode: { title: string } & Record<UnionKey.ThemePageAnimateMode, string>;
        };
        fixedHeaderAndTab: string;
        header: {
          height: string;
          breadcrumb: {
            visible: string;
            showIcon: string;
          };
        };
        tab: {
          visible: string;
          cache: string;
          height: string;
          mode: { title: string } & Record<UnionKey.ThemeTabMode, string>;
        };
        sider: {
          inverted: string;
          width: string;
          collapsedWidth: string;
          mixWidth: string;
          mixCollapsedWidth: string;
          mixChildMenuWidth: string;
        };
        footer: {
          visible: string;
          fixed: string;
          height: string;
          right: string;
        };
        themeDrawerTitle: string;
        pageFunTitle: string;
        configOperation: {
          copyConfig: string;
          copySuccessMsg: string;
          resetConfig: string;
          resetSuccessMsg: string;
        };
      };
      route: Record<I18nRouteKey, string>;
      page: {
        common: {
          upadteTime: string;
          createTime: string;
        };
        login: {
          common: {
            loginOrRegister: string;
            userNamePlaceholder: string;
            phonePlaceholder: string;
            codePlaceholder: string;
            passwordPlaceholder: string;
            confirmPasswordPlaceholder: string;
            codeLogin: string;
            login: string;
            confirm: string;
            back: string;
            validateSuccess: string;
            loginSuccess: string;
            welcomeBack: string;
          };
          pwdLogin: {
            title: string;
            rememberMe: string;
            forgetPassword: string;
            register: string;
            otherAccountLogin: string;
            otherLoginMode: string;
            superAdmin: string;
            admin: string;
            user: string;
          };
          codeLogin: {
            title: string;
            getCode: string;
            reGetCode: string;
            sendCodeSuccess: string;
            imageCodePlaceholder: string;
          };
          register: {
            title: string;
            agreement: string;
            protocol: string;
            policy: string;
          };
          resetPwd: {
            title: string;
          };
          bindWeChat: {
            title: string;
          };
        };
        about: {
          title: string;
          introduction: string;
          projectInfo: {
            title: string;
            version: string;
            latestBuildTime: string;
            githubLink: string;
            previewLink: string;
          };
          prdDep: string;
          devDep: string;
        };
        home: {
          Greeting: string;
          morningGreeting: string;
          bthGreeting: string;
          noonGreeting: string;
          athGreeting: string;
          duskGreeting: string;
          eveningGreeting: string;
          earlyMorningGreeting: string;
          weatherDesc: string;
          retryTaskCount: string;
          jobTaskCount: string;
          userCount: string;
          retryTask: string;
          retryTaskTip: string;
          jobTask: string;
          jobBatch: string;
          jobTaskTip: string;
          onlineServiceCount: string;
          onlineServiceTip: string;
          workflow: string;
          workflowTip: string;
          projectCount: string;
          todo: string;
          message: string;
          downloadCount: string;
          registerCount: string;
          schedule: string;
          study: string;
          work: string;
          rest: string;
          entertainment: string;
          visitCount: string;
          turnover: string;
          dealCount: string;
          retryTab: {
            params: {
              day: string;
              week: string;
              month: string;
              year: string;
            };
            rank: {
              title: string;
            };
            task: {
              title: string;
              groupName: string;
              run: string;
              total: string;
            };
            pie: {
              title: string;
            };
          };
          projectNews: {
            title: string;
            moreNews: string;
            desc1: string;
            desc2: string;
            desc3: string;
            desc4: string;
            desc5: string;
          };
          creativity: string;
        };
        pods: {
          title: string;
          nodeType: string;
          groupName: string;
          hostId: string;
          hostIp: string;
          hostPort: string;
          consumerBuckets: string;
          updateDt: string;
          contextPath: string;
          form: {
            groupName: string;
          };
          type: {
            client: string;
            server: string;
          };
        };
        namespace: {
          title: string;
          name: string;
          keyword: string;
          uniqueId: string;
          form: {
            name: string;
            keyword: string;
            uniqueId: string;
          };
          addNamespace: string;
          editNamespace: string;
        };
        groupConfig: {
          title: string;
          namespaceId: string;
          groupName: string;
          description: string;
          token: string;
          groupStatus: string;
          version: string;
          groupPartition: string;
          idGeneratorMode: string;
          initScene: string;
          bucketIndex: string;
          updateDt: string;
          form: {
            groupName: string;
            token: string;
            groupStatus: string;
            description: string;
            groupPartition: string;
            idGeneratorMode: string;
            initScene: string;
            // bucketIndex: string;
          };
          idMode: {
            idWorker: string;
            segment: string;
          };
          addGroupConfig: string;
          editGroupConfig: string;
        };
        function: {
          tab: {
            tabOperate: {
              title: string;
              addTab: string;
              addTabDesc: string;
              closeTab: string;
              closeCurrentTab: string;
              closeAboutTab: string;
              addMultiTab: string;
              addMultiTabDesc1: string;
              addMultiTabDesc2: string;
            };
            tabTitle: {
              title: string;
              changeTitle: string;
              change: string;
              resetTitle: string;
              reset: string;
            };
          };
          multiTab: {
            routeParam: string;
            backTab: string;
          };
          toggleAuth: {
            toggleAccount: string;
            authHook: string;
            superAdminVisible: string;
            adminVisible: string;
            adminOrUserVisible: string;
          };
        };
        manage: {
          common: {
            status: {
              enable: string;
              disable: string;
            };
          };
          machine: {
            type: {
              client: string;
              server: string;
            };
          };
          retryTask: {
            status: {
              maxRetryTimes: string;
              pauseRetry: string;
            };
          };
          role: {
            title: string;
            roleName: string;
            roleCode: string;
            roleStatus: string;
            roleDesc: string;
            form: {
              roleName: string;
              roleCode: string;
              roleStatus: string;
              roleDesc: string;
            };
            addRole: string;
            editRole: string;
            menuAuth: string;
            buttonAuth: string;
          };
          user: {
            title: string;
            userName: string;
            userGender: string;
            nickName: string;
            userPhone: string;
            userEmail: string;
            userStatus: string;
            userRole: string;
            form: {
              userName: string;
              userGender: string;
              nickName: string;
              userPhone: string;
              userEmail: string;
              userStatus: string;
              userRole: string;
            };
            addUser: string;
            editUser: string;
            gender: {
              male: string;
              female: string;
            };
          };
          menu: {
            home: string;
            title: string;
            id: string;
            parentId: string;
            menuType: string;
            menuName: string;
            routeName: string;
            routePath: string;
            routeParams: string;
            layout: string;
            page: string;
            i18nKey: string;
            icon: string;
            localIcon: string;
            iconTypeTitle: string;
            order: string;
            keepAlive: string;
            href: string;
            hideInMenu: string;
            activeMenu: string;
            multiTab: string;
            fixedIndexInTab: string;
            button: string;
            buttonCode: string;
            buttonDesc: string;
            menuStatus: string;
            form: {
              home: string;
              menuType: string;
              menuName: string;
              routeName: string;
              routePath: string;
              layout: string;
              page: string;
              i18nKey: string;
              icon: string;
              localIcon: string;
              order: string;
              keepAlive: string;
              href: string;
              hideInMenu: string;
              activeMenu: string;
              multiTab: string;
              fixedInTab: string;
              fixedIndexInTab: string;
              button: string;
              buttonCode: string;
              buttonDesc: string;
              menuStatus: string;
            };
            addMenu: string;
            editMenu: string;
            addChildMenu: string;
            type: {
              directory: string;
              menu: string;
            };
            iconType: {
              iconify: string;
              local: string;
            };
          };
        };
        notifyConfig: {
          title: string;
          groupName: string;
          businessName: string;
          notifyStatus: string;
          notifyType: string;
          notifyScene: string;
          notifyThreshold: string;
          description: string;
          notifyAttribute: string;
          form: {
            businessId: string;
            description: string;
            notifyType: string;
            notifyAttribute: string;
            notifyScene: string;
            groupName: string;
            notifyThreshold: string;
            notifyStatus: string;
            systemTaskType: string;
            notifyRecipient: string;
            rateLimiterThreshold: string;
          };
          addNotifyConfig: string;
          editNotifyConfig: string;
          systemTaskType: string;
          retryNotifyScene: {
            maxRetry: string;
            maxRetryError: string;
            clientReportError: string;
            clientComponentError: string;
            retryTaskReachThreshold: string;
            retryTaskEnterDeadLetter: string;
          };
          jobNotifyScene: {
            jobTaskError: string;
          };
          notifyRecipient: string;
          rateLimiterStatus: string;
          rateLimiterThreshold: string;
        };
        notifyRecipient: {
          title: string;
          recipientName: string;
          notifyType: string;
          notifyAttribute: string;
          description: string;
          form: {
            description: string;
            notifyAttribute: string;
            recipientName: string;
            notifyType: string;
            dingDingAts: string;
            weComAts: string;
            larkAts: string;
            webhookUrl: string;
          };
          addNotifyRecipient: string;
          editNotifyRecipient: string;
          ats: string;
          webhookUrl: string;
          tos: string;
          dingDing: string;
          email: string;
          weCom: string;
          lark: string;
        };
        retryTask: {
          title: string;
          uniqueId: string;
          groupName: string;
          sceneName: string;
          idempotentId: string;
          bizNo: string;
          executorName: string;
          argsStr: string;
          nextTriggerAt: string;
          retryCount: string;
          retryStatus: string;
          taskType: string;
          form: {
            retryStatus: string;
            bizNo: string;
            uniqueId: string;
            groupName: string;
            argsStr: string;
            sceneName: string;
            executorName: string;
            taskType: string;
            idempotentId: string;
            logStr: string;
          };
          retryStatusType: {
            retrying: string;
            finished: string;
            maxRetry: string;
            paused: string;
          };
          taskTypeDict: {
            retry: string;
            callback: string;
          };
          generateIdempotentId: string;
          addRetryTask: string;
          editRetryTask: string;
          batchAddRetryTask: string;
        };
        retryScene: {
          title: string;
          groupName: string;
          sceneName: string;
          sceneStatus: string;
          backOff: string;
          maxRetryCount: string;
          triggerInterval: string;
          deadlineRequest: string;
          executorTimeout: string;
          createDt: string;
          updateDt: string;
          description: string;
          routeKey: string;
          form: {
            maxRetryCount: string;
            triggerInterval: string;
            groupName: string;
            description: string;
            executorTimeout: string;
            sceneName: string;
            sceneStatus: string;
            deadlineRequest: string;
            routeKey: string;
            backOff: string;
            sceneName2: string;
          };
          addScene: string;
          editScene: string;
          backOffItem: {
            delayLevel: string;
            fixed: string;
            cron: string;
            random: string;
          };
        };
        retryLog: {
          title: string;
          UniqueId: string;
          groupName: string;
          sceneName: string;
          retryStatus: string;
          taskType: string;
          idempotentId: string;
          bizNo: string;
          createDt: string;
          form: {
            groupName: string;
            idempotentId: string;
            sceneName: string;
            bizNo: string;
            UniqueId: string;
          };
          addRetryLog: string;
          editRetryLog: string;
        };
        workflow: {
          title: string;
          workflowName: string;
          groupName: string;
          nextTriggerAt: string;
          workflowStatus: string;
          triggerType: string;
          triggerInterval: string;
          executorTimeout: string;
          updateDt: string;
          form: {
            workflowName: string;
            groupName: string;
            workflowStatus: string;
          };
          addWorkflow: string;
          editWorkflow: string;
        };
        workflowBatch: {
          title: string;
          workflowName: string;
          groupName: string;
          executionAt: string;
          taskBatchStatus: string;
          operationReason: string;
          createDt: string;
          form: {
            workflowName: string;
            taskBatchStatus: string;
            groupName: string;
          };
          addWorkflowBatch: string;
          editWorkflowBatch: string;
        };
        jobTask: {
          title: string;
          groupName: string;
          jobName: string;
          argsStr: string;
          argsType: string;
          nextTriggerAt: string;
          jobStatus: string;
          routeKey: string;
          executorType: string;
          executorInfo: string;
          triggerType: string;
          triggerInterval: string;
          blockStrategy: string;
          executorTimeout: string;
          maxRetryTimes: string;
          retryInterval: string;
          taskType: string;
          parallelNum: string;
          bucketIndex: string;
          description: string;
          updateDt: string;
          form: {
            jobName: string;
            jobStatus: string;
            maxRetryTimes: string;
            description: string;
            triggerType: string;
            executorTimeout: string;
            triggerInterval: string;
            triggerInterval_CRON: string;
            taskType: string;
            parallelNum: string;
            bucketIndex: string;
            executorType: string;
            executorInfo: string;
            routeKey: string;
            blockStrategy: string;
            argsType: string;
            argsStr: string;
            groupName: string;
            retryInterval: string;
          };
          addJobTask: string;
          editJobTask: string;
          triggerTypeItem: {
            fixed: string;
            cron: string;
            workflow: string;
          };
        };
        jobBatch: {
          title: string;
          groupName: string;
          jobName: string;
          executionAt: string;
          taskBatchStatus: string;
          operationReason: string;
          form: {
            groupName: string;
            jobName: string;
            taskBatchStatus: string;
          };
        };
      };
      form: {
        required: string;
        userName: FormMsg;
        phone: FormMsg;
        pwd: FormMsg;
        confirmPwd: FormMsg;
        code: FormMsg;
        email: FormMsg;
      };
      dropdown: Record<Global.DropdownKey, string>;
      icon: {
        themeConfig: string;
        themeSchema: string;
        lang: string;
        fullscreen: string;
        fullscreenExit: string;
        magnify: string;
        restore: string;
        reload: string;
        collapse: string;
        expand: string;
        pin: string;
        unpin: string;
        namespace: string;
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

  /** Service namespace */
  namespace Service {
    /** Other baseURL key */
    type OtherBaseURLKey = 'demo';

    interface ServiceConfigItem {
      /** The backend service base url */
      baseURL: string;
      /** The proxy pattern of the backend service base url */
      proxyPattern: string;
    }

    interface OtherServiceConfigItem extends ServiceConfigItem {
      key: OtherBaseURLKey;
    }

    /** The backend service config */
    interface ServiceConfig extends ServiceConfigItem {
      /** Other backend service config */
      other: OtherServiceConfigItem[];
    }

    interface SimpleServiceConfig extends Pick<ServiceConfigItem, 'baseURL'> {
      other: Record<OtherBaseURLKey, string>;
    }

    /** The backend service response data */
    type Response<T = unknown> = {
      /** The backend service response code */
      status: string;
      /** The backend service response message */
      message: string;
      /** The backend service response data */
      data: T;
      page?: number;
      size?: number;
      total?: number;
    };

    /** The demo backend service response data */
    type DemoResponse<T = unknown> = {
      /** The backend service response code */
      status: string;
      /** The backend service response message */
      message: string;
      /** The backend service response data */
      result: T;
    };
  }
}
