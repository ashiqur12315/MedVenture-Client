import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Components/Shared/SectionTitle";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


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

    const [search, setSearch] = useState('')
    const axiosPublic = useAxiosPublic()

    const { data: searchCamp = [], isLoading: searchCampLoading, refetch: reload } = useQuery({
        queryFn: () => getData(),
        queryKey: ['searchCamp', search],
        // enabled: false
    })
    const getData = async () => {
        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/search-job?search=${search}`)
        const { data } = await axiosPublic.get(`/search-camp-reg?search=${search}`)
        return data
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const search = form.get('search')
        setSearch(search)
        await reload();
    };
    console.log(searchCamp)

    return (
        <div>
            <SectionTitle heading='Manage All Users Registered Camps'></SectionTitle>
            <div>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        name="search"

                    />
                    <button type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    // onClick={handleSearch}
                    >
                        Search
                    </button>
                </form>
            </div>
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
                                    {
                                        search.length > 0 ?
                                            <>

                                                {searchCampLoading ? <span className="loading loading-spinner text-info"></span> :
                                                    searchCamp.map((p, index) => <tr key={p._id}>
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
                                                                (p.payment_status && p.confirmation_status) ?
                                                                    <button disabled className="btn btn-warning">Cancel</button>
                                                                    :
                                                                    <button onClick={() => handleCancel(p._id)} className="btn btn-warning">Cancel</button>

                                                            }
                                                        </td>

                                                    </tr>)
                                                }

                                            </>
                                            :
                                            <>
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
                                                                (p.payment_status && p.confirmation_status) ?
                                                                    <button disabled className="btn btn-warning">Cancel</button>
                                                                    :
                                                                    <button onClick={() => handleCancel(p._id)} className="btn btn-warning">Cancel</button>

                                                            }
                                                        </td>

                                                    </tr>)
                                                }
                                            </>
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