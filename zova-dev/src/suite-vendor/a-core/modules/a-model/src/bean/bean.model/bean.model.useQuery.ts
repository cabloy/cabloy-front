import {
  DefaultError,
  QueryKey,
  useQuery,
  QueryClient,
  UseQueryReturnType,
  UseQueryDefinedReturnType,
  UseQueryOptions,
  Query,
  hashKey,
} from '@tanstack/vue-query';
import { UnwrapNestedRefs } from 'vue';
import { useComputed } from 'zova';
import { DefinedInitialQueryOptions, UndefinedInitialQueryOptions } from '../../common/types.js';
import { BeanModelQuery } from './bean.model.query.js';

const SymbolUseQueries = Symbol('SymbolUseQueries');

export class BeanModelUseQuery<TScopeModule = unknown> extends BeanModelQuery<TScopeModule> {
  private [SymbolUseQueries]: Record<string, unknown> = {};

  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryDefinedReturnType<TData, TError>>;
  $useQuery<TQueryFnData = unknown, TError = DefaultError, TData = TQueryFnData, TQueryKey extends QueryKey = QueryKey>(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQuery(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const persister = this._createPersister(options.meta?.persister);
    options = { ...options, queryKey, persister };
    return this.ctx.meta.util.instanceScope(() => {
      return useQuery(options, queryClient);
    });
  }

  $useQueryLocal<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocal<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocal<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryLocal(options, queryClient) {
    options = this.app.meta.util.extend({}, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: { storage: 'local', sync: true },
      },
    });
    const self = this;
    return useComputed({
      get() {
        return self._handleSyncDataGet(options, queryClient, true);
      },
      set(value) {
        self._handleSyncDataSet(options, queryClient, true, value);
      },
    });
  }

  $useQueryCookie<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookie<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookie<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryCookie(options, queryClient) {
    options = this.app.meta.util.extend(
      {
        meta: {
          persister: {
            serialize: (obj?: Query) => {
              return this.$serializeCookie(obj);
            },
            deserialize: (value?: string) => {
              return this.$deserializeCookie(value);
            },
          },
        },
      },
      options,
      {
        enabled: false,
        staleTime: Infinity,
        meta: {
          persister: { storage: 'cookie', sync: true },
        },
      },
    );
    const self = this;
    return useComputed({
      get() {
        return self._handleSyncDataGet(options, queryClient, true);
      },
      set(value) {
        self._handleSyncDataSet(options, queryClient, true, value);
      },
    });
  }

  $useQueryMem<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMem<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMem<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, queryClient?: QueryClient): TData;
  $useQueryMem(options, queryClient) {
    options = this.app.meta.util.extend({}, options, {
      enabled: false,
      staleTime: Infinity,
      meta: {
        persister: false,
      },
    });
    const self = this;
    return useComputed({
      get() {
        return self._handleSyncDataGet(options, queryClient, false);
      },
      set(value) {
        self._handleSyncDataSet(options, queryClient, false, value);
      },
    });
  }

  $useQueryExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UndefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQueryExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: DefinedInitialQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryDefinedReturnType<TData, TError>>;
  $useQueryExisting<
    TQueryFnData = unknown,
    TError = DefaultError,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
  >(
    options: UseQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
    queryClient?: QueryClient,
  ): UnwrapNestedRefs<UseQueryReturnType<TData, TError>>;
  $useQueryExisting(options, queryClient) {
    const queryKey = this.self._forceQueryKeyPrefix(options.queryKey);
    const queryHash = hashKey(queryKey);
    if (!this[SymbolUseQueries][queryHash]) {
      this[SymbolUseQueries][queryHash] = this.$useQuery(options, queryClient);
    }
    return this[SymbolUseQueries][queryHash];
  }

  private _handleSyncDataGet(options, queryClient, persister) {
    const queryKey = options.queryKey;
    const query = this.$useQueryExisting(options, queryClient);
    if (query.data === undefined) {
      if (persister) {
        const data = this.$persisterLoad(queryKey);
        if (data !== undefined) {
          this.$setQueryData(queryKey, data, false);
        }
      }
    }
    return query.data;
  }

  private _handleSyncDataSet(options, queryClient, persister, value) {
    const queryKey = options.queryKey;
    const query = this.$useQueryExisting(options, queryClient);
    this.$setQueryData(queryKey, value, persister);
    return query;
  }
}
