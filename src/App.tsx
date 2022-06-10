import { Routes, Route, useNavigate } from 'react-router-dom';
import {
    onAuthStateChanged,
    sendEmailVerification,
    signOut,
} from 'firebase/auth';
import { useEffect } from 'react';
import EmailVerified from './pages/EmailVerified';

import Home from './pages/home/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { auth } from './firebase';
import Search from './pages/Search';
import { useAppDispatch } from './redux/hooks';
import { loginUser } from './redux/slice/authSlice';
import ForgotPassword from './pages/ForgotPassword';
import PhotosContent from './pages/PhotosContent';
import UseTransition from './hooks/UseTransition';
import QueryHome from './pages/home/QueryHome';
import QueryContent from './pages/QueryContent';
import DetailPost from './pages/DetailPost';
import AddPost from './pages/AddPost';
import UpdatePost from './pages/UpdatePost';

function App() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleVerifyEmail = onAuthStateChanged(auth, async user => {
            if (user) {
                if (!user.emailVerified) {
                    await sendEmailVerification(user)
                        .then(() => {
                            console.log('send email success');
                        })
                        .catch(error => console.log(error));

                    await signOut(auth);
                    navigate('/verifyEmail');
                } else {
                    dispatch(loginUser(user));
                    navigate('/photos');
                }
            } else {
                dispatch(loginUser(undefined));
                navigate('/login');
            }
        });

        return handleVerifyEmail;
    }, []);

    return (
        <div>
            <div className="fixed top-0 left-0 bottom-0 bg-black z-50 w-full h-[10px]">
                <div
                    className="absolute top-0 left-0 bottom-0 bg-red-600 w-[20%] h-[10px]"
                    id="value"
                ></div>
            </div>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verifyEmail" element={<EmailVerified />} />
                    <Route path="/search" element={<Search />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/photos" element={<PhotosContent />} />
                </Route>
                <Route path="/useTransition" element={<UseTransition />} />
                <Route path="/" element={<QueryHome />}>
                    <Route path="/query-content" element={<QueryContent />} />
                    <Route
                        path="/query-content/:title"
                        element={<DetailPost />}
                    />
                    <Route path="/addNew" element={<AddPost />} />
                    <Route path="/update/:id" element={<UpdatePost />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
