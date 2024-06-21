import { Button, Modal, } from "flowbite-react";
import { useRef, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_STRIPE);

const Funding = () => {
    const [openModal, setOpenModal] = useState(false);
    const emailInputRef = useRef(null);
    return (
        <div>
            <div className="flex justify-end items-center mr-20 mt-10 mb-24"> <Button onClick={() => setOpenModal(true)}>Give fund </Button></div>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Give fund to our platform</h3>
                        <Elements stripe={stripePromise}>
                            <CheckOutForm setOpenModal={setOpenModal}/>
                        </Elements>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Funding;