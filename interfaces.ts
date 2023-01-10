export interface Auth {
  isAuthorized: boolean | undefined;
  checkAuthorization: Function;
  merchant: string | undefined | null;
}

export interface User {
  email: string;
  fullName: string;
  userStatus: boolean;
  phoneNumber: string;
  joinedGroupName: string[];
  userRole: string[];
}

export interface UserFormFields {
  email: string;
  password: string;
  fullName: string;
  userStatus: boolean;
  phoneNumber: string;
  userRole: string;
}
