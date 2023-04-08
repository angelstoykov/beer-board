import { useEffect, useState, useContext } from "react";

import { useParams, useNavigate, Link } from "react-router-dom";

import { boardServiceFactory } from '../services/boardService';
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";

import styles from './BoardDetails.module.css';
import Button from 'react-bootstrap/Button';

const BoardDetails = ({
    utils,
    stateChanger,
}) => {
    const { userId } = useContext(AuthContext);
    const { isAuthenticated } = useContext(AuthContext);
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
    }, [boardService, id]);

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
        <>
            {isAuthenticated && (
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
                                <Link to={{ pathname: `/edit/board/${board._id}` }}><Button variant='primary'>Edit</Button></Link>
                                <button id="action-delete" className="btn btn-danger" type="button" onClick={onDeleteClick}>
                                    Delete
                                </button>
                            </>
                        )
                    }

                    <button id="action-cancel" className="btn btn-success" type="button" onClick={goBackToAllBoards}>
                        Go Back
                    </button>
                </form>
            )}
        </>
    );
}

export default BoardDetails;