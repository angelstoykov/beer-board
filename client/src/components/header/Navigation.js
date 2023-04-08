import { Link } from 'react-router-dom';
import Contact from '../contact/Contact';
import Content from '../content/Content';
import Login from '../login/Login';
import { Logout } from '../logout/Logout'
import Register from '../register/Register';

import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

const Navigation = () => {
    const { isAuthenticated, userEmail } = useContext(AuthContext);
    
    return (
        <nav id="navigation">
            <ul>
                {/* Non logged in user view */}
                {!isAuthenticated && (
                    <div id="guest">
                        {/* <Link to="/" element={<Home />}>Home</Link>*/}
                        <Link to="/Login" element={<Login />}>Login</Link>
                        <Link to="/Register" element={<Register />}>Register</Link>
                    </div>
                )}

                {/* Registered user view */}
                {isAuthenticated && (
                    <div id="user">
                        <Link to="/content" element={<Content />}>Boards</Link>
                        <Link to="/contact" element={<Contact />}>Contact</Link>
                        <span>{userEmail}</span>
                        <Link to="/logout" element={<Logout />}>Logout</Link>
                        {/* <Link to="/" element={<CreateBoard />}>Create Board</Link> */}
                    </div>
                )}

            </ul>
        </nav>
    );
}

export default Navigation;