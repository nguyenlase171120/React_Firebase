import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { ErrorUtil } from '../../util/ErrorUltil';
import { IUserLogin } from '../../types';
import { useAppDispatch } from '../../redux/hooks';
import { authLogin } from '../../redux/slice/authSlice';

const schema = yup.object().shape({
    email: ErrorUtil.email,
    password: ErrorUtil.password,
});

function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<IUserLogin>({
        resolver: yupResolver(schema),
    });

    const dispatch = useAppDispatch();

    const onSubmit = (user: IUserLogin) => {
        dispatch(authLogin(user));

        setValue('email', '');
        setValue('password', '');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email" className="font-bold my-2 ">
                    Email
                </label>
                <motion.input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="p-2 border w-full my-2 "
                    whileFocus={{
                        boxShadow: '0px 0px 8px rgb(0, 9, 44)',
                    }}
                    {...register('email')}
                />

                {errors.email && (
                    <p className="form_error">{errors.email?.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="password" className="font-bold my-2 ">
                    Password
                </label>
                <motion.input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="p-2 border w-full my-2 "
                    whileFocus={{
                        boxShadow: '0px 0px 8px rgb(0, 9, 44)',
                    }}
                    {...register('password')}
                />

                {errors.password && (
                    <p className="form_error">{errors.password?.message}</p>
                )}
            </div>

            <div className="flex items-center my-2 justify-between">
                <div className="flex_center">
                    <input
                        type="checkbox"
                        id="remember"
                        className="mt-[5px]"
                        {...register('remember')}
                    />
                    <span className="ml-2 ">Remember me</span>
                </div>

                <Link
                    to="/forgot-password"
                    className="text-[#646FD4] hover:underline"
                >
                    Forgot your password ?
                </Link>
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white font-semibold rounded-sm py-2 uppercase cursor-pointer transition-all  hover:bg-[#3C2C3E] my-4"
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
