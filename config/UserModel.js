import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
});

class UserModel {
  constructor(data) {
    const validatedData = UserSchema.parse(data);
    this.username = validatedData.username;
    this.password = validatedData.password;
    this.email = validatedData.email;
  }
}

export default UserModel;
