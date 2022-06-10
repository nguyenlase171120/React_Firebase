import { FaUserAstronaut } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { authLogout } from '../redux/slice/authSlice';

function Logout() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.authState.currentUser);

  const handleLogout = () => {
    dispatch(authLogout());
  };
  return (
    <div className="flex_center">
      <FaUserAstronaut className="mr-2 " />
      <span className="mx-2">{currentUser.displayName}</span>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-black rounded-md font-bold text-white cursor-pointer ml-2 transition-all hover:bg-[#4C3575]"
      >
        Log out
      </button>
    </div>
  );
}

export default Logout;
