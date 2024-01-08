import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({isAuth}){
    return(
        <>
        {isAuth 
        ?
        <Outlet/>
        :
        <Navigate to='/auth' replace/>
        }
        </>
    );
}

export default ProtectedRoute;