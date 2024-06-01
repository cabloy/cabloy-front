# API

Cabloy-Front 提供了一个模块`home-api`，该模块基于[axios](https://axios-http.com)提供了基本的`API`代码骨架。可以在此基础上添加自定义的 API 逻辑，甚至也可以直接替换掉`axios`底层库

## $api

Cabloy-Front 在`BeanBase`基类中注入了`$api`对象，从而可以在任何 bean 实例中通过`this.$api`访问`axios`的实例

比如，获取菜单数据：

`src/suite/a-home/modules/home-layout/src/component/layoutDefault/controller.ts`

```typescript{9-10}
export class ControllerLayoutDefault {
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('/home/mock/getMenu');
    this.menu = res.data.data;
  }
}
```

## home-api.store.api

模块`home-api`提供了一个`home-api.store.api` store bean，可以直接在里面添加自定义逻辑

`src/suite/a-home/modules/home-api/src/bean/store.api.ts`

```typescript{7}
export class StoreApi {
  private [SymbolApi]: AxiosInstance;

  protected async __init__() {
    const baseURL = `${this.app.config.api.baseURL || ''}${this.app.config.api.prefix || ''}/`;
    this[SymbolApi] = markRaw(axios.create({ baseURL }));
    // your custom logic maybe here
  }

  protected __get__(prop) {
    return this[SymbolApi] && this[SymbolApi][prop];
  }
}
```