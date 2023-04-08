import { Link } from "react-router-dom";
import Board from "./Board";
import CreateBoard from '../create/CreateBoard';

const Boards = ({
    boards
}) => {
    return (
        <div id="boards">
            <Link to="/create-board" element={<CreateBoard />}><button className="btn btn-success">Create Board</button></Link>
            {boards?.map(x => <Board key={x._id} {...x} />)}

            {boards?.length === 0 && (
                <h3 className="no-articles">No boards yet</h3>
            )}
        </div>
    );
}

export default Boards;