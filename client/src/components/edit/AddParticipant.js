import { useState } from "react";

const AddParticipant = ({
    onCloseClick,
    onAddNewParticipant,
}) => {
    const [participant, setParticipant] = useState({});

    const onParticipantNameChange = (e) => {
        console.log(e.target.value);
        setParticipant(p => ({ ...p, name: e.target.value }));
    }

    const onParticipantEmailChange = (e) => {
        console.log(e.target.value);
        setParticipant(p => ({ ...p, email: e.target.value }));
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="add-participant">Add participant</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCloseClick}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <div className="input-wrapper">
                                        <span><i className="fa-solid fa-user"></i></span>
                                        <input id="name" name="name" type="text" value={participant?.name} onChange={(e) => onParticipantNameChange(e)}/>
                                    </div>
                                    <p className="form-error">
                                        First name should be at least 3 characters long!
                                    </p>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-wrapper">
                                        <span><i className="fa-solid fa-envelope"></i></span>
                                        <input id="email" name="email" type="text" value={participant?.email} onChange={(e) => onParticipantEmailChange(e)}/>
                                    </div>
                                    <p className="form-error">Email is not valid!</p>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onCloseClick}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={(e) => onAddNewParticipant(e, participant)}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddParticipant;