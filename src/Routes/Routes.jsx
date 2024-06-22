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
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ErrorPage from "../Components/Shared/ErrorPage";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage></ErrorPage>,
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
          element: <CampDetails></CampDetails>

        },
        {
          path: '/availableCamps',
          element: <AvailableCamps></AvailableCamps>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        // Admin Routes
        {
          index: 'true',
          element: <PrivateRoute><OrganizerProfile></OrganizerProfile></PrivateRoute>
        },
        {
          path: 'addACamp',
          element: <AdminRoute><AddACamp></AddACamp></AdminRoute>
        },
        {
          path: 'manageCamps',
          element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>
        },
        {
          path: 'updateCamp/:id',
          element: <UpdateCamp></UpdateCamp>,
          loader: ({params})=> fetch(`${import.meta.env.VITE_API_URL}/campData/${params.id}`)
        },
        {
          path: 'manageRegisteredCamps',
          element: <AdminRoute><ManageRegisteredCamps></ManageRegisteredCamps></AdminRoute>
        },

        // Participant routes
        
        {
          path: 'analytics',
          element: <PrivateRoute><Analytics></Analytics></PrivateRoute>
        },
        {
          path: 'registeredCamps',
          element: <PrivateRoute><RegisteredCamps></RegisteredCamps></PrivateRoute>
        },
        {
          path: 'payment/:id',
          element: <PrivateRoute><Payment></Payment></PrivateRoute>
        },
        {
          path: 'paymentHistory',
          element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
        }
      ]
    }
  ]);