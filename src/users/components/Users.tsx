import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Schema } from '../types/schema';
import RHFAutocomplete from '../../component/RHFAutocomplate';
import { useEffect } from 'react';
import { useLanguages, useStates } from '../services/queries';
import RHFToggleButtonGroup from '../../component/RHFToggleButtonGroup';

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();

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
    </Stack>
  );
};

export default Users;
