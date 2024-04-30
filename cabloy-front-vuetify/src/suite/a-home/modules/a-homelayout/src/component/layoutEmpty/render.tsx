import { BeanRenderBase, Local } from '@cabloy/front-core';
import type { MotherLayoutEmpty } from './mother.js';
import { VApp, VMain } from 'vuetify/components';

export interface RenderLayoutEmpty extends MotherLayoutEmpty { }

@Local()
export class RenderLayoutEmpty extends BeanRenderBase {
  render() {
    return (
      <VApp>
        <VMain>
          <router-view />
        </VMain>
      </VApp>
    );
  }
}