import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {

    const axiosSecure = useAxiosSecure()

    const { data: userProfile = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userProfile/${user.email}`)
            return res.data;
        }
    })


    const { logOut, user, loading } = useContext(AuthContext)
    const handleSignOut = () => {
        logOut()
            .then(() => {
                axios('${import.meta.env.VITE_API_URL}/logout', { withCredentials: true })
            })
            .catch(error => {
                console.error(error)
            })
    }
    const navlinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/availableCamps'>Available Camps</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown ">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-green-200 rounded-box w-52 border-2">
                        {navlinks}
                    </ul>
                </div>
                {/* <a className="btn btn-ghost text-xl ">ArtCraftopia</a> */}


                <Link className=" text-xl"><div className="flex items-center justify-center"><img className="h-10" src={'/medlogo.png'} alt="" /><img className="h-10" src={'/med.png'} alt="" /></div></Link>


            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navlinks}
                </ul>
            </div>

            <div className="navbar-end">



                {
                    loading ? (
                        // Show loading spinner while data is loading
                        <div><span className="loading loading-infinity loading-lg"></span></div>
                    ) : user ? (
                        // Show user data when available
                        <>

                            <div className="dropdown dropdown-bottom dropdown-end z-10 ">
                                <div tabIndex={10} role="button" className="btn btn-circle m-1">
                                    <div className="btn btn-ghost btn-circle avatar flex">
                                        <div className={`w-10 rounded-full hover:${user.displayName}`}>

                                            <img src={userProfile?.image || user.photoURL} data-tooltip-id="my-tooltip" data-tooltip-content={userProfile?.name || user.displayName} alt="User Avatar" />
                                        </div>
                                    </div>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] border-2 border-sky-200 menu space-y-2 p-2 shadow bg-base-100 rounded-box w-52">
                                    <li className="p-2 text-center">{userProfile?.name || user.displayName}</li>
                                    <li><Link className=" btn btn-outline btn-accent" to='dashboard'>Dashboard</Link></li>
                                    <li><button className="btn btn-outline btn-accent" onClick={handleSignOut}>Logout</button></li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        // Show login button if no user is logged in
                        <>
                            <div className="flex gap-2">
                                <Link className="btn  btn-info hover:border-blue-500" to='/login'>Join Us</Link>

                            </div>
                        </>
                    )
                }
                {/* {
                    loading ? (
                        // Show loading spinner while data is loading
                        <div><span className="loading loading-infinity loading-lg"></span></div>
                    ) : user ? (
                        // Show user data when available
                        <>

                            <div className="btn btn-ghost btn-circle avatar flex">
                                <div className={`w-10 rounded-full hover:${user.displayName}`}>

                                    <img src={user.photoURL} data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName} alt="User Avatar" />
                                </div>
                            </div>
                            <button className="btn btn-outline btn-accent" onClick={handleSignOut}>Logout</button>
                        </>
                    ) : (
                        // Show login button if no user is logged in
                        <>
                            <div className="flex gap-2">
                                <Link className="btn btn-outline btn-success" to='/login'>Login</Link>

                            </div>
                        </>
                    )
                } */}





            </div>
        </div>
    );
};

export default Navbar;