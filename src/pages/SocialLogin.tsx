import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { useAppDispatch } from '../redux/hooks';
import { authLoginFacebook, authLoginGoogle } from '../redux/slice/authSlice';

function SocialLogin() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex_center_column">
      <div
        className="w-full flex_center p-2 border bg-[#2155CD] my-2 cursor-pointer hover:opacity-95"
        onClick={() => dispatch(authLoginGoogle())}
      >
        <FcGoogle />
        <span className="text-white  ml-4 ">Login with google </span>
      </div>

      <div
        className="w-full flex_center p-2 border bg-[#242F9B] my-2 cursor-pointer hover:opacity-95"
        onClick={() => dispatch(authLoginFacebook())}
      >
        <FaFacebook className="text-white text-lg" />
        <span className="text-white  ml-4 ">Login with facebook </span>
      </div>
    </div>
  );
}

export default SocialLogin;
