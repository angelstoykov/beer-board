import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import AddParticipant from '../Participant/AddParticipant';
import { useService } from '../../hooks/useService';
import { AuthContext } from "../../contexts/AuthContext";
import { boardServiceFactory } from '../services/boardService';

import styles from './EditBoard.module.css';

const EditBoard = ({
    utils,
}) => {
    const { isAuthenticated } = useContext(AuthContext);

    const routeParams = useParams();
    const id = routeParams._id;

    const navigate = useNavigate();

    const [board, setBoard] = useState({});
    const [addParticipant, setAddParticipant] = useState(false);
    const [participantsCount, setParticipantsCount] = useState(0);
    const boardService = useService(boardServiceFactory);

    useEffect(() => {
        boardService.getBoardById(id)
            .then(response => {
                setBoard(response);
                setParticipantsCount(response.participants.length);
            })
    }, [boardService, id]);

    const toggleStatus = (status) => {
        setBoard(board => ({ ...board, isActive: !status }))
    }

    const increaseBeerCount = () => {
        setBoard(board => ({ ...board, beersCount: board.beersCount + 1 }));
    };

    const decreaseBeerCount = () => {
        setBoard(board => ({ ...board, beersCount: board.beersCount - 1 }));
    };

    const resetBeerCount = () => {
        setBoard(board => ({ ...board, beersCount: 0 }));
    };

    const onBoardNameChange = (e) => {
        setBoard(board => ({ ...board, name: e.target.value }));
    }

    const onImageSrcChange = (e) => {
        setBoard(board => ({ ...board, imageSrc: e.target.value }));
    }

    const onDescriptionChange = (e) => {
        setBoard(board => ({ ...board, description: e.target.value }));
    }

    const onEditHandler = async (e) => {
        e.preventDefault();

        await boardService.edit(board._id, board);

        navigate('/content');
    }

    const onparticipantDeleteClick = (id) => {
        let filteredParticipants = board.participants.filter(p => p._id !== id)

        setBoard(board => ({ ...board, participants: filteredParticipants }));
        setParticipantsCount(filteredParticipants.length)
    }

    const onAddParticipantClick = () => {
        setAddParticipant(true);
    }

    const onCloseClick = () => {
        setAddParticipant(false);
    }

    const addNewParticipant = (e, participant) => {
        e.preventDefault();

        setBoard(board => ({ ...board, participants: [...board.participants, participant] }));

        setParticipantsCount(board.participants.length)
    }

    const goBackToAllBoards = () => {
        navigate('/content');
    }

    return (
        <>
            {addParticipant && <AddParticipant
                onCloseClick={onCloseClick}
                addNewParticipant={addNewParticipant} />}
            {isAuthenticated && (
                <form onSubmit={onEditHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Board name</label>
                        <div className="input-wrapper">
                            <input id="name" name="name" type="text" value={board.name ?? ''} onChange={(e) => onBoardNameChange(e)} />
                        </div>
                        <p className="form-error">
                            First name should be at least 3 characters long!
                        </p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <div className="input-wrapper">
                            <div className={styles.statusWrapper}>
                                <p><strong>{utils.getStatusAsText(board.isActive)}</strong></p>
                                <button id="toggle-status" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={() => toggleStatus(board.isActive)}>
                                    {utils.getChangeStatusBtnCaption(board.isActive)}
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="beersCount">Beers count</label>
                        <div className="input-wrapper">
                            <p><strong>{board.beersCount}</strong></p>
                        </div>
                        <button id="decreaser" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={decreaseBeerCount}>-</button>
                        <button id="decreaser" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={resetBeerCount}>Reset</button>
                        <button id="increaser" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={increaseBeerCount}>+</button>
                        <p className="form-error">Are you serious 'bout that!? :)</p>
                    </div>

                    <div className="form-group long-line">
                        <label htmlFor="imageSrc">Image Src</label>
                        <div className="input-wrapper">
                            <input id="imageSrc" name="imageSrc" type="text" value={board.imageSrc ?? ''} onChange={(e) => onImageSrcChange(e)} />
                        </div>
                        <p className="form-error">ImageSrc is not valid!</p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <div className="input-wrapper">
                            <input id="description" name="description" type="text" value={board.description ?? ''} onChange={(e) => onDescriptionChange(e)} />
                        </div>
                        <p className="form-error">
                            Description should be at least 2 characters long!
                        </p>
                    </div>

                    <div className="form-group">
                        <label htmlFor="participants">Participants</label>
                        <i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" onClick={onAddParticipantClick}></i>
                        <div className="input-wrapper">
                            {<ul>{board.participants
                                ? board.participants.map(p =>
                                    <li key={p.email}>
                                        <strong>{p.name}</strong>
                                        <span><i className="fa-solid fa-trash" onClick={() => onparticipantDeleteClick(p._id)}></i></span>
                                    </li>)
                                : ''}</ul>}
                        </div>
                        {participantsCount === 0
                            ? <p className={styles.formError}>
                                Participants should be at least 1! :D
                            </p>
                            : ''
                        }
                    </div>

                    <div id="form-actions" className={styles.formActions}>
                        <button id="action-cancel" className={`btn btn-secondary ${styles.btnMainMargin}`} type="button" onClick={goBackToAllBoards}>
                            Cancel
                        </button>
                        <button id="action-save" className="btn btn-success" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </>
    );
}

export default EditBoard;