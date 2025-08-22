import mongoose, { mongo } from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },    
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { orderItemSchema },
    total_amount: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);