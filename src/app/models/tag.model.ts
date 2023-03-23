export interface Tag {
  id?: number;
  name: string;
  colorHexCode?: string;
  userId?: number;
}

export namespace Tag {
  export enum Name {
    MaxLength = 32,
  }

  export enum ColorHexCode {
    MaxLength = 8,
  }
}
