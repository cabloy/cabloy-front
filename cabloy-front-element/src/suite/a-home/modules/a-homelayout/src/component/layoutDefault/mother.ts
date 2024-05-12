import { BeanMotherBase, Local, Use } from '@cabloy/front';
import { RenderLayoutDefault } from './render.jsx';

export interface Props {}

export type Emits = {};

export interface Slots {}

export type TypeMenuItem = {
  title: string;
  caption?: string;
  icon?: string;
  href?: string;
  to?: string;
  folder?: boolean;
  separator?: boolean;
  children?: TypeMenuItem[];
};

@Local()
export class MotherLayoutDefault extends BeanMotherBase<unknown, Props, Emits, Slots> {
  static $propsDefault = {};

  @Use()
  $$render: RenderLayoutDefault;

  leftDrawerOpen: boolean = false;
  menu: TypeMenuItem[];

  protected async __init__() {
    await this.loadMenu();
  }

  async loadMenu() {
    const res = await this.$api.get('a/homemock/getMenu');
    this.menu = res.data.data;
  }

  toggleLeftDrawer() {
    this.leftDrawerOpen = !this.leftDrawerOpen;
  }
}
