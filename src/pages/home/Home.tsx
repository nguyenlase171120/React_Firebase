import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';

function Home() {
    return (
        <div>
            <header>
                <Header />
            </header>

            <section>
                <Outlet />
            </section>
        </div>
    );
}

export default Home;
