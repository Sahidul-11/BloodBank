import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

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
                        <div>
                            <div>
                                <label for="username" class="block text-sm text-gray-900 dark:text-gray-300 font-bold">Amount (Usd)</label>

                                <input type="number" placeholder="Enter Amount" class="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Funding;