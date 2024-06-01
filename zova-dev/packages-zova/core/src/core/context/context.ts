import { ComponentInternalInstance, markRaw } from 'vue';
import { CabloyApplication } from '../app/application.js';
import { BeanContainer, BeanContainerLike } from '../../bean/beanContainer.js';
import { CtxMeta } from './meta.js';
import { Cast } from '../../types/utils/cast.js';

export class CabloyContext {
  instance: ComponentInternalInstance;
  app: CabloyApplication;
  bean: BeanContainerLike;
  meta: CtxMeta;
  //config: ContextConfig;

  constructor(instance: ComponentInternalInstance) {
    markRaw(this);
    instance.cabloy = this;
    this.instance = instance;
    this.app = instance.appContext.app.cabloy;
    this.bean = BeanContainer.create(this.app, this);
    this.meta = this.bean._newBeanSimple(CtxMeta, false);
  }

  /** @internal */
  public dispose() {
    Cast(this.instance).cabloy = null;
    Cast(this).instance = null;
    Cast(this).app = null;
    Cast(this).bean = null;
    Cast(this).meta = null;
  }
}

declare module 'vue' {
  export interface ComponentInternalInstance {
    cabloy: CabloyContext;
  }
}