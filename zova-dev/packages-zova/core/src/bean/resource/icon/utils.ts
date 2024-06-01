import { createVNode } from 'vue';
import { IIconRecord } from './types.js';
import { ZovaIcon } from './zovaIcon.js';

export function renderIcon(name?: string, color?: string, size?: string | number);
export function renderIcon<K extends keyof IIconRecord>(name: K, color?: string, size?: string | number);
export function renderIcon(name?, color?, size?) {
  size = size ?? 24;
  return createVNode(ZovaIcon, {
    name,
    color,
    width: size,
    height: size,
  });
}

export function getIcon<K extends keyof IIconRecord>(name: K): K {
  return name;
}
