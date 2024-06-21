import { loadStripe } from "@stripe/stripe-js";
// import CheckOutForm from "./../../../Components/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
	const { id } = useParams()
	
	const axiosPublic = useAxiosPublic()
	const { data: paymentCampData = [] } = useQuery({
		queryKey: ['paymentCamp'],
		queryFn: async () => {
			const res = await axiosPublic.get(`/paymentCampData/${id}`)
			return res.data;
		}

	})
	return (
		<div>
			{/* <PageHeader title="Payment" /> */}
			<div>
				<Elements stripe={stripePromise}>
					<CheckOutForm paymentCampData={paymentCampData} ></CheckOutForm>
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
