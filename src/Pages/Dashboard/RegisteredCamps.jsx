import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../Components/Shared/SectionTitle";
import FeedbackRating from "./FeedbackRating";


const RegisteredCamps = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: registeredCamps = [], isPending: loading, refetch } = useQuery({
        queryKey: ['registeredCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userRegisteredCamps/${user.email}`)
            return res.data;
        }
    })
    // console.log(registeredCamps)
    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cancelCamp/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Registration has been canceled",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <SectionTitle heading='All Registered Camps'></SectionTitle>
            {
                loading ? <span className="loading loading-spinner text-info"></span>
                    :
                    <>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Camp Name</th>
                                        <th>Camp Fee</th>
                                        <th>Participant Name</th>
                                        <th>Payment Status</th>
                                        <th>Confirmation Status</th>
                                        <th>Cancel</th>
                                        <th>Feedback</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? <span className="loading loading-spinner text-info"></span> :
                                        registeredCamps.map((p) => <tr key={p._id}>
                                            <th>{p.name}</th>
                                            <td>{p.fees}</td>
                                            <td>{p.participant_name}</td>
                                            <td>
                                                {p.payment_status ? 'Paid' : <Link to={`/dashboard/payment/${p._id}`}>
                                                    <button className="btn btn-success">Pay</button>
                                                </Link>}
                                            </td>
                                            <td>{p.confirmation_status? p.confirmation_status : 'Pending'}</td>
                                            <td>{
                                                p.payment_status ? <button disabled className="btn btn-warning">Cancel</button> :
                                                    <button onClick={() => handleCancel(p._id)} className="btn btn-warning">Cancel</button>
                                            }</td>
                                            <td>{
                                                p.confirmation_status ? <FeedbackRating></FeedbackRating> :
                                                <button disabled className="btn btn-warning">Feedback</button>
                                            }</td>

                                        </tr>)
                                    }


                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </div>
    );
};

export default RegisteredCamps;