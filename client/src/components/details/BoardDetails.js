import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import * as boardService from '../services/boardService';

import styles from './BoardDetails.module.css';

const BoardDetails = ({
    utils
}) => {
    const routeParams = useParams();
    const id = routeParams._id;
    const [board, setBoard] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        boardService.getBoardById(id)
            .then(response => {
                setBoard(response);
            })
    }, []);

    const goBackToAllBoards = () => {
        navigate('/');
    }

    return (
        <form>
            <div>
                <img src={board.imageSrc} alt="" className={styles.defaultImg} />
            </div>
            <p>Borad's name: <strong>{board.name}</strong></p>
            <p>Status: <strong>{utils.getStatusAsText(board.isActive)}</strong></p>
            <p>Beer's count: <strong>{board.beersCount}</strong></p>
            <p>Description: <strong>{board.description}</strong></p>
            <p>Suspects:</p>
            {<ul>{board.participants ? board.participants.map(p => <li key={p.email}><strong>{p.name}</strong></li>) : ''}</ul>}
            <button id="action-cancel" className="btn btn-secondary" type="button" onClick={goBackToAllBoards}>
                Go Back
            </button>
        </form>
    );
}

export default BoardDetails;