import { useForm, FieldValues, Resolver, FieldError } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormWrapperInterface } from '@/interfaces/utility';
import { IoWarning } from 'react-icons/io5';

export function FormWrapperUtil<T extends FieldValues>({
  children,
  className = "",
  onSubmit,
  validationSchema,
  defaultValues
}: FormWrapperInterface<T>) {

  const form = useForm<T>({ defaultValues, resolver: yupResolver(validationSchema) as unknown as Resolver<T>, mode: 'onChange' });

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className={className}>
      {children(form.register, form.formState.errors, form)}
    </form>
  );
}

export function getErrorMessage(error: FieldError | undefined) {
  return {
    isInvalid: !!error, // This will return true if error exists, false otherwise
    errorMessage: error ? <span className='flex flex-row items-center text-sm'><IoWarning className='text-lg mr-2' />{error.message}</span> : '' // If error exists, return its message, otherwise return an empty string
  };
}
