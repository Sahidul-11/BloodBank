import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckOutFrom.css'
import { Button, Spinner } from 'flowbite-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import axios from 'axios';


const CheckOutForm = ({ setOpenModal ,refetch }) => {
    const { user } = useAuth()
    const [err, setErr] = useState("")
    const [price, setPrice] = useState()
    const [clientSecret, setClientSecret] = useState()
    const [process, setProcess] = useState(false)
    const stripe = useStripe(" ");
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const axiosCommon = useAxiosCommon()
    useEffect(() => {
        if (price && price > 1) {
            getClientSecret({ price })
        }
        else {
            setClientSecret(null)
        }
    }, [price])
    const getClientSecret = async total => {
        const { data } = await axiosSecure.post("/create-payment-intent", total)
        setClientSecret(data.clientSecret)
    }

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcess(true)

        if (!stripe || !elements) {
            setProcess(false)
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;

        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            setProcess(false)
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setErr(error.message)
            setProcess(false)
            console.log('[error]', error);
        } else {
            setErr(' ')
        }
        //confirm payment 
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName,
                },
            },
        })
        if (confirmError) {
            setErr(confirmError.message)
            setProcess(false)
        }
        if (paymentIntent.status === 'succeeded') {
            const paymentInfo = {
                transactionId: paymentIntent.id,
                name: user?.displayName,
                email: user?.email,
                amount : price,
                date : new Date(),
            }
            try{
               const{data}= await axiosSecure.post("/funding",{paymentInfo})
               console.log(data)
                toast.success(`Successfully $ ${price} funded`)
                refetch()
                setOpenModal(false)
            }catch(Err){
               console.log(Err)
            }
          
          
        }
        setProcess(false)
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label for="username" class="block text-sm text-gray-900 dark:text-gray-300 font-bold">Amount (Usd)</label>

                    <input onChange={(e) => setPrice(e.target.value)} type="number" name='Amount' required placeholder="Enter Amount" class="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </div>
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
                <div className="flex items-center justify-center gap-10">
                    <button type="submit" disabled={!stripe || !clientSecret || process} className='btn btn-sm btn-warning'>
                      {process? <Spinner/>: " Give Fund"}
                    </button>
                    <Button color="failure" onClick={() => setOpenModal(false)}>
                        {"Cancel"}
                    </Button>
                </div>
                <p className='text-red-700 font-semibold mt-3 text-center'>{err}</p>
            </form>
        </div>
    );
};

export default CheckOutForm;