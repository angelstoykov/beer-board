import Board from "./Board";

const Boards = ({
    boards
}) => {

    return (
        <div id="boards">
            {boards.map(x => <Board key={x._id} {...x} />)}
        </div>
    );
}

export default Boards;