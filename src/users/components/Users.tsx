import { Stack, TextField, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../types/schema';
import RHFAutocomplete from '../../component/RHFAutocomplate';
import { useEffect } from 'react';
import { useLanguages, useStates, useGenders, useSkills } from '../services/queries';
import RHFToggleButtonGroup from '../../component/RHFToggleButtonGroup';
import RHARadioGroup from '../../component/RHARadioGroup';
import RHACheckBox from '../../component/RHACheckBox';
import RHADateAndTimePicker from '../../component/RHADateAndTimePicker';
import RHADateRangePicker from '../../component/RHADateRangePicker';
import RHASlider from '../../component/RHASlider';
import RHASwitch from '../../component/RHASwitch';

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext<Schema>();

  useEffect(() => {
    const sub = watch((value) => {
      console.log(value)
    });
    return () => sub.unsubscribe();
  }, [])

  return (
    <Stack sx={{ gap: 2 }}>
      {
        /*
          這邊的 errors.name 使用兩極反轉「！！」是因為 mui 的 error 欄位本身只接收布林值
          當 zodResolver 驗證完欄位，會將結果傳給 formState.errors
          假如驗證通過會得到 undefined，若驗證不通過則會得到 { message: "error message"} 
        */
      }
      <TextField
        {...register('name')}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
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
    </Stack>
  );
};

export default Users;
