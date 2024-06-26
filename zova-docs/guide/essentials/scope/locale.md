# I18n

Modules can individually provide their own `I18n` language resources

## Define language resources

Taking the module `a-demo` as an example, define the `I18n` language resources of the module:

English: `src/suite/a-demo/modules/a-demo/src/config/locale/en-us.ts`

```typescript{2}
export default {
  HelloWorld: 'Hello World',
};
```

Chinese: `src/suite/a-demo/modules/a-demo/src/config/locale/zh-cn.ts`

```typescript{2}
export default {
  HelloWorld: '您好世界',
};
```

## Use language resources

The `I18n` language resources of the module can be obtained through the `locale` object of the `Scope` instance

```typescript{3-9}
export class TestA {
  protected async __init__() {
    // use current locale
    const message1 = this.scope.locale.HelloWorld();
    // use locale en-us
    const message2 = this.scope.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.scope.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

- Gif Demonstration
  ![scope-locale](https://cabloy-1258265067.cos.ap-shanghai.myqcloud.com/image/scope-locale.gif)

## Use language resources cross-module

```typescript{1,4-5,8-14}
import type { ScopeModuleADemo } from 'zova-module-a-demo';

export class TestA {
  @UseScope('a-demo')
  scopeModuleADemo: ScopeModuleADemo;

  protected async __init__() {
    // use current locale
    const message1 = this.scopeModuleADemo.locale.HelloWorld();
    // use locale en-us
    const message2 = this.scopeModuleADemo.locale.HelloWorld.locale('en-us');
    // use locale zh-cn
    const message3 = this.scopeModuleADemo.locale.HelloWorld.locale('zh-cn');
    console.log(message1, message2, message3);
  }
}
```

## Override language resources

You can use `project-level` language resources to override `module-level` language resources

English: `src/front/config/locale/en-us.ts`

```typescript{3-5}
export default {
  modules: {
    'a-demo': {
      HelloWorld: 'Hello World!!!',
    },
  },
};
```

Chinese: `src/front/config/locale/zh-cn.ts`

```typescript{3-5}
export default {
  modules: {
    'a-demo': {
      HelloWorld: '您好世界!!!',
    },
  },
};
```
