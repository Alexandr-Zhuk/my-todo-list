import styles from './header.module.css';

function Header(){
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.head_title_search}>
                    <div className={styles.head_title}>
                        Задачи
                    </div>
                    <div className={styles.search}>
                        <input type="text" name="search" className={styles.search_input}/>
                    </div>
                </div>
                <div className={styles.personal}>

                </div>
            </div>
        </header>
    );
}

export default Header;