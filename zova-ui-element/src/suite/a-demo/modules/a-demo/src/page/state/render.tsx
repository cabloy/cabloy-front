import { BeanRenderBase, Local } from '@cabloy/front';
import type { ControllerPageState } from './controller.js';
import { ElButton } from 'element-plus';

export interface RenderPageState extends ControllerPageState {}

@Local()
export class RenderPageState extends BeanRenderBase {
  render() {
    return (
      <div>
        <div>count(ref): {this.count}</div>
        <div>count(computed): {this.count2}</div>
        <ElButton onClick={() => this.inrement()}>Inrement</ElButton>
        <ElButton onClick={() => this.decrement()}>Decrement</ElButton>
      </div>
    );
  }
}