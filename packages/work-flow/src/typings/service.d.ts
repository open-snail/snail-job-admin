/** Service namespace */
declare namespace Service {
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
