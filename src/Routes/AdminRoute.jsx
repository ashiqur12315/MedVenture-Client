import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading){
        return <progress className="progress progress-success w-56" value="100" max="100"></progress>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to='/' state={{from: location}}></Navigate>
};

export default AdminRoute;