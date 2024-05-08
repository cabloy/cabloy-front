import {
  BeanScopeBase,
  Scope,
  TypeLocaleBase,
  TypeModuleResource,
} from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';

@Scope()
export class ScopeModuleAHomemock extends BeanScopeBase {}

export interface ScopeModuleAHomemock
  extends TypeModuleResource<
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front-core' {
  export interface IBeanScopeRecord {
    'a-homemock': ScopeModuleAHomemock;
  }

  export interface IBeanScopeConfig {
    'a-homemock': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'a-homemock': (typeof locales)[TypeLocaleBase];
  }
}
