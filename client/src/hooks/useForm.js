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
    }

    return {
        values,
        changeHandler,
        onSubmit,
        increaseBeerCount,
        decreaseBeerCount,
        resetBeerCount,
    }
}