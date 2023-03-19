import { User } from "../models/user.model";

export type AuthResponseDto = {
  accessToken: string;
  user: User;
}
