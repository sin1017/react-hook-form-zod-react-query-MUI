import { z } from 'zod';
import { patterns } from '../../constants';

export const UserSchema = z.object({
  name: z.string().min(1, { message: '必填' }).max(20),
  email: z.string().min(1, { message: '必填' }).
    refine((text) => patterns.email.test(text), {
      message: "email 格式不符"
    }),

});
