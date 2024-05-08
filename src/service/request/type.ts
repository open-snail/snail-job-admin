export interface RequestInstanceState {
  /** whether the request is refreshing token */
  isRefreshingToken: boolean;
  /** the request error message stack */
  errMsgStack: string[];
  /** whether the request is logout */
  isLogout: boolean;
}
