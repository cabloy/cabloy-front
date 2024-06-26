import { BeanControllerBase, Local, Use } from 'zova';
import { ModelMenu } from '../../bean/model.menu.js';
import { ModelUser } from 'zova-module-home-user';
import { ScopeModule } from '../../resource/this.js';

export interface Props {}

export type Emits = {};

export interface Slots {}

@Local()
export class ControllerLayoutDefault extends BeanControllerBase<ScopeModule, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$modelMenu: ModelMenu;

  @Use()
  $$modelUser: ModelUser;

  leftDrawerOpen: boolean = false;

  protected async __init__() {}

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
