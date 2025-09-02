export class User {
  email: string = "";
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  userType?: UserType;
}

export enum UserType {
  Client = 0,
  Supplier = 1
}
