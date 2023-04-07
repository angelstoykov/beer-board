import { useState } from "react";

import styles from './AddParticipant.module.css';

const AddParticipant = ({
    onCloseClick,
    addNewParticipant,
}) => {
    const [participant, setParticipant] = useState({});

    const onParticipantNameChange = (e) => {
        setParticipant(p => ({ ...p, name: e.target.value }));
    }

    const onParticipantEmailChange = (e) => {
        setParticipant(p => ({ ...p, email: e.target.value }));
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="add-participant">Add participant</h5>
                        <button className={`btn btn-secondary ${styles.modalCloseBtn}`} type="button" data-dismiss="modal" aria-label="Close" onClick={onCloseClick}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="formAddParticipant">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <div className="input-wrapper">
                                        <input id="name" name="name" type="text" value={participant.name ?? ''} onChange={(e) => onParticipantNameChange(e)} />
                                    </div>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-wrapper">
                                        <input id="email" name="email" type="text" value={participant.email ?? ''} onChange={(e) => onParticipantEmailChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCloseClick}>Close</button>
                        <button type="button" className="btn btn-success" onClick={(e) => addNewParticipant(e, participant)}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddParticipant;