import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';

const QueryHome = () => {
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
};

export default QueryHome;
