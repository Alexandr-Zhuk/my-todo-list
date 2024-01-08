import styles from './mainContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import TaskList from '../../components/TaskList';
import { setTasks } from '../../actions/tasks';
import AddTaskForm from '../../components/AddTaskForm';
import { setUrlParams } from '../../actions/tasks';
import { getTasks } from '../../controllers/taskController';
import { setAccessToken } from '../../actions/auth';


function MainContent(){
const dispatch = useDispatch();
const [isActiveAddForm, setIsActiveAddForm] = useState(false);
const categories = useSelector((state)=> state.categories.categoryList);
const priorities = useSelector((state)=> state.priorities.priorityList);
const urlParams = useSelector((state)=> state.tasks.urlParams)
const accessToken = useSelector((state) => state.auth.accessToken);
const [titlePage, setTitlePage] = useState('');
const params = useParams();

const addTaskToRedux = async() => {
    const result = await getTasks(urlParams, accessToken);
    if(result.status === 401){
        await updateRefresh();
        return;
    }
    setTasks(result, dispatch);
};

const updateRefresh = async() => {
    const response = await axios.get('/auth/refresh');
        if(response.data.status === 401){
            console.log('У нас с рефреша пришел 401 статус');
            setAccessToken('', dispatch);
            return;
        }
    setAccessToken(response.data.accessToken, dispatch);
}

const analizeURL = () => {
    const hrefParts = params;
    let getParams = {};
    if(hrefParts){
        
        if(hrefParts.filter === 'categoryName'){
            getParams.filterName = 'category';
            getParams.filterId = hrefParts.id;
        }else if(hrefParts.filter === 'priority'){
            getParams.filterName = 'priority';
            getParams.filterId = hrefParts.id;
        }else if(hrefParts.filter === 'date'){
            getParams.filterName = 'date';
            getParams.filterId = hrefParts.id;
        }
        
    }
    console.log('Происходит анализ УРЛ');
    setUrlParams(getParams, dispatch);
} 

    const getTitle = () => {
        
        const getParams = urlParams;

        let title = 'Все задачи';
        if(getParams){
            if(getParams.filterName === 'category'){
                const res = categories.find((item) => item._id === getParams.filterId);
                title = res.categoryName;
                
            }
            if(getParams.filterName === 'priority'){
                const res = priorities.find((item) => item._id === getParams.filterId);
                title = res.priority;
            }
            if(getParams.filterName === 'date'){
                if(getParams.filterId === 'today'){
                    title = 'На сегодня';
                }
                else if(getParams.filterId === 'future'){
                    title = 'Предстоящие';
                }
                else if(getParams.filterId === 'previous'){
                    title = 'Просроченные';
                }
                else{
                    title = 'Все задачи';
                }
            }
            setTitlePage(title)
        }
    }


    useEffect(()=> {
        analizeURL();
    }, [params]);
    
    useEffect(()=> {
        addTaskToRedux();

        if(categories.length > 0){
            getTitle();
        }
        if(priorities.length > 0){
            getTitle();
        }
        
    }, [urlParams]);

    useEffect(() => {
        addTaskToRedux();
    }, [accessToken])


    return (
        <div className={styles.content}>
            <div className={styles.task_header}>
                {titlePage}
            </div>
            <TaskList/>
            {isActiveAddForm 
                ? 
                <AddTaskForm closeForm={()=>setIsActiveAddForm(false)}/> 
                : 
                <div className={styles.button_add_task}>
                    <button type="button" className={styles.button_add_task_item} onClick={()=>setIsActiveAddForm(true)}>+ Добавить задачу</button>
                </div>
            }
   
        </div>
    );
}



export default MainContent;