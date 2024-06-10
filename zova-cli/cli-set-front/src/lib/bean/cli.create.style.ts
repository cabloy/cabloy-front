import { CmdOptions } from 'zova-cli';
import { CliCreateBeanBase } from '../common/cliCreateBean.js';

export class CliCreateStyle extends CliCreateBeanBase {
  constructor(options: CmdOptions) {
    super(options, 'style');
  }
}
