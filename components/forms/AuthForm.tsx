'use client';

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { z, ZodType } from 'zod';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ROUTES from '@/constants/routes';

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    // TODO: Authenticate User
  };

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Sign Up';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-10"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5 w-full">
                <FormLabel className="text-dark400_light700 paragraph-medium">
                  {field.name === 'email'
                    ? 'Email Address'
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type={field.name === 'password' ? 'password' : 'text'}
                    autoComplete={field.name === 'password' ? 'nope' : 'on'}
                    {...field}
                    className="border light-border-2 rounded-1.5 min-h-12 text-dark300_light700 paragraph-regular background-light900_dark300 no-focus"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="px-4 py-3 rounded-2 w-full min-h-12 font-inter text-light-900 primary-gradient paragraph-medium"
        >
          {form.formState.isSubmitting
            ? buttonText === 'Sign In'
              ? 'Signin In...'
              : 'Signing Up...'
            : buttonText}
        </Button>

        {formType === 'SIGN_IN' ? (
          <p>
            Don't have an account?{' '}
            <Link
              href={ROUTES.SIGN_UP}
              className="primary-text-gradient paragraph-semibold"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Link
              href={ROUTES.SIGN_IN}
              className="primary-text-gradient paragraph-semibold"
            >
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
