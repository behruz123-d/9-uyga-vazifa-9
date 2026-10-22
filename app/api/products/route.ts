import { NextResponse } from "next/server"
import connectDB from "@/lib/db"
import Product from "@/models/Product"

export async function GET() {
    try {
        await connectDB()
        const products = await Product.find().sort({ createdAt: -1 }).lean()
        return NextResponse.json(
            products.map((p) => ({ id: String(p._id), name: p.name, price: p.price }))
        )
    } catch {
        return NextResponse.json({ error: "Bazaga ulanib bo'lmadi" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, price } = await request.json()
        if (typeof name !== "string" || !name.trim() || !Number.isFinite(Number(price)) || Number(price) < 0) {
            return NextResponse.json({ error: "Noto'g'ri ma'lumot" }, { status: 400 })
        }
        await connectDB()
        const product = await Product.create({ name, price: Number(price) })
        return NextResponse.json(
            { id: String(product._id), name: product.name, price: product.price },
            { status: 201 }
        )
    } catch {
        return NextResponse.json({ error: "Saqlab bo'lmadi" }, { status: 500 })
    }
}
