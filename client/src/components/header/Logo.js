import { useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";

import Home from '../Home/Home';
import Content from '../content/Content';

const Logo = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div id="logo">
            {!isAuthenticated && (
                <>
                    <h1><Link to="/" element={<Home />}>Beer Board</Link></h1>
                    <h2><Link to="/" element={<Home />}>Celebrate your friendship</Link></h2>
                </>
            )}
            {isAuthenticated && (
                <>
                    <h1><Link to="/content" element={<Content />}>Beer Board</Link></h1>
                    <h2><Link to="/content" element={<Content />}>Celebrate your friendship</Link></h2>
                </>
            )}
        </div>
    );
}

export default Logo;