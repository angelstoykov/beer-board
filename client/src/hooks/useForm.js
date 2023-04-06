import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({...state, [e.target.name]: e.target.value}))
    }

    const onSubmit = (e, participants, beersCount) => {
        e.preventDefault();

        if (Array.isArray(participants) && participants.length !== 0) {
            values.participants = participants;
        }

        if (typeof beersCount === 'number') {
            values.beersCount = beersCount;
        }
        
        onSubmitHandler(values);
    }

    return {
        values,
        changeHandler,
        onSubmit,
    }
}