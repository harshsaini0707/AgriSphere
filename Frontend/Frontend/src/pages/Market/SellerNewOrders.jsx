import React, { useEffect, useState } from 'react';
import { StepBack } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SellerNewOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const editStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/orderStatus/${orderId}`,
                { status: newStatus },
                { withCredentials: true }
            );
            console.log(response?.data?.data);
        } catch (error) {
            if (error?.response?.status === 401) {
                return navigate("/login");
            }
            console.log(error?.response);
        }
    };

    useEffect(() => {
        const fetchNewOrders = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/allOrders`,
                    { withCredentials: true }
                );
                setOrders(response?.data?.data);
                console.log(response?.data?.data);
            } catch (error) {
                if (error?.response?.status === 401) return navigate("/login");
                console.log("Error in API", error?.response?.data);
            } finally {
                setLoading(false);
            }
        };

        fetchNewOrders();
    }, []);
    const pendingOrders = Array.isArray(orders) ? orders.filter(order => order?.status === "Pending") : [];

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="h-16 px-4 flex items-center w-full bg-green-600 text-white shadow-md">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                    <StepBack size={20} />
                    <span className="font-semibold">Back</span>
                </button>
                <h1 className="font-semibold text-2xl ml-7">New Orders</h1>
            </nav>

            <div className="p-4">
                {loading ? (
                   
                   <div className=' flex flex-col gap-4 items-center justify-center '>
                        <div className=' h-20 w-20 mt-30   animate-spin rounded-full border-t-transparent border-4'>
                            
                        </div>
                        <h1 className='font-semibold'>This will take a little moment... Just Wait!!</h1>
                    </div>
                ) : (
                    <div className="grid gap-4 mt-6 items-center justify-center">
                        {orders.length === 0 || pendingOrders.length === 0 ? (
                            <div className='flex items-center justify-center mt-40'>
                                <p className="text-center font-semibold text-xl">No new orders available.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                order.status == "Pending" &&    <div key={order._id} className="bg-white shadow-md p-4  rounded-lg justify-center  grid md:grid-cols-2 w-fit ">
                                    <div className="  flex gap-10 items-center justify-center">
                                        <img
                                            className="h-32 w-32 object-cover rounded-full"
                                            src={order?.itemId?.cropPhoto}
                                            alt="Crop"
                                        />
                                           <div className="flex flex-col gap-2">
                                        <h1 className="text-lg font-semibold">{order?.itemId?.cropName}</h1>
                                        <div className="flex items-center gap-2">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={order?.buyerId?.profilePhoto}
                                                alt="Buyer"
                                            />
                                            <div>
                                                <h1 className="font-medium">{order?.buyerId?.firstName} {order?.buyerId?.lastName}</h1>
                                                <p className="text-sm text-gray-600">{order?.buyerId?.email}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm">Address: {order?.address}</p>
                                        <p className="text-sm">Order Date: {new Date(order?.orderDate).toLocaleDateString()}</p>
                                        <p className="text-sm">Quantity: {order?.quantity}</p>
                                        <p className="text-sm font-semibold">Price: ₹{order?.totalPrice}</p>
                                    </div>
                                    </div>
                                 
                                    <div className="flex  justify-center mb-20 gap-2 md:items-end items-center">
                                        <button
                                            onClick={() => editStatus(order._id, 'Cancelled')}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => editStatus(order._id, 'Confirm')}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerNewOrders;
