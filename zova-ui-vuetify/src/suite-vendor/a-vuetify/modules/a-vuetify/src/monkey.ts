import { BeanBase, BeanContainer, BeanSimple, IMonkeySystem } from 'zova';
import { PatchIcon } from './patch/icon.jsx';
import { inject, reactive } from 'vue';
import { DateAdapterSymbol } from 'vuetify/lib/composables/date/date.mjs';
import { DefaultsSymbol } from 'vuetify/lib/composables/defaults.mjs';
import { DisplaySymbol } from 'vuetify/lib/composables/display.mjs';
import { IconSymbol } from 'vuetify/lib/composables/icons.mjs';
import { LocaleSymbol } from 'vuetify/lib/composables/locale.mjs';
import { ThemeSymbol } from 'vuetify/lib/composables/theme.mjs';

export class Monkey extends BeanSimple implements IMonkeySystem {
  async appInitialize(_bean: BeanContainer) {
    // icon
    const patchIcon = await this.bean._newBean(PatchIcon, false);
    await patchIcon.initialize();
  }
  async appInitialized(_bean: BeanContainer) {}
  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    bean.defineProperty(beanInstance, '$vuetify', {
      enumerable: false,
      configurable: true,
      get() {
        return reactive({
          defaults: inject(DefaultsSymbol),
          display: inject(DisplaySymbol),
          theme: inject(ThemeSymbol),
          icons: inject(IconSymbol),
          locale: inject(LocaleSymbol),
          date: inject(DateAdapterSymbol),
        });
      },
    });
  }
  async beanInited(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDispose(_bean: BeanContainer, _beanInstance: BeanBase) {}
  beanDisposed(_bean: BeanContainer, _beanInstance: BeanBase) {}
}
