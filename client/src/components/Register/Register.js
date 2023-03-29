import styles from './Register.module.css';

const Register = () => {
    return (
        <form>
            <div className={styles.container}>
                <label htmlFor="username"><b>Email</b></label>
                <input type="text" placeholder="Enter Username" name="username" required />

                <label htmlFor="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" required />

                <label htmlFor="password-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="password-repeat" required></input>
            </div>

            <div className={styles.buttonsdivcenter}>
                <button type="submit">Login</button>
            </div>
        </form>
    );
}

export default Register;