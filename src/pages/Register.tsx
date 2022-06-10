import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import RegisterForm from '../components/auth/RegisterForm';
import { useAppSelector } from '../redux/hooks';

function Register() {
  const statusLoading = useAppSelector((state) => state.authState.loading);

  return (
    <div className="flex_center min-h-[calc(100vh-6rem)]">
      {statusLoading ? (
        <div className="w-screen h-screen  flex_center bg-black opacity-95">
          <PacmanLoader loading size="20px" color="white" />
        </div>
      ) : (
        <div className="container shadow-sm p-5 max-w-md border">
          <h2 className="text-center my-2 text-xl tracking-widest uppercase">
            Register Form
          </h2>

          <RegisterForm />

          <div>
            Are you already have an account ?
            {' '}
            <Link to="/login " className="text-btn-signup ml-2 hover:underline">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
