import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* Dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard'>Organizer Profile</NavLink></li>
                            <li><NavLink to='addACamp'>Add A Camp</NavLink></li>
                            <li><NavLink to='manageCamps'>Manage Camps</NavLink></li>
                            <li><NavLink to='manageRegisteredCamps'>Manage Registered Camps</NavLink></li>
                            <div className="divider"></div>
                            <li><NavLink to='/'>Home</NavLink></li>

                        </>
                        :
                        <>
                            <li><NavLink to='/dashboard'>Participant Profile</NavLink></li>                            
                            <li><NavLink to='analytics'>Analytics</NavLink></li>
                            <li><NavLink to='registeredCamps'>Registered Camps</NavLink></li>
                            <li><NavLink to='paymentHistory'>Payment History</NavLink></li>
                            <div className="divider"></div>
                            <li><NavLink to='/'>Home</NavLink></li>
                        </>
                    }


                </ul>
            </div>
            {/* dashboard Content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;