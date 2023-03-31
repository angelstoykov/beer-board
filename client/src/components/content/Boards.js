import Board from "./Board";

const Boards = ({
    boards
}) => {
    return (
        <div id="boards">
            {boards?.map(x => <Board key={x._id} {...x} />)}

            {boards?.length === 0 && (
                <h3 className="no-articles">No boards yet</h3>
            )}
        </div>
    );
}

export default Boards;