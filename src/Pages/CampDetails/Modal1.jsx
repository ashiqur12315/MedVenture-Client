import { useContext, useRef } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";


const Modal1 = ({ camp }) => {
    const { _id } = camp;
    // const { user } = useContext(AuthContext)
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate()
    // const check = () => {
    //     const isSameEmail = job?.employer_email === user?.email
    //     if (isSameEmail) return toast.error('not permitted')
    // }
    // const {
    //     _id, job_banner, job_title, employer_name, employer_email, job_category, job_description, min_salary, max_salary, job_posting_date, application_deadline, job_applicants_number
    // } = job;
    const modalRef = useRef(null);

    const handleAppliedJobs = e => {

        e.preventDefault()

        const form = new FormData(e.currentTarget);
        const name = form.get('name')
        const fees = parseFloat(form.get('fees'))
        const location = form.get('location')
        const healthcareProfessional = form.get('healthcareProfessional')
        const participant_name = form.get('participant_name')
        // const participant_name = form.get('participant_name')
        const participant_email = form.get('participant_email')
        const participant_age = form.get('participant_age')
        const participant_phone = form.get('participant_phone')
        const participant_gender = form.get('participant_gender')
        const participant_emergencyContact = form.get('participant_emergencyContact')

        const participant_details = {
            participant_name,
            participant_email,
            participant_age,
            participant_phone,
            participant_gender,
            participant_emergencyContact,
            name,
            fees,
            location,
            healthcareProfessional
        }
        console.log(participant_details)

        axiosSecure.post('/joinCamp', participant_details)
            .then(res => {
                if (res.data.insertedId) {
                    // navigate('/appliedJobs')
                    toast.success('Your application has been submitted.')

                    // update the no of job applicants
                    mutateAsync({ _id })


                }
            })
            .catch(error => console.error(error))
    }

    const { mutateAsync } = useMutation({
        mutationFn: async ({ _id }) => {
            const { data } = await axiosSecure.patch(`/participantCount/${_id}`)
            // console.log(data)
        },
        onSuccess: () => {
            // toast.success('data incremented successfully')
            modalRef.current.close();
            Swal.fire({
                title: "You have Successfully Joined the camp!",
                text: "Go to Dashboard and make payment to complete registration",
                icon: "success"
              });
        }
    })


    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-success btn-outline w-full" onClick={() => modalRef.current.showModal()}>Join Camp</button>
            <dialog id="my_modal_4" className="modal " ref={modalRef}>
                <div className="modal-box w-11/12 max-w-5xl">

                    {/* form */}
                    <section className="p-6 dark:bg-gray-100 dark:text-gray-900">
                        <form onSubmit={handleAppliedJobs} className="container flex flex-col mx-auto space-y-12">

                            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50 border-2 border-blue-400">

                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-4">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="username" className="text-sm">Camp Name</label>
                                        <input type="text" name="name" readOnly defaultValue={camp.name} className="w-full p-2 border rounded-md  focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-sm">Camp Fees</label>
                                        <input type="number" name='fees' readOnly defaultValue={camp.fees} className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-sm">Location</label>
                                        <input name='location' readOnly defaultValue={camp.location} className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></input>
                                    </div>
                                    <div className="col-span-full sm:col-span-3 ">
                                        <label className="text-sm">Healthcare Professional</label>
                                        <input name='healthcareProfessional' readOnly defaultValue={camp.healthcareProfessional} className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></input>
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="username" className="text-sm">Your Name</label>
                                        <input type="text" name="participant_name" readOnly defaultValue={user?.displayName} className="w-full p-2 border rounded-md  focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-sm">E-mail</label>
                                        <input type="text" name='participant_email' readOnly defaultValue={user?.email} className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-sm">Age</label>
                                        <input name='participant_age' required type="number" className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></input>
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-sm">Phone Number</label>
                                        <input name='participant_phone' required type="tel" className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></input>
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-gray-700 dark:text-gray-200" >Gender</label>
                                        <select className="w-full py-2 border" name="participant_gender">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-span-full sm:col-span-3">
                                        <label className="text-sm">Emergency Contact</label>
                                        <input name='participant_emergencyContact' required type="tel" className="w-full p-2 border rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></input>
                                    </div>
                                    <div className="col-span-full">
                                        <input type="submit" className="btn btn-success btn-outline w-full" value="Confirm & Join Camp" />
                                    </div>

                                </div>
                            </fieldset>
                        </form>
                    </section>



                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Modal1;