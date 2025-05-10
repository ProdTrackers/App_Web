export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}

export class LoginUser {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
