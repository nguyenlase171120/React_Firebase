import React from 'react';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IUserRegister } from '../../types';
import { ErrorUtil } from '../../util/ErrorUltil';
import { useAppDispatch } from '../../redux/hooks';
import { authRegister } from '../../redux/slice/authSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .max(100, 'Length of name cant overed 100 characters'),
  email: ErrorUtil.email,
  password: ErrorUtil.password,
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
});

function RegisterForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUserRegister>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: IUserRegister) => {
    dispatch(authRegister(data));

    setValue('name', '');
    setValue('email', '');
    setValue('password', '');
    setValue('confirmPassword', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name" className="font-bold my-2 ">
          Display User name
        </label>
        <motion.input
          type="text"
          id="name"
          className="border p-2 my-2 w-full"
          placeholder="Name"
          whileFocus={{
            boxShadow: '0px 0px 8px rgb(37, 29, 58)',
          }}
          {...register('name')}
        />

        {errors.name && <p className="form_error">{errors.name?.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="font-bold my-2 ">
          Email
          {' '}
        </label>
        <motion.input
          type="email"
          id="email"
          className="border p-2 my-2 w-full"
          placeholder="Email"
          whileFocus={{
            boxShadow: '0px 0px 8px rgb(37, 29, 58)',
          }}
          {...register('email')}
        />
        {errors.email && <p className="form_error">{errors.email?.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="font-bold my-2 ">
          Password
        </label>
        <motion.input
          type="password"
          id="password"
          className="border p-2 my-2 w-full"
          placeholder="Password"
          whileFocus={{
            boxShadow: '0px 0px 8px rgb(37, 29, 58)',
          }}
          {...register('password')}
        />

        {errors.password && (
          <p className="form_error">{errors.password?.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="font-bold my-2 ">
          Confirm password
        </label>
        <motion.input
          type="password"
          id="confirmPassword"
          className="border p-2 my-2 w-full"
          placeholder="Confirm password "
          whileFocus={{
            boxShadow: '0px 0px 8px rgb(37, 29, 58)',
          }}
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="form_error">{errors.confirmPassword?.message}</p>
        )}
      </div>

      <motion.button
        className="w-full rounded-sm p-2 uppercase border my-2 bg-black text-white font-bold"
        whileHover={{
          backgroundColor: '#DDDDDD',
        }}
        transition={{
          duration: 0.3,
        }}
      >
        Register
      </motion.button>
    </form>
  );
}

export default RegisterForm;
