export class AuthModel {
  authToken: string;
  refreshToken: string;
  expiresIn: Date;

  setAuth(auth: AuthModel) {
    this.authToken = auth.authToken;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}


export class AuthModel2 {
  token:string
  setAuth2(auth:AuthModel2){
    this.token = auth.token;
  }
}


