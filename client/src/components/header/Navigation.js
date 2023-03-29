import { Link } from 'react-router-dom';
import Contact from '../contact/Contact';
import Content from '../content/Content';
import Login from '../Login/Login';
import Register from '../Register/Register';

const Navigation = () => {
    return (
        <nav id="navigation">
            <ul>
                {/* Non logged in user view */}
                {/* <Link to="/" element={<Home />}>Home</Link>*/}
                <Link to="/Login" element={<Login />}>Login</Link>
                <Link to="/Register" element={<Register />}>Register</Link>

                {/* Registered user view */}
                <Link to="/" element={<Content />}>My Boards</Link>
                {/* <Link to="/" element={<CreateBoard />}>Create Board</Link> */}
                <Link to="/Contact" element={<Contact />}>Contact</Link>
            </ul>
        </nav>
    );
}

export default Navigation;