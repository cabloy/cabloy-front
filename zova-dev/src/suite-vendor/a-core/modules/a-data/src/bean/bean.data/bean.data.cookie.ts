import { Query } from '@tanstack/vue-query';
import { BeanDataPersister } from './bean.data.persister.js';

export class BeanDataCookie<TScopeModule = unknown> extends BeanDataPersister<TScopeModule> {
  $serializeCookie(obj?: Query) {
    return String(obj?.state?.data ?? '');
  }

  $deserializeCookie(value?: string) {
    return {
      state: {
        data: value,
        dataUpdateCount: 0,
        dataUpdatedAt: Date.now(),
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: 'success',
        fetchStatus: 'idle',
      },
      queryKey: undefined,
      queryHash: undefined,
      buster: this._getPersisterBuster(),
    };
  }
}