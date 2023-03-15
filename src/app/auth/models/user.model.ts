export interface User {
  id: number;
  email: string;
}

export namespace User {
  export enum Password {
    MinLength = 6,
  }
}
