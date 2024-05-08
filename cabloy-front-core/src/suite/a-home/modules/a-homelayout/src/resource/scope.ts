import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHomelayout extends BeanScopeBase {}

export interface ScopeModuleAHomelayout
  extends TypeModuleResource<typeof config, typeof Errors, (typeof locales)[TypeLocaleBase], typeof constants> {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-homelayout': ScopeModuleAHomelayout;
  }

  export interface IBeanScopeConfig {
    'a-homelayout': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homelayout': (typeof locales)[TypeLocaleBase];
  }
}
