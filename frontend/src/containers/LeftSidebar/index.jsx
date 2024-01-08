import styles from './leftSidebar.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../actions/categories';
import { setPriorities } from '../../actions/priorities';
import SidebarFilter from '../../components/SidebarFilter';

function LeftSidebar(){

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categoryList);
    const priorities = useSelector((state) => state.priorities.priorityList);
    const accessToken = useSelector((state) => state.auth.accessToken);

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

    useEffect(() => {
        getCategories();
        getPriorities();
    }, []);

    return (
        <div className={styles.left_sidebar}>  
            <SidebarFilter filterType='date' filterItems={dateFilter} />
            <SidebarFilter filterName='Категории:' filterType='categoryName' filterItems={categories} />
            <SidebarFilter filterName='Приоритетность:' filterType='priority' filterItems={priorities} />
        </div>
    );
}

export default LeftSidebar;