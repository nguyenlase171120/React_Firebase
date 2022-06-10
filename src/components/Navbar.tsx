import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul className="flex_center gap-2 cursor-pointer uppercase tracking-widest">
                <li className="text-[#293462] transition-all hover:text-[#242F9B] hover:underline">
                    <Link to="/useTransition">transition</Link>
                </li>

                <li className="text-[#293462] transition-all hover:text-[#242F9B] hover:underline w-[40px]">
                    <Link to="/query-content">
                        <img
                            src="https://react-query.tanstack.com/_next/static/images/emblem-light-628080660fddb35787ff6c77e97ca43e.svg"
                            alt="images "
                        />
                    </Link>
                </li>
                {/* <li>Hook</li>
                <li>Hook</li> */}
            </ul>
        </nav>
    );
};

export default Navbar;
