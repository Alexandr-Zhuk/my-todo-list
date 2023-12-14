import styles from './mainContent.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import TaskList from '../../components/TaskList';
import { setTasks } from '../../actions/tasks';
import AddTaskForm from '../../components/AddTaskForm';
import { setUrlParams } from '../../actions/tasks';
import { getTasks } from '../../controllers/taskController';


function MainContent(){
const dispatch = useDispatch();
const [isActiveAddForm, setIsActiveAddForm] = useState(false);
const categories = useSelector((state)=> state.categories.categoryList);
const priorities = useSelector((state)=> state.priorities.priorityList);
const urlParams = useSelector((state)=> state.tasks.urlParams)
const [titlePage, setTitlePage] = useState('');
const params = useParams();


/*
1. получаем данные из урл
2. записываем эти данные в стейт
3. при изменении этого стейта запускаем обработчик строки и получение заданий и тайтла
4.




const getTasks = async() => {
    const getParams = urlParams;
    let url = '/tasks/list';
    function isEmpty(obj) {
        for (let key in obj) {
          return false;
        }
        return true;
      }
    const len = isEmpty(getParams);
    if(!len){
        url += `?${getParams.filterName}=${getParams.filterId}`;
    }
    const result = await axios.get(url);
    return result.data;
   
    
};

*/
const addTaskToRedux = async() => {
    const result = await getTasks(urlParams);
    setTasks(result, dispatch);
};


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