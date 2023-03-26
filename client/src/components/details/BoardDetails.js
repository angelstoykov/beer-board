import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import * as boardService from '../services/BoardService';

const BoardDetails = ({
    utils
}) => {
    const location = useLocation();
    const id = location.pathname.split("/").pop();
    const [board, setBoard] = useState({});

    useEffect(() => {
        boardService.getBoardById(id)
            .then(response => {
                setBoard(response);
            })
    }, []);

    return (
        <form>
            <div>
                <img src={board.imageSrc} alt=""
                    className="image" />
            </div>
            <p>Borad's name: <strong>{board.name}</strong></p>
            <p>Status: <strong>{utils.getStatusAsText(board.isActive)}</strong></p>
            <p>Beer's count: <strong>{board.beersCount}</strong></p>
            <p>Description: <strong>{board.description}</strong></p>
            <p>Suspects:</p>
            {<ul>{board.participants ? board.participants.map(p => <li key={p.email}><strong>{p.name}</strong></li>) : ''}</ul>}
        </form>
    );
}

export default BoardDetails;