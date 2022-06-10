import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { authForgotPassword } from '../redux/slice/authSlice';

function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(authForgotPassword(email));
    navigate('/login');
  };
  return (
    <div className="flex_center_column mt-20">
      <form className="flex_center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Input email"
          className="p-2 border mr-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="py-2 px-4 rounded-sm font-bold cursor-pointer bg-gray-600 text-white">
          Send email
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
