import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";


const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()

    const { data: payments = [] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentHistory/${user.email}`)
            return res.data
        }
    })


    const [search, setSearch] = useState('')

    const { data: searchPayment = [], isLoading: searchCampLoading, refetch: reload } = useQuery({
        queryFn: () => getData(),
        queryKey: ['search', search],
        // enabled: false
    })
    const getData = async () => {
        // const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/search-job?search=${search}`)
        const { data } = await axiosSecure.get(`/search-payment/${user.email}?search=${search}`)
        return data
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget)
        const search = form.get('search')
        setSearch(search)
        await reload();
    };





    return (
        <div>
            <SectionTitle heading='Your Registered Camp Payments History'></SectionTitle>
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
                        Search {searchPayment.length}
                    </button>
                </form>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Camp Name</th>
                            <th>Fees</th>
                            <th>Transaction Id</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((p, index) => <tr key={p._id}>
                                <th>{index + 1}</th>
                                <td>{p.camp_name}</td>
                                <td>{p.fee}</td>
                                <td>{p.transactionId}</td>
                                <td>{p.payment_status}</td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;