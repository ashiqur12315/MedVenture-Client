import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosPublic from '../../Hooks/useAxiosPublic';

const CheckOutForm = ({ paymentCampData }) => {
    
    const { user } = useAuth()
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    // const campFee = 75;
    // console.log(paymentCamp,campFee)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { paymentFee: paymentCampData.fees })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, paymentCampData.fees])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'anonymous',
                    name: user.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm Error')
        }
        else {
            console.log('payment intent', paymentIntent)
            setTransactionId(paymentIntent.id)

            //save the payment in the database
            const payment = {
                email: user.email,
                fee: paymentCampData.fees,
                transactionId: paymentIntent.id,
                camp_id: paymentCampData._id,
                camp_name: paymentCampData.name,
                payment_status: 'paid'

            }
            const res = await axiosSecure.post('/paymentHistory', payment)
            if(res.data.insertedId){
                const res = await axiosSecure.patch(`/paymentStatus/${paymentCampData._id}`, payment)
                if(res.data.modifiedCount > 0){
                    // alert('payment history saved and updated payment status')
                    navigate('/dashboard/registeredCamps')
                    Swal.fire({
                        title: "Payment Successful",
                        text: `Your Transaction Id: ${payment.transactionId}`,
                        icon: "success"
                      });
                      
                }
            }
        }




    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p>{error}</p>
            {transactionId && <p>Your payment Success and transaction Id is : {transactionId} </p>}
        </form>
    );
};

export default CheckOutForm;