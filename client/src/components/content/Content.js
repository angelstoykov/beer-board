// import Contact from "../contact/Contact";
// import Sidebar from "../sidebar/Sidebar";
import Boards from "./Boards";

const Content = ({
    boards
}) => {
    return (
        <div id="content">
            <Boards boards={boards}/>
            {/* <Sidebar /> */}
        </div>
    );
}

export default Content;