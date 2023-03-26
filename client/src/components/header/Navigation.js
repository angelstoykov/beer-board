import { Link } from 'react-router-dom';
import Contact from '../contact/Contact';
import Content from '../content/Content';

const Navigation = () => {
    return (
        <nav id="navigation">
            <ul>
                <Link to="/" element={<Content />}>My Boards</Link>
                <Link to="/Contact" element={<Contact />}>Contact</Link>
            </ul>
        </nav>
    );
}

export default Navigation;