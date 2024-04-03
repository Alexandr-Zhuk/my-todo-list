import styles from './taskList.module.css';
import { useSelector } from 'react-redux';
import TaskItem from '../TaskItem'

function TaskList(){

    const tasks = useSelector((state) => state.tasks.tasksList);

    return (
        <div className={styles.task_list}>
            <ul className={styles.tasks_list_ul}>
                {tasks.map((item) => 
                    <TaskItem task={item}/>    
                )}
            </ul>
        </div> 
    );
}

export default TaskList;