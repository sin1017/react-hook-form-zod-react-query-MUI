import { z } from 'zod';
import { patterns } from '../../constants';

export const userSchema = z.intersection(
  z.object({
    name: z.string().min(1, { message: '必填' }).max(20),
    email: z.string().min(1, { message: '必填' }).
      refine((text) => patterns.email.test(text), {
        message: "email 格式不符"
      }),
    states: z.array(z.string()).min(1).max(2, { message: "最多只能選兩個" }),
    languesSpoken: z.array(z.string()),
    gender: z.string().min(1),
    skills: z.array(z.string()).max(2, { message: "最多只能選兩個" }),
    registrationDateAndTime: z.date(),
    formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
    salaryRange: z.array(z.number()).min(2).max(2),
    isTeacher: z.boolean()
  }),
  z.discriminatedUnion('variant', [
    z.object({
      variant: z.literal('create')
    }),
    z.object({
      variant: z.literal('edit'),
      id: z.number().min(1),
    })
  ])
)
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4)
          })
        )
      })
    ])
  );


export type Schema = z.infer<typeof userSchema>;
/* 
假如我想把 registrationDateAndTime 變成是 optional
step 1 初步寫法: 
  type Schema = Omit<z.infer<typeof userSchema>, 'registrationDateAndTime'> & Partial<Pick<z.infer<typeof userSchema>, 'registrationDateAndTime'>> 
step 2 優化後較簡潔的的寫法，用覆蓋的直接變成可選的:
  type Schema = z.infer<typeof userSchema> & { registrationDataTime?: z.infer<typeof userSchema>['registrationDateAndTime'] }
step 3 用 zod 提供的 partial 來簡化  
  const userSchema = z.object({ ... }).partial({ registrationDateAndTime: true })
*/

export const defaultValues: Schema = {
  variant: 'create',
  name: '',
  email: '',
  states: [],
  languesSpoken: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: true,
  students: []
}