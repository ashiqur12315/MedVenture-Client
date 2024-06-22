import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Components/Shared/SectionTitle";


const ManageRegisteredCamps = () => {

    const axiosSecure = useAxiosSecure();

    const { data: allParticipants = [], isPending: loading, refetch } = useQuery({
        queryKey: ['participants'],
        queryFn: async () => {
            const res = await axiosSecure.get('/participants')
            return res.data;
        }
    })

    const handleConfirmation = async (id) => {
        const res = await axiosSecure.patch(`/confirmationStatus/${id}`)
        if (res.data.modifiedCount > 0) {
            refetch()
        }

    }
    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "This user won't be able to join the camp",
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
                                text: "This user registration has been canceled",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <SectionTitle heading='Manage All Users Registered Camps'></SectionTitle>
            {
                loading ? <span className="loading loading-spinner text-info"></span>
                    :
                    <>
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Participant Name</th>
                                        <th>Camp Name</th>
                                        <th>Camp Fee</th>
                                        <th>Payment Status</th>
                                        <th>Confirmation Status</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? <span className="loading loading-spinner text-info"></span> :
                                        allParticipants.map((p, index) => <tr key={p._id}>
                                            <th>{p.participant_name}</th>
                                            <td>{p.name}</td>
                                            <td>{p.fees}</td>
                                            <td>{p.payment_status ? p.payment_status : 'Unpaid'}</td>

                                            <td>
                                                {
                                                    p.payment_status ? <>
                                                        {p.confirmation_status ? p.confirmation_status :

                                                            <button onClick={() => handleConfirmation(p._id)} className="btn  btn-success">Pending</button>

                                                        }
                                                    </> : 'pending'
                                                }

                                            </td>
                                            <td>
                                                {
                                                    (p.payment_status && p.confirmation_status)? 
                                                    <button disabled className="btn btn-warning">Cancel</button>
                                                    :
                                                    <button onClick={()=> handleCancel(p._id)} className="btn btn-warning">Cancel</button>
                                                    
                                                }
                                            </td>

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

export default ManageRegisteredCamps;