import { useForm } from 'react-hook-form'

import { Button } from '@/components'
import { FormCheckbox } from '@/components/ui/form/form-checkbox'
import { FormSelect } from '@/components/ui/form/form-select'
import { FormTextField } from '@/components/ui/form/form-textfield'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const loginSchema = z.object({
  TOS: z.boolean().optional(),
  email: z.string().trim().email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(100, { message: 'Password must be fewer than 100 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
  rememberMe: z.boolean().optional(),
  selectedValue: z.string().default(''),
})

// const emailRegex =
//   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

export type FormValues = z.infer<typeof loginSchema>

type Props = {
  onSubmit: (values: FormValues) => void
}

export const LoginForm = ({ onSubmit }: Props) => {
  const {
    control,
    // call formState to find errors
    //formState: { errors },
    handleSubmit,
    //register,
    // here insert zod scheme to useForm
  } = useForm<FormValues>({
    defaultValues: {
      TOS: false,
      email: '',
      password: '',
      rememberMe: false,
      selectedValue: '',
    },
    resolver: zodResolver(loginSchema),
  })

  // const {
  //   // useController - wrapper for useState
  //   // const [value, onChange] = useState
  //
  //   // const changeHandler = () => onChange(!value)
  //   //return {field: {value, name, onChange, ...field}}
  //   field: { onChange, value, ...field },
  // } = useController({
  //   control,
  //   name: 'rememberMe',
  // })

  // const onSubmit = (data: FormValues) => {
  //   console.log(data)
  // }

  return (
    <>
      {import.meta.env.DEV && <DevTool control={control} />}

      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '7px 15px' }}>
        <FormTextField
          control={control}
          //errorMessage={errors.email?.message}
          label={'email'}
          name={'email'}
        />
        <FormTextField
          control={control}
          //errorMessage={errors.password?.message}
          label={'password'}
          name={'password'}
        />
        {
          /*
        <TextField
          {...register('email')}
          /*{...register('email', {*/
          /*  pattern: { message: 'Invalid email', value: emailRegex },*/
          /*  required: 'Email is required',*/
          /*})}*/
          // errorMessage={errors.email?.message}
          //label={'email'}
          // />
          //<TextField
          // {...register('password')}
          /*{...register('password', {*/
          /*  minLength: { message: 'Password has to be at least 3 characters long', value: 3 },*/
          /*  required: 'Password is required',*/
          /*})}
          errorMessage={errors.password?.message}
          label={'password'}
        />*/
        }
        <FormCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
        <FormCheckbox control={control} label={'Accept terms of service'} name={'TOS'} />

        <FormSelect
          control={control}
          name={'selectedValue'}
          options={['first', 'second', 'third']}
        />
        <Button type={'submit'}>Submit</Button>
      </form>
    </>
  )
}
