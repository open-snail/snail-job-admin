/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { RouteComponent } from "vue-router";
import type { LastLevelRouteKey, RouteLayout } from "@elegant-router/types";

import BaseLayout from "@/layouts/base-layout/index.vue";
import BlankLayout from "@/layouts/blank-layout/index.vue";

export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views: Record<LastLevelRouteKey, RouteComponent | (() => Promise<RouteComponent>)> = {
  403: () => import("@/views/_builtin/403/index.vue"),
  404: () => import("@/views/_builtin/404/index.vue"),
  500: () => import("@/views/_builtin/500/index.vue"),
  "iframe-page": () => import("@/views/_builtin/iframe-page/[url].vue"),
  log: () => import("@/views/_builtin/log/index.vue"),
  login: () => import("@/views/_builtin/login/index.vue"),
  about: () => import("@/views/about/index.vue"),
  group: () => import("@/views/group/index.vue"),
  home: () => import("@/views/home/index.vue"),
  job_batch: () => import("@/views/job/batch/index.vue"),
  job_task: () => import("@/views/job/task/index.vue"),
  namespace: () => import("@/views/namespace/index.vue"),
  notify_config: () => import("@/views/notify/config/index.vue"),
  notify_recipient: () => import("@/views/notify/recipient/index.vue"),
  pods: () => import("@/views/pods/index.vue"),
  "retry_dead-letter": () => import("@/views/retry/dead-letter/index.vue"),
  retry_log: () => import("@/views/retry/log/index.vue"),
  retry_scene: () => import("@/views/retry/scene/index.vue"),
  retry_task: () => import("@/views/retry/task/index.vue"),
  user_manager: () => import("@/views/user/manager/index.vue"),
  workflow_batch: () => import("@/views/workflow/batch/index.vue"),
  workflow_form_add: () => import("@/views/workflow/form/add/index.vue"),
  workflow_form_batch: () => import("@/views/workflow/form/batch/index.vue"),
  workflow_form_copy: () => import("@/views/workflow/form/copy/index.vue"),
  workflow_form_detail: () => import("@/views/workflow/form/detail/index.vue"),
  workflow_form_edit: () => import("@/views/workflow/form/edit/index.vue"),
  workflow_task: () => import("@/views/workflow/task/index.vue"),
};
