import styles from './header.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { setAccessToken } from '../../actions/auth';

function Header(){

    const dispatch = useDispatch();

    const logout = async() => {
        const result = await axios.get('/auth/logout');
        if(result.status === 200){
            setAccessToken('', dispatch);
        }
        
    };

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
                    <div><button type='button' onClick={logout}>Выйти</button></div>
                </div>
            </div>
        </header>
    );
}

export default Header;