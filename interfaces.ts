export interface Auth {
  isAuthorized: boolean | undefined;
  checkAuthorization: Function;
  merchant: string | undefined | null;
}

export interface User {
  fullName: string;
  email: string;
  userRole?: string;
  userName: string;
  password?: string;
  enabled: boolean;
}
