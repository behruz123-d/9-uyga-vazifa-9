import { Suspense } from "react";
import { connection } from "next/server";
import { DrawerDemo } from "@/components/ui/Drawer";
import { TableDemo } from "@/app/products-table";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

async function ProductsList() {
    await connection()
    let products
    try {
        await connectDB()
        const docs = await Product.find().sort({ createdAt: -1 }).lean()
        products = docs.map((p) => ({ id: String(p._id), name: p.name, price: p.price }))
    } catch {
        return <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">Bazaga ulanib bo&apos;lmadi. .env dagi MONGODB_URI ni tekshiring.</p>
    }
    return <TableDemo products={products} />
}

export default function ProductsPage() {
    return (
        <>
        <header className="border-b bg-card">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
                <h1 className="text-2xl font-extrabold tracking-tight">
                    Products page
                </h1>

                <input
                    aria-label="Search product"
                    type="text"
                    placeholder="Search product..."
                    className="order-last h-10 w-full rounded-md border bg-background px-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:order-none sm:w-64"
                />
                <DrawerDemo/>
            </div>
        </header>

        <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
            <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
                <ProductsList />
            </Suspense>
        </div>
        </>
    )
}
