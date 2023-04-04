import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const increaseBeerCount = () => {
        setValues(state => ({ ...state, beersCount: state.beersCount + 1 }));
    };

    const decreaseBeerCount = () => {
        setValues(state => ({ ...state, beersCount: state.beersCount - 1 }));
    };

    const resetBeerCount = () => {
        setValues(state => ({ ...state, beersCount: 0 }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(values);
    };

    const addNewParticipant = (e, participant) => {
        e.preventDefault();

        //setValues(state => ({ ...state, participants: [...state.participants, participant] }));

        //values.participants.push(participant);
        //setValues(current => ({ ...current, participants: [current.participants, participant] }));
values.participants = values.participants.concat([participant]);
        // setParticipantsCount(values.participants.length)
        debugger
    }

    return {
        values,
        changeHandler,
        onSubmit,
        increaseBeerCount,
        decreaseBeerCount,
        resetBeerCount,
        addNewParticipant,
    }
}