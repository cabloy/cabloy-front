// FLAVOR=web npm run build
import { ZovaConfigMeta, ZovaConfigOptional } from 'zova';

export default function (_meta: ZovaConfigMeta) {
  const config: ZovaConfigOptional = {
    base: {
      jwt: false,
    },
  };

  // module config
  config.modules = {};

  return config;
}
