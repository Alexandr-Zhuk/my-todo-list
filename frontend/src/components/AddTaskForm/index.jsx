import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import styles from './addTaskForm.module.css';
import { setTasks } from '../../actions/tasks'; 

function AddTaskForm({ closeForm }){

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categoryList);
    const priorities = useSelector((state) => state.priorities.priorityList);
    const [isLoading, setIsLoading] = useState(false);

    const addTask = async(ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        setIsLoading(true)
        const result = await axios.post('/tasks/add', formData);
        setTasks(result.data, dispatch)
        console.log(result.data);
        setIsLoading(false)
    };

    return (
        <div>
            {isLoading 
                ? 
                <div>
                    <svg width="58" height="58" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#ff0000" fill-rule="evenodd">
                        <g transform="translate(2 1)" stroke="#FFF" stroke-width="1.5">
                        <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill="#ff0000">
                            <animate attributeName="fill-opacity"
                                begin="0s" dur="1.3s"
                                values="1;0;0;0;0;0;0;0" calcMode="linear"
                                repeatCount="indefinite" />
                        </circle>
            <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;1;0;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;1;0;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;1;0;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;1;0;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;1;0;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;1;0" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
            <circle cx="27" cy="5" r="5" fillOpacity="0" fill="#ff0000">
                <animate attributeName="fill-opacity"
                     begin="0s" dur="1.3s"
                     values="0;0;0;0;0;0;0;1" calcMode="linear"
                     repeatCount="indefinite" />
            </circle>
        </g>
    </g>
</svg>
                </div>
                :
                <form action="" className={styles.add_task} onSubmit={addTask}>
                    <input type="text" placeholder="Название задачи" name="taskName" className={styles.task_name_add}/>
                        <br/><input type="date" name="expireDate" className={styles.choose_date}/>
                        <select className={styles.category_list} name="category">
                            <option disabled selected value="">Выберите категорию</option>
                            {categories.map((item) => <option value={item._id}>{item.categoryName}</option>)}
                        </select>
                        <select className={styles.priority_list} name="priority">
                            <option disabled selected value="">Выберите приоритетность</option>
                            {priorities.map((item) => <option value={item._id}>{item.priority}</option>)}
                        </select>
                        <div className={styles.buttons_form_add_task}>
                            <button type="button" className={styles.cancel_btn} onClick={closeForm} >Отмена</button>
                            <button type="submit" className={styles.send_task}>Добавить задачу</button>
                        </div>
                    
                </form>
                
                }
                
            
        </div>
    );
};

export default AddTaskForm;