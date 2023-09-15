import React, { useState } from 'react';
import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import "../../styles/Home.module.css";
import toast from "react-hot-toast"

function Admin() {

    const [id, setID] = useState(0);
    const [remark, setRemark] = useState("");




    const { contract } = useContract("0x2124B3a2dBf56B9b5c4C8B9062670C2c9f16d461");



    /* calculating next Aprroval ID...*/
    const { mutateAsync: calcPendingApprovalIds } = useContractWrite(contract, "calcPendingApprovalIds");
    const { data: pendingApprovals } = useContractRead(contract, "pendingApprovals", [0]);
    const NextApprovalId = async () => {
        const notification = toast.loading("Getting NextID to Approve!");
        try {
            const data = await calcPendingApprovalIds([]);
            console.info("contract call successs", data);
            toast.success(`Successful`, {
                id: notification,
            })

        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
        }

    }


    /*handling approve function */
    const { mutateAsync: approveComplaint, isLoading } = useContractWrite(contract, "approveComplaint")
    const ApproveComplain = async () => {
        const notification = toast.loading("Approving Complaint!");
        try {
            const data = await approveComplaint({ args: [id, remark] });
            console.info("contract call successs", data);
            toast.success(`Approved!`, {
                id: notification,
            })
            setID(null);
            setRemark("");
        } catch (err) {
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
            console.error("contract call failure", err);
        }
    }

    /* handling declined function... */
    const { mutateAsync: discardComplaint } = useContractWrite(contract, "discardComplaint")
    const HandlediscardComplaint = async () => {
        const notification = toast.loading("Discarding Complaint!");
        try {
            const data = await discardComplaint({ args: [id, remark] });
            console.info("contract call successs", data);
            toast.success(`Complaint Discarded!`, {
                id: notification,
            })
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
        }
    };




    /* handling getting next resolved id.... */


    const { data: pendingResolvedId } = useContractRead(contract, "pendingResolutions", [0]);
    const { mutateAsync: calcPendingResolutionIds } = useContractWrite(contract, "calcPendingResolutionIds");

    const HandlingcalcPendingResolutionIds = async () => {
        const notification = toast.loading("Getting NextID to Resolve!");
        try {
            const data = await calcPendingResolutionIds([]);
            console.info("contract call successs", data);
            toast.success(`Successful!`, {
                id: notification,
            })
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
        }
    }


    /* handling to Resolve function ...*/


    const { mutateAsync: resolveComplaint } = useContractWrite(contract, "resolveComplaint");
    const HandlingresolveComplaint = async () => {
        const notification = toast.loading("Resolving Complaint!");
        try {
            const data = await resolveComplaint({ args: [id, remark] });
            console.info("contract call successs", data);
            toast.success(`Complaint Resolved Successful!`, {
                id: notification,
            })
        } catch (err) {
            console.error("contract call failure", err);
            toast.error("Oops! Something went Wrong.", {
                id: notification,
            })
        }
    }




    return (
        <div className='admin'>



            <div className='approve'>
                <h2 className="text-3xl font-bold underline">Approve/Discard</h2>
                <button type='submit' onClick={NextApprovalId}>Next To Approve</button>
                {pendingApprovals && (<div>{pendingApprovals.toString()}</div>)}
                <label htmlFor='id'>Enter Compalaint ID</label>
                <input
                    type='text'
                    name='id'
                    id='id'
                    required
                    onChange={(e) => setID(e.target.value)}
                />
                <label htmlFor='remark'>Enter Remark</label>
                <textarea
                    name='remark'
                    id='remark'
                    required
                    onChange={(e) => setRemark(e.target.value)}
                />
                <div className='btns'>
                    <button type='submit' onClick={ApproveComplain}>Approve</button>
                    <button style={{ backgroundColor: "red" }} type='submit' onClick={HandlediscardComplaint}>Discard</button>
                </div>

            </div>



            <div className='resolve'>
                <h2 className="text-3xl font-bold underline" >Resolve</h2>
                <button type='submit' onClick={HandlingcalcPendingResolutionIds}>Next To Resolve</button>
                {pendingResolvedId && (<div>{pendingResolvedId.toString()}</div>)}
                <label htmlFor='id'>Enter Compalaint ID</label>
                <input
                    type='text'
                    name='id'
                    id='id'
                    required
                    onChange={(e) => setID(e.target.value)}
                />
                <label htmlFor='remark'>Enter Remark</label>
                <textarea
                    name='remark'
                    id='remark'
                    required
                    onChange={(e) => setRemark(e.target.value)}
                />
                <div className='btns'>
                    <button style={{ backgroundColor: "green" }} type='submit' onClick={HandlingresolveComplaint}>Resolve</button>
                </div>

            </div>

        </div>
    )
}

export default Admin;









/*

const Getter = () => {
    const [id, setId] = useState(0);
    const [rId, setRId] = useState(0);
    const [aRemark, setARemark] = useState("");
    const [rRemark, setRRemark] = useState("");
    const { contract } = useContract("0x2124B3a2dBf56B9b5c4C8B9062670C2c9f16d461");
    const { data: nextId } = useContractRead(contract, "nextId")
    const { data: pendingApprovals } = useContractRead(contract, "pendingApprovals", 0)
    const { data: pendingResolutions } = useContractRead(contract, "pendingResolutions", 0)
    const { mutateAsync: calcPendingApprovalIds } = useContractWrite(contract, "calcPendingApprovalIds")
    const { mutateAsync: calcPendingResolutionIds } = useContractWrite(contract, "calcPendingResolutionIds")

    const { mutateAsync: approveComplaint } = useContractWrite(contract, "approveComplaint")
    const { mutateAsync: resolveComplaint } = useContractWrite(contract, "resolveComplaint")
    const { mutateAsync: discardComplaint } = useContractWrite(contract, "discardComplaint")

    const getPendingApprovals = async () => {
        try {
            const data = await calcPendingApprovalIds([]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const getPendingResolutions = async () => {
        try {
            const data = await calcPendingResolutionIds([]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleApproveComplaint = async () => {
        try {
            const data = await approveComplaint([id, aRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleDeclineComplaint = async () => {
        try {
            const data = await discardComplaint([id, aRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    const handleResolveComplaint = async () => {
        try {
            const data = await resolveComplaint([rId, rRemark]);
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    }

    return (
        <div className='getter-container md:p-[30px]  md:m-5 xl:flex xl:flex-row'>
            <div className='getter-card md:m-5'>
                <p className='getter-card-title'>Pending Approvals</p>
                <div className='flex items-center mt-3'>
                    <button className="button-common hover:bg-blue-900" onClick={getPendingApprovals}>Next Pending Approval ID</button>
                    {
                        pendingApprovals && (
                            <p className='getter-card-number'>: {pendingApprovals.toString()}</p>
                        )
                    }
                </div>

                <div className='md:flex items-center'>
                    <p className='text-2xl font-semibold'>Complaint Id: </p>
                    <input type="number" className='p-1 m-1 md:w-[500px] w-[200px] rounded-sm bg-[#D2DAFF]' placeholder='Enter Id Here'
                        onChange={(e) => { setId(e.target.value) }} />
                </div>
                <div className='md:flex items-center'>
                    <p className='text-2xl font-semibold'>Your Remark: </p>
                    <input type="text" className='p-1 m-1 md:w-[500px] w-[200px] rounded-sm bg-[#D2DAFF]' placeholder='Enter Remark Here'
                        onChange={(e) => { setARemark(e.target.value) }} />
                </div>
                <div className='flex'>
                    <button className="button-common hover:bg-blue-900" onClick={handleApproveComplaint}>Approve Complaint</button>
                    <button className="button-common hover:bg-blue-900" onClick={handleDeclineComplaint}>Decline Complaint</button>
                </div>

            </div>
            <div className='getter-card md:m-5'>
                <p className='getter-card-title'>Pending Resolutions</p>
                <div className='flex items-center mt-3'>
                    <button className="button-common hover:bg-blue-900" onClick={getPendingResolutions}>Next Pending Resolution ID</button>
                    {
                        pendingResolutions && (
                            <p className='getter-card-number'>: {pendingResolutions.toString()}</p>
                        )
                    }

                </div>

                <div className='md:flex items-center'>
                    <p className='text-2xl font-semibold'>Complaint Id: </p>
                    <input type="number" className='getter-input md:w-[500px]' placeholder='Enter Id Here'
                        onChange={(e) => { setRId(e.target.value) }} />
                </div>
                <div className='md:flex items-center'>
                    <p className='text-2xl font-semibold'>Your Remark: </p>
                    <input type="text" className='getter-input md:w-[500px]' placeholder='Enter Remark Here'
                        onChange={(e) => { setRRemark(e.target.value) }} />
                </div>
                <button className="button-common hover:bg-blue-900" onClick={handleResolveComplaint}>Resolve Complaint</button>
            </div>

        </div>
    )
}

export default Getter

*/