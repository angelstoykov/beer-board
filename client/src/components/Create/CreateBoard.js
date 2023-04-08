import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddParticipant from '../participant/AddParticipant';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from "../../contexts/AuthContext";

import styles from './CreateBoard.module.css';

const CreateBoard = ({
    utils,
    onCreateBoardHandler
}) => {
    const { isAuthenticated } = useContext(AuthContext)

    const [addParticipant, setAddParticipant] = useState(false);
    const [participants, setParticipant] = useState([]);
    const [beersCount, setBeersCount] = useState(0);
    const navigate = useNavigate();

    const onParticipantDeleteClick = (id) => {
        let filteredParticipants = participants.filter(p => p._id !== id)

        setParticipant(filteredParticipants);
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

        let id = generateUUID();
        participant._id = id;
        setParticipant(participants => [...participants, participant]);
    }

    const generateUUID = () => {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    };

    const increaseBeerCount = () => {
        setBeersCount(beersCount => beersCount + 1);
    };

    const decreaseBeerCount = () => {
        setBeersCount(beersCount => beersCount - 1);
    };

    const resetBeerCount = () => {
        setBeersCount(beersCount => beersCount = 0);
    };

    const { values, changeHandler, onSubmit, } = useForm({
        name: '',
        isActive: true,
        imageSrc: '',
        description: '',
    }, onCreateBoardHandler);

    return (
        <>
            {addParticipant && <AddParticipant
                onCloseClick={onCloseClick}
                addNewParticipant={addNewParticipant} />}
            {isAuthenticated && (
                <form id="create" method="POST" onSubmit={(e) => onSubmit(e, participants, beersCount)}>
                    <div className="form-group">
                        <label htmlFor="name">Board name</label>
                        <div className="input-wrapper">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={values.name}
                                onChange={changeHandler}
                            />
                        </div>
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
                            <p name="beersCount"><strong>{beersCount}</strong></p>
                        </div>
                        <button id="decreaser" className={`btn btn-primary ${styles.beerCounterBtns}`} type="button" onClick={() => { decreaseBeerCount(); }}>-</button>
                        <button id="decreaser" className={`btn btn-primary ${styles.beerCounterResetBtn}`} type="button" onClick={() => { resetBeerCount(); }}>Reset</button>
                        <button id="increaser" className={`btn btn-primary ${styles.beerCounterBtns}`} type="button" onClick={() => { increaseBeerCount(); }}>+</button>
                    </div>

                    <div className="form-group long-line">
                        <label htmlFor="imageSrc">Image Src</label>
                        <div className="input-wrapper">
                            <input id="imageSrc" name="imageSrc" type="text" value={values.imageSrc} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <div className="input-wrapper">
                            <input id="description" name="description" type="text" value={values.description} onChange={changeHandler} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="participants">Participants</label>
                        <i className="fa fa-plus-circle" aria-hidden="true" data-toggle="modal" data-target="#exampleModal" onClick={onAddParticipantClick}></i>
                        <div>
                            <ul>{participants.length
                                ? participants.map(p =>
                                    <li key={p._id}>
                                        <strong>{p.name}</strong>
                                        <i className="fa-solid fa-trash" onClick={() => onParticipantDeleteClick(p._id)}></i>
                                    </li>)
                                : ''}</ul>
                        </div>
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

export default CreateBoard;