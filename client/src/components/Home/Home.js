import styles from './Home.module.css';

const Home = () => {
    return (
        <>
            <div>
                <img className={styles.centerImg} alt='beer-pic' src='https://www.eatthis.com/wp-content/uploads/sites/4/2022/02/Beer-flight.jpg?quality=82&strip=all' />
            </div>
            <div>
                <h3 id="home-caption" className="centerh3">
                    It is our great pleasure to have you on board!
                </h3>
                <h3 className="centerh3">
                    A hearty welcome to you!
                </h3>
            </div>
        </>
    );
}

export default Home;