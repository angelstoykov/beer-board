import { useContext } from 'react';
import { useForm } from '../../hooks/useForm';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './Register.module.css';

const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        passwordRepeat: '',
    }, onRegisterSubmit)

    return (
        <form method="POST" onSubmit={onSubmit}>
            <div className={styles.container}>
                <label htmlFor="email"><b>Email</b></label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    required
                    value={values.email}
                    onChange={changeHandler}
                    />

                <label htmlFor="password"><b>Password</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    required
                    value={values.password}
                    onChange={changeHandler}
                />

                <label htmlFor="password-repeat"><b>Repeat Password</b></label>
                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="passwordRepeat"
                    required
                    value={values.passwordRepeat}
                    onChange={changeHandler}
                />
            </div>

            <div className={styles.buttonsdivcenter}>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}

export default Register;