import { Model } from 'zova';
import { BeanModelBase } from 'zova-module-a-model';
import { ScopeModule } from '../resource/this.js';

export interface User {
  username?: string;
  avatar?: string;
}

export interface JWT {
  accessToken: string;
  refreshToken: string;
  expireTime: number;
}

export interface UserInfoData {
  user?: User;
  jwt?: JWT;
}

@Model()
export class ModelUserInfo extends BeanModelBase<ScopeModule> {
  user?: User;
  jwt?: JWT;
  token?: string;

  protected async __init__() {
    this.user = this.$useQueryLocal({
      queryKey: ['user'],
    });
    this.jwt = this.$useQueryLocal({
      queryKey: ['jwt'],
    });
    this.token = this.$useQueryCookie({
      queryKey: ['token'],
    });
  }

  setUserInfo(data: UserInfoData) {
    this.user = data.user;
    this.jwt = data.jwt;
    this.token = this.getJwtAuthorization();
  }

  logout() {
    this.setUserInfo({});
    this.$router.replace('/home/user/login');
  }

  getJwtAuthorization() {
    if (!this.jwt) return '';
    return this.jwt.expireTime - Date.now() > 120 * 1000 ? this.jwt.accessToken : this.jwt.refreshToken;
  }
}