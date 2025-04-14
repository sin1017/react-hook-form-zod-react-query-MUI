import { z } from 'zod';
import { patterns } from '../../constants';

export const userSchema = z.object({
  name: z.string().min(1, { message: '必填' }).max(20),
  email: z.string().min(1, { message: '必填' }).
    refine((text) => patterns.email.test(text), {
      message: "email 格式不符"
    }),
  states: z.array(z.string()).min(1).max(3),
  languesSpoken: z.array(z.string())
});

export type Schema = z.infer<typeof userSchema>

export const defaultValues: Schema = {
  name: '',
  email: '',
  states: [],
  languesSpoken: []
}