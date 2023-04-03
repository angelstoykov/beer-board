import { useEffect, useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { boardServiceFactory } from '../services/boardService';
import { useService } from "../../hooks/useService";

import { AuthContext } from "../../contexts/AuthContext";

import styles from './BoardDetails.module.css';

const BoardDetails = ({
    utils,
    stateChanger,
}) => {
    const { userId } = useContext(AuthContext);
    const routeParams = useParams();
    const id = routeParams._id;
    const [board, setBoard] = useState({});
    const boardService = useService(boardServiceFactory);

    const navigate = useNavigate();

    useEffect(() => {
        boardService.getBoardById(id)
            .then(response => {
                setBoard(response);
            })
    }, []);

    const goBackToAllBoards = () => {
        navigate('/content');
    }

    const isOwner = board._ownerId === userId;

    const onDeleteClick = async () => {
        await boardService.delete(board._id);
        stateChanger(state => state.filter(b => b._id !== board._id))
        navigate('/content');
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

            {isOwner &&
                (
                    <>
                    <button id="action-cancel" className="btn btn-secondary" type="button" onClick={goBackToAllBoards}>
                        Edit
                    </button>
                    <button id="action-delete" className="btn btn-secondary" type="button" onClick={onDeleteClick}>
                        Delete
                    </button>
                    </>
                )
            }

            <button id="action-cancel" className="btn btn-secondary" type="button" onClick={goBackToAllBoards}>
                Go Back
            </button>
        </form>
    );
}

export default BoardDetails;