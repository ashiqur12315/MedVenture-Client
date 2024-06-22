import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { data } from "autoprefixer";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const Register = () => {
    const { createUser, updateUserProfile, setOn, signInWithGoogle } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [registerError, setRegisterError] = useState('');
    const [show, setShow] = useState(false);
    const { register, handleSubmit, reset } = useForm();


    const onSubmit = async (data) => {
        // e.preventDefault();

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {

            // const form = new FormData(e.currentTarget)
            const email = data.email
            const name = data.name
            const photo = res.data.data.display_url
            const password = data.password
            // console.log(name, email, photo, password)

            if (password.length < 6) {
                setRegisterError('Your password should be at least 6 characters')
                toast.error('Your password should be at least 6 characters', { duration: 4000 })
                return;
            }
            else if (!/[A-Z]/.test(password)) {
                setRegisterError('Your password should have at least one uppercase character.');
                toast.error('Your password should have at least one uppercase (A-Z) character.', { duration: 4000 })
                return;
            }
            else if (!/[a-z]/.test(password)) {
                setRegisterError('Your password should have at least one lowercase character.');
                toast.error('Your password should have at least one lowercase (a-z) character.', { duration: 4000 })
                return;
            }

            // creating a user 
            createUser(email, password)
                .then(result => {
                    // console.log(result.user)
                    navigate('/');
                    toast.success('You have been Registered Successfully', { duration: 4000 })
                    updateUserProfile(name, photo)
                        .then(() => {
                            setOn(true);
                            const userInfo = {
                                name: name,
                                email: email
                            }
                            axiosPublic.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        // alert('user created successfully')
                                        Swal.fire({
                                            position: "top-end",
                                            icon: "success",
                                            title: "Your have been successfully registered",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        navigate('/');
                                    }
                                })

                        })
                })
                .catch(() => toast.error('E-mail already in use.', { duration: 4000 }))
        }

    }
    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                // console.log(result.user)
                const userInfo = {
                    email: result.user.email,
                    name: result.user.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                toast.success('You have Successfully Signed In with Google', { duration: 4000 });
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => toast.error('Unable to sign in with Google', { duration: 4000 }))
    }
    return (
        <div>
            {/* <Helmet><title>Register</title></Helmet> */}
            <div>
                <h2 data-aos="fade-left" data-aos-duration="2000" className="text-3xl text-center my-5">Please Register!</h2>
                <form data-aos="flip-left" data-aos-duration="2000" onSubmit={handleSubmit(onSubmit)} className="lg:w-1/2 md:w-3/4 px-5 mx-auto">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" {...register("name")} placeholder="Enter your full name." className="input input-bordered focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">E-mail</span>
                        </label>
                        <input type="email" {...register("email")} placeholder="Enter a valid E-mail address" className="input input-bordered focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600" required />
                    </div>


                    <div className="form-control">
                        <label className="label relative">
                            <span className="label-text">Password</span>

                        </label>
                        <input type={show ? "text" : "password"} placeholder="Enter a strong Password" {...register("password")} className="input input-bordered relative focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600" required />
                        <div className="relative">
                            <span className="absolute right-3 -top-8 text-xl" onClick={() => setShow(!show)}>
                                {
                                    show ? <FaEyeSlash /> : <FaEye />
                                }</span>
                        </div>
                    </div>
                    {
                        registerError && <><p className="text-red-600 font-bold">{registerError}</p> </>
                    }
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Profile Image</span>
                        </label>
                        <input type="file" {...register("image")} required className="my-2 file-input file-input-bordered file-input-xs w-full max-w-xs" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-xl">Register</button>
                    </div>
                </form>
                <p data-aos="fade-up" data-aos-duration="2000" className="text-center mt-4 text-2xl">Already have an account? <Link to='/login' className="text-blue-600 font-bold">Login</Link></p>

                {/* ____________Sign in with social account______________ */}
                <div className="divider divider-info">Or</div>

                <div data-aos="fade-up" data-aos-duration="2000"
                    className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-xl text-center dark:text-gray-600"> Sign in with social accounts</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4 ">
                    <button data-aos="fade-right" data-aos-duration="2000" onClick={handleSignInWithGoogle} aria-label="Log in with Google" className="p-3 rounded-sm ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-10 h-10 fill-blue-500">
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>


                </div>

            </div>
        </div>
    );
};

export default Register;