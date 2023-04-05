import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddParticipant from '../edit/AddParticipant';
import { useForm } from '../../hooks/useForm';

import styles from './CreateBoard.module.css';



const CreateBoard = ({
    utils,
    onCreateBoardHandler
}) => {
    const boardInitials = {
        beersCount: 0,
        isActive: true,
        participants: []
    }

    const [newBoard, setNewBoard] = useState(boardInitials);
    const [participantsCount, setParticipantsCount] = useState(0);
    const [addParticipant, setAddParticipant] = useState(false);
    const [participants, setParticipant] = useState([]);
    const navigate = useNavigate();

    const onParticipantDeleteClick = (email) => {
        let filteredParticipants = newBoard.participants.filter(p => p.email !== email)

        setNewBoard(newBoard => ({ ...newBoard, participants: filteredParticipants }));
        setParticipantsCount(filteredParticipants.length)
    }

    const goBackToAllBoards = () => {
        navigate('/content');
    }

    const onAddParticipantClick = () => {
        setAddParticipant(true);
    }

    const onCloseClick = () => {
        setAddParticipant(false);
    }

    const addNewParticipant = (e, participant) => {
        e.preventDefault();

        setParticipant(participants => [...participants, participant]);

        setParticipantsCount(participants.length)
    }

    const { values, changeHandler, onSubmit, increaseBeerCount, decreaseBeerCount, resetBeerCount } = useForm({
        name: '',
        isActive: true,
        beersCount: 0,
        imageSrc: '',
        description: '',
    }, onCreateBoardHandler);

    return (
        <>
            {addParticipant && <AddParticipant
                onCloseClick={onCloseClick}
                addNewParticipant={addNewParticipant} />}
            <form id="create" method="POST" onSubmit={(e) => onSubmit(e, participants)}>
                <div className="form-group">
                    <label htmlFor="name">Board name</label>
                    <div className="input-wrapper">
                        <input id="name" name="name" type="text" value={values.name} onChange={changeHandler} />
                    </div>
                    <p className="form-error">
                        First name should be at least 3 characters long!
                    </p>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <div className="input-wrapper">
                        <div className={styles.statusWrapper}>
                            <p><strong>{utils.getStatusAsText(values.isActive)}</strong></p>
                        </div>

                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="beersCount">Beers count</label>
                    <div className="input-wrapper">
                        <p name="beersCount"><strong>{values.beersCount}</strong></p>
                    </div>
                    <button id="decreaser" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={decreaseBeerCount}>-</button>
                    <button id="decreaser" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={resetBeerCount}>Reset</button>
                    <button id="increaser" className={`btn btn-primary ${styles.btnMainMargin}`} type="button" onClick={increaseBeerCount}>+</button>
                    <p className="form-error">Are you serious 'bout that!? :)</p>
                </div>

                <div className="form-group long-line">
                    <label htmlFor="imageSrc">Image Src</label>
                    <div className="input-wrapper">
                        <input id="imageSrc" name="imageSrc" type="text" value={values.imageSrc} onChange={changeHandler} />
                    </div>
                    <p className="form-error">ImageSrc is not valid!</p>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className="input-wrapper">
                        <input id="description" name="description" type="text" value={values.description} onChange={changeHandler} />
                    </div>
                    <p className="form-error">
                        Description should be at least 2 characters long!
                    </p>
                </div>

                <div className="form-group">
                    <label htmlFor="participants">Participants</label>
                    <i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" onClick={onAddParticipantClick}></i>
                    <div className="input-wrapper">
                        <ul>{participants.length
                            ? participants.map(p =>
                                <li key={p.email}>
                                    <span>
                                        <strong>{p.name}</strong>
                                        <i className="fa-solid fa-trash" onClick={() => onParticipantDeleteClick(p.email)}></i>
                                    </span>
                                </li>)
                            : ''}</ul>
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
        </>
    );
}

export default CreateBoard;