import moment from 'moment';
import axios from 'axios'; 
import styles from './taskItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setTasks } from '../../actions/tasks';
import { getTasks } from '../../controllers/taskController';
import { updateRefresh } from '../../controllers/authController';
import { setAccessToken } from '../../actions/auth';
import ModalWindow from '../ModalWindow';
import EditTaskForm from '../EditTaskForm'

function TaskItem({ task }){

    const dispatch = useDispatch();
    const urlParams = useSelector((state) => state.tasks.urlParams);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [isModal, setIsModal] = useState(false);
    const [isModified, setIsModified] = useState(false);
    
    
  
    console.log('shopen', task.taskName);
    console.log('shopen', task._id);

    // function to make task done
    const doneTask = async(ev, id) => {
        const data = {
            id: id, 
            isDone: true
        };
        const result = await axios.post('/tasks/change', data, { headers: {"Authorization" : `Bearer ${accessToken}`}});

        if(result.data.status === 401){
            const isAccess = await updateRefresh();
            //console.log('что нам приходит в исАксесс после рефреша ---', isAccess)
            setAccessToken(isAccess, dispatch);

            if(isAccess){
                const isDoneTask = await axios.post('/tasks/change', data, { headers: {"Authorization" : `Bearer ${isAccess}`}});
                //console.log('Успешно ли задача стала сделанной', isDoneTask)

                const tasks = await getTasks(urlParams, isAccess);
                // console.log('we get data from back after add task', tasks)
                setTasks(tasks, dispatch); 
                // console.log('Смотрим что получили после обновления аксесс токена ----', result.data)
            }
            return;
        }

        if(result.data.status === 200){
            const tasks = await getTasks(urlParams, accessToken);
            // console.log('we get data from back', tasks)
            setTasks(tasks, dispatch); 
        }
          
    };

   



    //function for deleting task
    const deleteTask = async(id) => {
        const result = await axios.get('/tasks/delete/' + id, { headers: {"Authorization" : `Bearer ${accessToken}`}});
        // console.log(result);

        if(result.data.status === 401){
            const isAccess = await updateRefresh();
            // console.log('что нам приходит в исАксесс после рефреша ---', isAccess)
            setAccessToken(isAccess, dispatch);

            if(isAccess){
                const isDeleteTask = await axios.get('/tasks/delete/' + id, { headers: {"Authorization" : `Bearer ${isAccess}`}});
                // console.log('Успешно ли удалилась задача', isDeleteTask)

                const tasks = await getTasks(urlParams, isAccess);
                // console.log('we get data from back after add task', tasks)
                setTasks(tasks, dispatch); 
                // console.log('Смотрим что получили после обновления аксесс токена ----', result.data)
            }
            return;
        }


        if(result.data.status === 200){
            const tasks = await getTasks(urlParams, accessToken);
            // console.log('we get data from back after delete', tasks)
            setTasks(tasks, dispatch); 
        }
    };

    return(
        <>
        
            {isModified 
            ?
            <li className={styles.task_item} key={task._id} >
                <EditTaskForm task={ task } setIsMod={setIsModified} />
            </li>
            :
            <li className={styles.task_item} key={task._id} onClick={() => setIsModal(true)}>
                <div className={styles.task_info}>
                    <div className={styles.task_name}>{task.taskName}</div>
                    <div className={styles.task_buttons} onClick={(ev) => ev.stopPropagation()}>
                        <div className={styles.task_done}  onClick={() => setIsModified(true)}>
                            <img src="/icons/edit.svg" width="20px" height="20px" alt=''/>
                        </div>
                        <div className={styles.task_done} onClick={(ev) => doneTask(ev, task._id)} >
                            <img src="/icons/free-icon-font-check.svg" width="20px" height="20px" alt=''/>
                        </div>
                        <div className={styles.task_del} onClick={() => deleteTask(task._id)} >
                            <img src="/icons/free-icon-font-trash.svg" width="20px" height="20px" alt=''/>
                        </div>
                    </div>
                </div>
                <div className={styles.task_categ_prior}>
                    {task.expireDate 
                        ? 
                        <div className={(Number(Date.parse(task.expireDate)) < Number(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()))) ? `${styles.task_exp_date} ${styles.task_exp_date_exp}` : styles.task_exp_date}>
                            {moment(task.expireDate).format('DD-MM-YYYY')}
                        </div> 
                        :
                        ''
                    }
                    {task.priority ? <div className={styles.task_priority}>{task.priority.priority}</div> : ''}
                    {task.category ? <div className={styles.task_category}># {task.category.categoryName}</div> : ''}
                </div>
            </li>
            }
       
        <ModalWindow active={isModal} setActive={setIsModal}>
            
            <div>{task.taskName}</div>
            <div>{task.priority ? <div className={styles.task_priority}>{task.priority.priority}</div> : ''}</div>
        </ModalWindow>
        </>
    );
};

export default TaskItem;