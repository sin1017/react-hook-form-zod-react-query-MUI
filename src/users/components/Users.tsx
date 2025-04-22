import { Button, Container, Stack, Typography } from '@mui/material';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Schema } from '../types/schema';
import RHFAutocomplete from '../../component/RHFAutocomplate';
import { Fragment, useEffect } from 'react';
import { useLanguages, useStates, useGenders, useSkills } from '../services/queries';
import RHFToggleButtonGroup from '../../component/RHFToggleButtonGroup';
import RHARadioGroup from '../../component/RHARadioGroup';
import RHACheckBox from '../../component/RHACheckBox';
import RHADateAndTimePicker from '../../component/RHADateAndTimePicker';
import RHADateRangePicker from '../../component/RHADateRangePicker';
import RHASlider from '../../component/RHASlider';
import RHASwitch from '../../component/RHASwitch';
import RHFTextField from '../../component/RHFTextField';

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const {
    watch,
    control,
    unregister
  } = useFormContext<Schema>();

  const isTeacher = useWatch({ control, name: 'isTeacher' })
  const { append, remove, fields, replace } = useFieldArray({ control, name: 'students' })

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value)
    });
    return () => sub.unsubscribe();
  }, [watch])
  useEffect(() => {
    if (!isTeacher) {
      replace([])
      // students: undefined
      unregister("students")
    }
  }, [isTeacher, replace, unregister])

  return (
    <Container maxWidth="sm" component="form">
      <Stack sx={{ gap: 2 }}>
        {
          /*
            這邊的 errors.name 使用兩極反轉「！！」是因為 mui 的 error 欄位本身只接收布林值
            當 zodResolver 驗證完欄位，會將結果傳給 formState.errors
            假如驗證通過會得到 undefined，若驗證不通過則會得到 { message: "error message"} 
          */
        }
        <RHFTextField<Schema> name="name" label="Name" />
        <RHFTextField<Schema> name="email" label="Email" />
        {/* <TextField
        {...register('name')}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      /> */}
        {/* <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      /> */}
        <RHFAutocomplete<Schema>
          name="states"
          label='States'
          options={statesQuery.data}
        />
        <RHFToggleButtonGroup<Schema>
          name="languesSpoken"
          options={languagesQuery.data}
        />
        <RHARadioGroup<Schema>
          name="gender"
          options={gendersQuery.data}
          label="Gender"
        />
        <RHACheckBox<Schema>
          name="skills"
          options={skillsQuery.data}
          label="Skills"
        />
        <RHADateAndTimePicker<Schema>
          name="registrationDateAndTime"
          label="Registration Date & Time"
        />
        <Typography>Former Employment Period:</Typography>
        <RHADateRangePicker<Schema> name="formerEmploymentPeriod" />
        <RHASlider<Schema> name="salaryRange" label="Salary Range" />
        <RHASwitch<Schema> name="isTeacher" label="Are you a teacher?" />
        {
          isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )
        }
        {fields.map((field, index) => (
          /*
          這邊是定義 schema.ts 中的 userSchema.and() 裡面的 students 位置
          用的雖然是 `student${index}.name` 
          實際上綁定的取值得位置方式是 students[index].name
          這是 react-hook-form 用來綁定表單欄位名稱的語法
          */
          <Fragment key={field.id}>
            <RHFTextField name={`student.${index}.name`} label="Name" />
            <Button color="error" onClick={() => remove(index)} type="button">
              Remove
            </Button>
          </Fragment>
        ))}
      </Stack>
    </Container>
  );
};

export default Users;
