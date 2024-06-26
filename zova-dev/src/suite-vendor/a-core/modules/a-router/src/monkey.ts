import {
  BeanBase,
  BeanContainer,
  BeanControllerPageBase,
  BeanSimple,
  IModule,
  IMonkeyModule,
  IMonkeyController,
  IMonkeySystem,
  IControllerData,
  TypePageSchema,
  useComputed,
} from 'zova';
import * as ModuleInfo from '@cabloy/module-info';
import { useRoute } from 'vue-router';
import { BeanRouter } from './bean/bean.router.js';
import { ScopeModule, __ThisModule__ } from './resource/this.js';
import { markRaw } from 'vue';

export class Monkey extends BeanSimple implements IMonkeySystem, IMonkeyModule, IMonkeyController {
  private _moduleSelf: IModule;
  private _beanRouter: BeanRouter;
  private _beanComponentDefault: any;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getBeanRouter() {
    if (!this._beanRouter) {
      this._beanRouter = (await this.bean._getBean('a-router.bean.router', false)) as BeanRouter;
    }
    return this._beanRouter;
  }

  async appInitialize(_bean: BeanContainer) {}
  async appInitialized(bean: BeanContainer) {
    // component default
    const scope: ScopeModule = await bean.getScope(__ThisModule__);
    this._beanComponentDefault = await bean.getScope(scope.config.defaultComponent);
    // emit event
    const router = bean.inject('a-router:router');
    await this.app.meta.event.emit('a-router:routerGuards', router);
  }
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    bean.defineProperty(beanInstance, '$router', {
      enumerable: false,
      configurable: true,
      get() {
        return bean.inject('a-router:router');
      },
    });
    bean.defineProperty(beanInstance, '$component', {
      enumerable: false,
      configurable: true,
      get() {
        return markRaw(self._beanComponentDefault.component);
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const beanRouter = await this.getBeanRouter();
    beanRouter._registerRoutes(module);
  }
  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
  controllerDataPrepare(controllerData: IControllerData) {
    controllerData.context.route = useRoute();
  }
  controllerDataInit(controllerData: IControllerData, controller: BeanBase) {
    // only for controller page
    if (!(controller instanceof BeanControllerPageBase)) return;
    const route = controllerData.context.route;
    if (!route) return;
    const schemaKey = String(route.name || route.path);
    let schemas: TypePageSchema | undefined;
    const moduleInfo = ModuleInfo.parseInfo(ModuleInfo.parseName(schemaKey));
    if (!moduleInfo) {
      // do nothing
      return;
    }
    const module = this.app.meta.module.get(moduleInfo.relativeName)!;
    if (route.name) {
      schemas = module.resource.pageNameSchemas?.[schemaKey];
    } else {
      schemas = module.resource.pagePathSchemas?.[schemaKey];
    }
    controller.$params = useComputed(() => {
      if (!schemas?.params) throw new Error(`page params schema not found: ${schemaKey}`);
      return schemas.params.parse(route.params);
    });
    controller.$query = useComputed(() => {
      if (!schemas?.query) throw new Error(`page query schema not found: ${schemaKey}`);
      return schemas.query.parse(route.query);
    });
  }
}
