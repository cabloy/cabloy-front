---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Zova'
  text: '一款支持IOC容器的Vue3框架'
  tagline: 可以搭配任何UI库使用
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/start/introduction
    - theme: alt
      text: 为什么需要Vue3+IOC?
      link: /zh/guide/start/why
    - theme: alt
      text: Github
      link: https://github.com/cabloy/zova

features:
  - title: 不用ref/reactive, 不用ref.value
    details: 有了IOC容器的加持，定义响应式状态不再需要 ref/reactive。因为不用 ref，自然也就不用再写大量的 ref.value
  - title: 化类型于无形
    details: Zova 采用依赖注入与依赖查找相结合的策略，大量减少装饰器函数的使用。优先使用依赖查找可以达到“化类型于无形”的开发体验，也就是不需要标注类型就可以享受到类型编程的诸多好处，从而让我们的代码始终保持简洁和优雅，进而显著提升开发效率，保证代码质量
  - title: 模块化体系
    details: 在一个大型的 Web 业务系统当中，随着业务的增长和变更，为了避免代码失控，有必要将系统拆分为一个个相对独立的模块，这就是 Zova 采用模块化体系的缘由。在 Zova 中，一个模块就是一个天然的拆包边界，在 build 构建时，自动打包成一个独立的异步 Chunk，告别 Vite 配置的烦恼，同时可以有效避免构建产物的碎片化。特别是在大型业务系统中，这种优势尤其明显
---
