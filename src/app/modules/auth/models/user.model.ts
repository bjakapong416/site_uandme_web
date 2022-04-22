import { AuthModel , AuthModel2 } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
  pic: string;
  employee_id:string;
  role:string;
  roles: number[] = [];
  occupation: string;
  companyName: string;
  phone: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;
  
  // personal information
  firstname: string;
  lastname: string;
  website: string;
  // account information
  language: string;
  timeZone: string;
  communication: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  // email settings
  emailSettings?: {
    emailNotification: boolean;
    sendCopyToPersonalEmail: boolean;
    activityRelatesEmail: {
      youHaveNewNotifications: boolean;
      youAreSentADirectMessage: boolean;
      someoneAddsYouAsAsAConnection: boolean;
      uponNewOrder: boolean;
      newMembershipApproval: boolean;
      memberRegistration: boolean;
    };
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean;
      tipsOnGettingMoreOutOfKeen: boolean;
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean;
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean;
      tipsOnMetronicBusinessProducts: boolean;
    };
  };

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.fullname = user.fullname || '';
    this.email = user.email || '';
    this.pic = user.pic || './assets/media/users/default.jpg';
    this.roles = user.roles || [];
    this.occupation = user.occupation || '';
    this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    this.address = user.address;
    this.socialNetworks = user.socialNetworks;
  }


}

export class User extends AuthModel2{
  id: number;
  email: string;
  username:string;
  password: string;
  fullname: string;
  employee_id:string;
  pic:string;
  phone:string;
  role:string;
  token: string;
  create_on: string;
  status?: string;
  lastlogin?: string;

  setUser2(_user: unknown) {
    const user = _user as User;
    this.id = user.id ;
    this.password = user.password || '';
    this.fullname = user.fullname || '';
    this.employee_id = user.employee_id ?? '',
    this.email = user.email || '';
    this.pic = user.pic ?? '';
    this.role = user.role ?? '';
    this.create_on = user.create_on || ''
    this.status = user.status || '';
    this.lastlogin = user.lastlogin ?? '';

  }

}

export enum Role {
  User = '0',
  Admin = '777'
}