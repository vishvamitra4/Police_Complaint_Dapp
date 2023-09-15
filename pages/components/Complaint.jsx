import React, { useState } from 'react';
import "../../styles/Home.module.css";
import { useContract, useContractWrite, useContractRead } from '@thirdweb-dev/react';
import toast from "react-hot-toast"

function Complaint() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const { contract } = useContract("0x2124B3a2dBf56B9b5c4C8B9062670C2c9f16d461");
    const { data : nextID } = useContractRead(contract, "nextId")
    const { mutateAsync: fileComplaint, isLoading } = useContractWrite(contract, "fileComplaint")


    const handleSubmit = async (e) => {
        e.preventDefault();
        const notification = toast.loading("Filing Complaint!");
        try {
            const data = await fileComplaint({ args: [title, description] });
            console.info("contract call successs", data);
            toast.success(`Complaint Filed! Note Your Complaint Id : ${nextID.toString()}`, {
                id: notification,
            })
            setTitle("");
            setDescription("");
        } catch (err) {
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
            console.error("contract call failure", err);
        }
    };

    return (
        <div className="complaint-form" id = "complain">
            <h2 className="text-3xl font-bold underline">File Complaint</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Complaint;