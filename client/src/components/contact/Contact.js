import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

const Contact = () => {
    const { userEmail } = useContext(AuthContext);

    return (
        <div className="centerh3">
            <h3>Contact info</h3>
            <p>You can reach me out at: {userEmail}</p>
        </div>
    );
}

export default Contact;