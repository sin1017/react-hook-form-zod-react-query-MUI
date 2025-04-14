import { FormProvider, useForm } from "react-hook-form";
import { defaultValues, Schema, userSchema } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import Users from "./Users";
const UsersProvider = () => {
  const methods = useForm<Schema>({
    mode: 'all',
    resolver: zodResolver(userSchema),
    defaultValues: defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default UsersProvider