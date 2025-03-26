import { useForm } from 'react-hook-form';
const Users = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<{ email: string }>({ mode: 'onBlur' });
  const onSubmit = () => {
    console.log("submit");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email',
          {
            required: { value: true, message: '此欄位必填' },
            maxLength: { value: 10, message: '最多10個字' }
          })
        }
        placeholder="Please Input Email"
      />
      <p>{errors.email?.message}</p>
    </form>
  );
};

export default Users;
