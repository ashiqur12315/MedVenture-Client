import {
    createBrowserRouter
  } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CampDetails from "../Pages/CampDetails/CampDetails";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Dashboard from "../Layout/Dashboard";
import OrganizerProfile from "../Pages/Dashboard/OrganizerProfile";
import AddACamp from "../Pages/Dashboard/AddACamp";
import ManageCamps from "../Pages/Dashboard/ManageCamps";
import UpdateCamp from "../Pages/Dashboard/UpdateCamp";
import ManageRegisteredCamps from "../Pages/Dashboard/ManageRegisteredCamps";
import Analytics from "../Pages/Dashboard/Analytics";
import RegisteredCamps from "../Pages/Dashboard/RegisteredCamps";
import Payment from "../Pages/Dashboard/Payment";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
        {
          path: '/campData/:id',
          element: <CampDetails></CampDetails>,

        },
        {
          path: '/availableCamps',
          element: <AvailableCamps></AvailableCamps>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        // Admin Routes
        {
          index: 'true',
          element: <OrganizerProfile></OrganizerProfile>
        },
        {
          path: 'addACamp',
          element: <AddACamp></AddACamp>
        },
        {
          path: 'manageCamps',
          element: <ManageCamps></ManageCamps>
        },
        {
          path: 'updateCamp/:id',
          element: <UpdateCamp></UpdateCamp>,
          loader: ({params})=> fetch(`https://medventure-server.vercel.app/campData/${params.id}`)
        },
        {
          path: 'manageRegisteredCamps',
          element: <ManageRegisteredCamps></ManageRegisteredCamps>
        },

        // Participant routes
        
        {
          path: 'analytics',
          element: <Analytics></Analytics>
        },
        {
          path: 'registeredCamps',
          element: <RegisteredCamps></RegisteredCamps>
        },
        {
          path: 'payment/:id',
          element: <Payment></Payment>
        }
      ]
    }
  ]);