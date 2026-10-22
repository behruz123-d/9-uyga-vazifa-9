import { NextResponse } from "next/server"
import mongoose from "mongoose"
import connectDB from "@/lib/db"
import Product from "@/models/Product"

export async function GET(_req: Request, ctx: RouteContext<"/api/products/[id]">) {
    const { id } = await ctx.params
    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ error: "Noto'g'ri id" }, { status: 400 })
    }
    try {
        await connectDB()
        const p = await Product.findById(id).lean()
        if (!p) return NextResponse.json({ error: "Topilmadi" }, { status: 404 })
        return NextResponse.json({ id: String(p._id), name: p.name, price: p.price })
    } catch {
        return NextResponse.json({ error: "Bazaga ulanib bo'lmadi" }, { status: 500 })
    }
}

export async function DELETE(_req: Request, ctx: RouteContext<"/api/products/[id]">) {
    const { id } = await ctx.params
    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ error: "Noto'g'ri id" }, { status: 400 })
    }
    try {
        await connectDB()
        const p = await Product.findByIdAndDelete(id)
        if (!p) return NextResponse.json({ error: "Topilmadi" }, { status: 404 })
        return NextResponse.json({ ok: true })
    } catch {
        return NextResponse.json({ error: "O'chirib bo'lmadi" }, { status: 500 })
    }
}
