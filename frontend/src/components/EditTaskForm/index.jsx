import moment from 'moment';
import axios from 'axios'; 
import { updateRefresh } from '../../controllers/authController';
import { setAccessToken } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { setTasks } from '../../actions/tasks';
import { getTasks } from '../../controllers/taskController';
import styles from './editTaskForm.module.css'

function EditTaskForm ({ task, setIsMod }){
    const dispatch = useDispatch();
    const urlParams = useSelector((state) => state.tasks.urlParams);
    const categories = useSelector((state) => state.categories.categoryList);
    const priorities = useSelector((state) => state.priorities.priorityList);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [taskForChange, setTaskForChange] = useState(task.taskName);
    const [dateForChange, setDateForChange] = useState(moment(task.expireDate).format('yyyy-MM-DD'));

     //function for changing task
     const changeTask = async(ev, id, accessToken) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        // console.log(ev.target)
        
        formData.append('id', id);
        // console.log(formData.get('id'))
        const result = await axios.post('/tasks/change', formData, { headers: {"Authorization" : `Bearer ${accessToken}`}});

        if(result.data.status === 200){

            const tasks = await getTasks(urlParams, accessToken);

            setTasks(tasks, dispatch); 
            setIsMod(false);
            return;
        }

        if(result.data.status === 401){
            const isAccess = await updateRefresh();
            setAccessToken(isAccess, dispatch);

            if(isAccess){
                changeTask(ev, id, isAccess);

            }
        }  
    }

    return (
        <form action="" className={styles.add_task} 
                    onClick={(ev) => ev.stopPropagation()}
                    onSubmit={(ev) => changeTask(ev, task._id, accessToken)}
                >
                    <input type="text" placeholder="Название задачи" name="taskName" value={taskForChange} onChange={(ev) => setTaskForChange(ev.target.value)} />
                        <br/><input type="date" name="expireDate" className={styles.choose_date} value={dateForChange ? dateForChange : ''} onChange={(ev) => setDateForChange(ev.target.value)}/>
                        <select className={styles.category_list} name="category">
                            <option disabled selected value="">Выберите категорию</option>
                            {categories.map((item) => 
                                <option 
                                    selected={task.category && task.category._id === item._id ? true : false} 
                                    value={item._id}
                                >
                                    {item.categoryName}
                                </option>
                                )
                            }
                        </select>
                        <select className={styles.priority_list} name="priority">
                            <option disabled selected value="">Выберите приоритетность</option>
                            {priorities.map((item) => 
                                <option selected={task.priority && task.priority._id === item._id ? true : false} value={item._id}>{item.priority}</option> 
                            )
                            }
                        </select>
                        <div className={styles.buttons_form_add_task}>
                            <button type="button" className={styles.cancel_btn} onClick={() => setIsMod(false)} >Отмена</button>
                            <button type="submit" className={styles.send_task} >Изменить задачу</button>
                        </div>
                </form>
    );
}

export default EditTaskForm;