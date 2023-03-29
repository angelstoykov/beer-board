import styles from './Login.module.css';

import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';

const FormKeys = {
    Email: 'email',
    Password: 'password'
}

const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        [FormKeys.Email]: '',
        [FormKeys.Password]: ''
    }, onLoginSubmit);

    return (
        <form id="login" method="POST" onSubmit={onSubmit}>
            <div className={styles.container}>
                <label htmlFor={FormKeys.Email}><b>Email</b></label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name={FormKeys.Email}
                    required
                    value={values[FormKeys.Email]}
                    onChange={changeHandler}
                    />

                <label htmlFor={FormKeys.Password}><b>Password</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name={FormKeys.Password}
                    required
                    value={values[FormKeys.Password]}
                    onChange={changeHandler}
                    />
            </div>

            <div className={styles.buttonsdivcenter}>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}

export default Login;