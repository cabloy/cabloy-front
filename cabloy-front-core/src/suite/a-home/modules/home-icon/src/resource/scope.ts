import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from '@cabloy/front';
import { config, Errors, locales, constants } from '../config/index.js';
import { components } from './components.js';

@Scope()
export class ScopeModuleAHomeicon extends BeanScopeBase {}

export interface ScopeModuleAHomeicon
  extends TypeModuleResource<
    typeof components,
    typeof config,
    typeof Errors,
    (typeof locales)[TypeLocaleBase],
    typeof constants
  > {}

declare module '@cabloy/front' {
  export interface IBeanScopeRecord {
    'home-icon': ScopeModuleAHomeicon;
  }

  export interface IBeanScopeConfig {
    'home-icon': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-icon': (typeof locales)[TypeLocaleBase];
  }
}
