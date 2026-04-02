import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";

const CheckoutPage = () => {
    const { cartItems, cartTotal } = useCart();

    const [step, setStep] = useState<"address" | "review" | "success">("address");
    const [orders, setOrders] = useState<any[]>([]);
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
    });

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("orders") || "[]");
        setOrders(saved);
    }, []);

    const handleChange = (e: any) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };


    const saveOrder = () => {
        const existing = JSON.parse(localStorage.getItem("orders") || "[]");

        const newOrder = {
            id: Date.now(),
            items: cartItems,
            total: cartTotal,
            address,
            date: new Date().toISOString(),
        };

        localStorage.setItem("orders", JSON.stringify([newOrder, ...existing]));
    };

    const placeOrder = async () => {
        try {
            const audio = new Audio("/success.mp3");
            await audio.play();
        } catch (err) {
            console.log("Audio failed:", err);
        }

        saveOrder();
        setStep("success");
    };

    return (
        <div className="min-h-screen bg-white px-6 py-10">
            <div className="max-w-5xl mx-auto">

                {step === "address" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-3" />
                            <input name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-3" />
                            <input name="city" placeholder="City" onChange={handleChange} className="border p-3" />
                            <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-3" />
                            <textarea name="address" placeholder="Full Address" onChange={handleChange} className="border p-3 col-span-2" />
                        </div>

                        <button
                            onClick={() => setStep("review")}
                            className="mt-6 bg-black text-white px-6 py-3"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === "review" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-6">Review Order</h2>

                        <div className="mb-6 border p-4">
                            <p className="font-medium">{address.name}</p>
                            <p>{address.address}</p>
                            <p>{address.city} - {address.pincode}</p>
                            <p>{address.phone}</p>
                        </div>

                        <div className="space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 border-b pb-3">
                                    <img src={item.images[0]} className="w-16 h-16 object-contain" />
                                    <div className="flex-1">
                                        <p className="text-sm">{item.title}</p>
                                        <p className="text-xs text-gray-500">₹{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border p-4 mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span>Subtotal</span>
                                <span>₹{cartTotal}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span>Shipping</span>
                                <span>₹50</span>
                            </div>
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>₹{cartTotal + 50}</span>
                            </div>
                        </div>

                        <button
                            onClick={placeOrder}
                            className="bg-green-600 text-white px-6 py-3"
                        >
                            Place Order
                        </button>
                    </div>
                )}

                {step === "success" && (
                    <div className="flex flex-col items-center justify-center text-center mt-20">

                        <img
                            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/programmer.gif"
                            alt="success"
                            className="w-40 mb-6"
                        />

                        <h2 className="text-2xl font-semibold mb-2">
                            Order Placed Successfully 🎉
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Your order has been confirmed and will be shipped soon.
                        </p>

                        <button
                            onClick={() => window.location.href = "/"}
                            className="border px-6 py-3"
                        >
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-16">
                <h2 className="text-xl font-semibold mb-4">Previous Orders</h2>

                {orders.length === 0 && (
                    <p className="text-gray-400 text-sm">No past orders</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {orders.map((order) => (
                        <div key={order.id} className="border p-4">
                            <p className="text-xs text-gray-400 mb-2">
                                {new Date(order.date).toLocaleString()}
                            </p>

                            {order.items.map((item: any) => (
                                <div key={item.id} className="flex gap-3 mb-2">
                                    <img src={item.images[0]} className="w-10 h-10" />
                                    <p className="text-xs">{item.title}</p>
                                </div>
                            ))}

                            <p className="text-sm font-semibold mt-2">
                                Total: ₹{order.total}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;