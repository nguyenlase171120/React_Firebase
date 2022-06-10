import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SocialLogin from './SocialLogin';

function Login() {
  return (
    <div className="flex_center w-screen min-h-[calc(100vh-6rem)]">
      <div className="rounded-md shadow-sm container py-2 px-4 border max-w-md">
        <h2 className="font-bold text-xl my-4 uppercase text-center tracking-widest">
          Login user
        </h2>

        <LoginForm />

        <p className="text-md text-center font-semibold">Or Login with</p>
        <SocialLogin />

        <div className="flex items-center justify-start">
          <span>Dont have an account ? </span>
          {' '}
          <Link to="/register" className="text-[#646FD4] hover:underline mx-2 ">
            Sign-up here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
