import styles from './sidebarFilter.module.css';
import { NavLink } from 'react-router-dom';

function SidebarFilter(props){

    return (
        <div className={styles.filter}>
            {props.filterName 
                ? 
                <div className={styles.filter_head}>
                    {props.filterName}
                </div>
                :
                ''
            }
                
                <div className={styles.filter_list}>
                    {props.filterItems.map(item => 
                        <li key={item._id} className={styles.filter_item}>
                            <NavLink 
                                to={item._id ? `/tasks/${props.filterType}/${item._id}` : `/tasks/all`} 
                                className={({isActive}) => isActive ? styles.filter_item_current : ''}  >
                                {item[props.filterType]}
                            </NavLink>
                        </li>    
                    )}
                </div>
            </div>
    );
}

export default SidebarFilter;