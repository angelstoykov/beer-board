// import Contact from "../contact/Contact";
import Boards from "./Boards";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


const Content = ({ boards }) => {
    const { isAuthenticated } = useContext(AuthContext)
    return <>
        {isAuthenticated && (
            <div id="content">
                <Boards boards={boards} />
            </div>
        )}

    </>
}

export default Content;