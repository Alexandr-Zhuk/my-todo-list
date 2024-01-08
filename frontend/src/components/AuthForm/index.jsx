import styles from './authForm.module.css'
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../../actions/auth';
import { Navigate } from 'react-router-dom' 

function AuthForm(){

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    const registration = async(ev) => {
        ev.preventDefault()
        const formData = new FormData(ev.target.form);
        const result = await axios.post('/auth/registration', formData);
        setMessage(result.data.message);
        console.log(result);
    }

    const login = async(ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target.form);
        setIsLoading(true);
        const result = await axios.post('/auth/login', formData);
        console.log(result.data);
        setMessage(result.data.message);
        setAccessToken(result.data.accessToken, dispatch);
        setIsLoading(false);
    
        console.log('Проверяем аксесс токен после авторизации', accessToken)
    }

    return(
        <>
        {accessToken ? <Navigate to={'/tasks/all'} /> :
        <div className={styles.auth_container}>
            {!isLoading
            ?
            <div className={styles.auth_block}>
                
                <div className={styles.auth_head}>
                    Авторизуйтесь или зарегистрируйтесь
                </div>
                <div>
                    <form action="">
                        <div><input className={styles.auth_form_input} type="text" name="email" placeholder='Введите email'/></div>
                        <div><input className={styles.auth_form_input} type="password" name="password" placeholder='Введите пароль'/></div>
                        <div className={styles.auth_form_buttons}>
                            <button type='button' className={`${styles.auth_btn}`} onClick={(ev) => login(ev)}>Авторизация</button>
                            <button type='button' className={`${styles.auth_btn}`} onClick={(ev)=>registration(ev)}>Регистрация</button>
                        </div>
                        <div>{message}</div>
                    </form>
                </div>

            </div>
            :
            <div>Загрузка...</div>
            }
            
        </div>
        }
        </>
    );

}

export default AuthForm;