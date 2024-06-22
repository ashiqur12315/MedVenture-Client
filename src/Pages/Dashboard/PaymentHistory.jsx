import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Components/Shared/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";


const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure();
    const {user} = useAuth()

    const {data: payments = []} = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/paymentHistory/${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <SectionTitle heading='Your Registered Camp Payments History'></SectionTitle>
            {payments.length}
        </div>
    );
};

export default PaymentHistory;