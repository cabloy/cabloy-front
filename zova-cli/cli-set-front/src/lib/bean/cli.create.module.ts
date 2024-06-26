import { BeanCliBase } from 'zova-cli';
import { IModuleInfo, ISuite } from '@cabloy/module-info';
import fs from 'fs';
import path from 'path';
import { __ThisSetName__ } from '../this.js';

declare module 'zova-cli' {
  interface ICommandArgv {
    suite: string;
    suiteInfo: IModuleInfo;
    _suite: ISuite;
    moduleInfo: IModuleInfo;
    relativeNameCapitalize: string;
    force: boolean;
    template: string;
  }
}

export class CliCreateModule extends BeanCliBase {
  async execute() {
    const { argv } = this.context;
    // super
    await super.execute();
    // suite name/info
    const suiteName = argv.suite;
    if (suiteName) {
      argv.suiteInfo = this.helper.parseSuiteInfo(suiteName);
      // check if exists
      argv._suite = this.helper.findSuite(suiteName);
      if (!argv._suite) {
        throw new Error(`suite does not exist: ${suiteName}`);
      }
    }
    // module name/info
    const moduleName = argv.name;
    argv.moduleInfo = this.helper.parseModuleInfo(moduleName);
    argv.relativeNameCapitalize = this.helper.stringToCapitalize(argv.moduleInfo.relativeName, '-');
    // check if exists
    const _module = this.helper.findModule(moduleName);
    if (!argv.force && _module) {
      throw new Error(`module exists: ${moduleName}`);
    }
    // target dir
    let targetDir;
    if (suiteName) {
      targetDir = path.join(argv._suite.root, 'modules', moduleName);
    } else {
      targetDir = path.join(argv.projectPath, 'src/module', moduleName);
    }
    if (!argv.force && fs.existsSync(targetDir)) {
      throw new Error(`module exists: ${moduleName}`);
    }
    // template
    const template = argv.template;
    // render module snippets for suite
    if (suiteName) {
      await this.template.renderBoilerplateAndSnippets({
        targetDir: argv._suite.root,
        setName: __ThisSetName__,
        snippetsPath: `create/module-${template}/snippets`,
        boilerplatePath: null,
      });
    }
    // render module boilerplate
    targetDir = await this.helper.ensureDir(targetDir);
    await this.template.renderBoilerplateAndSnippets({
      targetDir,
      setName: __ThisSetName__,
      snippetsPath: null,
      boilerplatePath: `create/module-${template}/boilerplate`,
    });
  }
}
