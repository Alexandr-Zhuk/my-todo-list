import styles from './leftSidebar.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../actions/categories';
import { setPriorities } from '../../actions/priorities';
import SidebarFilter from '../../components/SidebarFilter';
import { getTasks } from '../../controllers/taskController';
import { updateRefresh } from '../../controllers/authController'; 
import { setAccessToken } from '../../actions/auth';

function LeftSidebar(){

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categoryList);
    const priorities = useSelector((state) => state.priorities.priorityList);
    const accessToken = useSelector((state) => state.auth.accessToken);
    const tasks = useSelector((state) => state.tasks.tasksList);
    const [allTasks, setAllTasks] = useState([]);
    

    const getCategories = async()=>{
        const res = await axios.get('/category/list', { headers: {"Authorization" : `Bearer ${accessToken}`}});
        setCategories(res.data, dispatch); 
    }

    const getPriorities = async()=>{
        const res = await axios.get('/priority/list', { headers: {"Authorization" : `Bearer ${accessToken}`}});
        setPriorities(res.data, dispatch);
    }

    const dateFilter = [
        {_id: '', date: 'Все задачи'},
        {_id: 'today', date: 'На сегодня'},
        {_id: 'future', date: 'Предстоящие'},
        {_id: 'previous', date: 'Просроченные'}
    ];

    const zabon = async() => {
        const result = await getTasks({}, accessToken);
        if(result.status === 401){
            const res = await updateRefresh();
            console.log('get res', res)
            setAccessToken(res, dispatch);
            const result = await getTasks({}, res);
            setAllTasks(result);
            return;
        }
        console.log('get all', result)
        setAllTasks(result);
    }

    useEffect(() => {
        zabon();
        console.log('Выполнилось забон');
    }, [tasks]);
    
    //console.log('get in useEffect', getTasks({}, accessToken));
    useEffect(() => {
        getCategories();
        console.log('Выполнилось гетКатегориес');
        getPriorities();
        console.log('Выполнилось гетПриоритис');
    }, []);
    
    

    console.log('Что имеем в олТаскс', allTasks);
    return (
        <div className={styles.left_sidebar}>  
            <SidebarFilter filterType='date' filterItems={dateFilter} tasks={allTasks} />
            <SidebarFilter filterName='Категории:' filterType='categoryName' filterItems={categories} tasks={allTasks} />
            <SidebarFilter filterName='Приоритетность:' filterType='priority' filterItems={priorities} tasks={allTasks} />
        </div>
    );
}

export default LeftSidebar;