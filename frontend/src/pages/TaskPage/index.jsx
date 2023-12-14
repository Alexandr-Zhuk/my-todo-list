import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import LeftSidebar from "../../containers/LeftSidebar";
import MainContent from "../../containers/MainContent";
import MainMenu from "../../containers/MainMenu";
import styles from './taskPage.module.css';

function TaskPage (){

    
    return (
        
        <div className={styles.task_page}>
            <MainMenu/>

            <div className={styles.wrapper}>

                <Header/> 

                <div className={styles.main_content}>
                    <div className={styles.container}>
                        <LeftSidebar/>
                        <MainContent/>
                    </div>
                </div>

                <Footer/>

            </div>
        </div>


    );
}

export default TaskPage;