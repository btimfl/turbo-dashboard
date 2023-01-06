export interface Auth {
  isAuthorized: Boolean;
}

export interface User {
  fullName: string;
  email: string;
  userRole: string;
  userName: string;
  password: string;
  enabled: boolean;
}
