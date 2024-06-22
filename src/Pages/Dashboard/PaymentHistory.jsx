import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


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
    return (
        <div>
            <SectionTitle heading='Your Registered Camp Payments History'></SectionTitle>
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