import styles from './Home.module.css';

const Home = () => {
    return (
        <>
            <div>
                <img className={styles.center} src='https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/Beer-flight.jpg?quality=82&strip=all' />
            </div>
            <div>
                <h3 id="home-caption" className={styles.centerh3}>
                    It is our great pleasure to have you on board! A hearty welcome to you!
                </h3>
            </div>
        </>
    );
}

export default Home;