import styles from './modalWindow.module.css';

function ModalWindow({active, setActive, children}){
    return(
        <div onClick={()=>setActive(false)} className={active ? styles.modal_window_full : styles.hidden}>
            <div onClick={ev => ev.stopPropagation()} className={styles.modal_window_content}>
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;