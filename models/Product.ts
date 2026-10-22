import mongoose, { Schema, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
    },
    { timestamps: true }
);

export type ProductDoc = InferSchemaType<typeof productSchema>;

export default mongoose.models.Product ||
    mongoose.model("Product", productSchema);
