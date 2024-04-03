import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styles from './sidebarFilter.module.css';
import ModalWindow from '../ModalWindow';
import { setCategories } from '../../actions/categories';


function SidebarFilter(props){
    const [isModal, setIsModal] = useState(false);
    const accessToken = useSelector((state)=> state.auth.accessToken);
    const dispatch = useDispatch();

    console.log('Получаем категории', props.filterItems)
    console.log('Получаем таски', props.tasks)
    console.log('Получаем тип', props.filterType)


const compare = (tasks, categories, type) => {

    if(type === 'date'){
        categories.forEach((item) => {
            if(item._id === ''){
                item.qty = tasks.length;
            }
            if(item._id === 'previous'){
                let arr = [];
                tasks.forEach((task) => {
                    if(task.expireDate 
                        && 
                        (Number(Date.parse(task.expireDate)) < Number(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())))){
                        arr.push(task);
                    }
                });
                item.qty = arr.length;
                console.log(item)
            }
            if(item._id === 'today'){
                let arr = [];
                tasks.forEach((task) => {
                    if(task.expireDate 
                        && 
                        (Number(Date.parse(task.expireDate)) > Number(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())))
                        &&
                        (Number(Date.parse(task.expireDate)) 
                        < 
                        Number(
                            new Date(new Date().getFullYear(), 
                            new Date().getMonth(), 
                            new Date().getDate(), 
                            new Date().getHours('23'), 
                            new Date().getMinutes('59'), 
                            new Date().getSeconds('59')
                        ))
                        )){
                        arr.push(task);
                    }
                });
                item.qty = arr.length;
                console.log(item)
            }
            if(item._id === 'future'){
                let arr = [];
                tasks.forEach((task) => {
                    if(task.expireDate 
                        && 
                        (Number(Date.parse(task.expireDate)) 
                        > 
                        Number(
                            new Date(new Date().getFullYear(), 
                            new Date().getMonth(), 
                            new Date().getDate(), 
                            new Date().getHours('23'), 
                            new Date().getMinutes('59'), 
                            new Date().getSeconds('59')
                        ))
                        )){
                        arr.push(task);
                    }
                });
                item.qty = arr.length;
                console.log(item)
            }
        });
    }else if(type === 'categoryName'){
        categories.forEach((item) => {
            let arr = [];
            tasks.forEach((task) => {
                if(task.category){
                    if(task.category._id === item._id){
                        arr.push(task);
                    }
                }
            });
            item.qty = arr.length;
        });
    }else if(type === 'priority'){
        categories.forEach((item) => {
            let arr = [];
            tasks.forEach((task) => {
                if(task.priority){
                    if(task.priority._id === item._id){
                        arr.push(task);
                    }
                }
            });
            item.qty = arr.length;
        });
    }

};

const addCategory = async(ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const result = await axios.post('/category/add', formData, { headers: {"Authorization" : `Bearer ${accessToken}`}});
    if(result.data.status === 200){
        const res = await axios.get('/category/list', { headers: {"Authorization" : `Bearer ${accessToken}`}});
        setCategories(res.data, dispatch); 
        setIsModal(false)
    }
    
};

compare(props.tasks, props.filterItems, props.filterType);

    return (
        <div className={styles.filter}>
            {props.filterName 
                ? 
                <div className={styles.filter_head}>
                    <div>{props.filterName}</div>
                    {props.filterType === 'categoryName'
                    &&
                    <button type="button" className={styles.filter_add_category} onClick={() => setIsModal(true)}>+</button>
                    }
                </div>
                :
                ''
            }
            <ModalWindow active={isModal} setActive={setIsModal}>
                <div>Добавить категорию</div>
                <form onSubmit={(ev) => addCategory(ev)} >
                    <input type="text" name="categoryName" placeholder='Введите название категории...'/>
                    <button type='submit'>Добавить</button>
                </form>
            </ModalWindow>
                
                <div className={styles.filter_list}>
                    {props.filterItems.map(item => 
                        <li key={item._id} className={styles.filter_item}>
                            <NavLink 
                                to={item._id ? `/tasks/${props.filterType}/${item._id}` : `/tasks/all`} 
                                className={({isActive}) => isActive ? styles.filter_item_current : ''}  >
                                {item[props.filterType]}
                                {item.qty ? <div className={styles.filter_qty}>{item.qty}</div> : ''}
                            </NavLink>
                        </li>    
                    )}
                </div>
            </div>
    );
}

export default SidebarFilter;