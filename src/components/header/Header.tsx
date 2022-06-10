import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../../assets/imagesRender';
import Logout from '../../pages/Logout';
import { useAppSelector } from '../../redux/hooks';
import Navbar from '../Navbar';

function Header() {
    const navigate = useNavigate();
    const userLogin = useAppSelector(state => state.authState.currentUser);

    return (
        <header className="bg-[#F9F9F9] w-screen flex items-center justify-between px-4 shadow-lg ">
            <div className="w-24">
                <img src={logo} alt="images" className=" w-full rounded-full" />
            </div>

            <Navbar />
            {userLogin ? (
                <Logout />
            ) : (
                <div className="flex_center">
                    <Link
                        to="/login"
                        className="mr-4 text-[#92B4EC] cursor-pointer transition-all hover:text-[#B1BCE6] font-bold"
                    >
                        Login
                    </Link>
                    <button
                        onClick={() => navigate('/register')}
                        className="px-[10px] py-2 text-white bg-btn-signup rounded-md transition-all hover:bg-[#2155CD] font-bold"
                    >
                        Sign-up
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;
