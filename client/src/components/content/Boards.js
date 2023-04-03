import { Link } from "react-router-dom";
import Board from "./Board";
import CreateBoard from '../Create/CreateBoard';

const Boards = ({
    boards
}) => {
    return (
        <div id="boards">
            <button><Link to="/create-board" element={<CreateBoard />}>Create Board</Link></button>
            {boards?.map(x => <Board key={x._id} {...x} />)}

            {boards?.length === 0 && (
                <h3 className="no-articles">No boards yet</h3>
            )}
        </div>
    );
}

export default Boards;