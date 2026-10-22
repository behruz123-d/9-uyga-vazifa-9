"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer-parts"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DrawerDemo() {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [name, setName] = React.useState<string>("")
    const [price, setPrice] = React.useState<number>(0)

    async function handleConfirm() {
        if (!name.trim()) {
            toast.error("Nomini kiriting")
            return
        }
        try {
            const res = await fetch('/api/products', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,price
                })
            });
            if (!res.ok) {
                toast.error("Xatolik yuz berdi")
                return
            }
            toast.success("Mahsulot yaratildi")
            setName("")
            setPrice(0)
            setOpen(false)
            router.refresh()
        } catch {
            toast.error("Xatolik yuz berdi")
        }
    }

    return (
        <Drawer 
        open={open}
        onOpenChange={setOpen}> 
        <DrawerTrigger render={<Button>Add product</Button>} />
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Yangi mahsulot</DrawerTitle>
               <DrawerDescription>
                Nomi va narxini kiriting.
               </DrawerDescription>
            </DrawerHeader>
            <div className="flex-1 scroll-fade overflow-y-auto p-4 flex flex-col gap-3">
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nomi" className="h-10" />
                <Input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" min={0} placeholder="Narxi" className="h-10" />
            </div>
            <DrawerFooter>
                <Button onClick={handleConfirm} className="h-10">
                    Saqlash
                </Button>
                <DrawerClose render={<Button variant="outline">Bekor qilish</Button>}/>
            </DrawerFooter>
        </DrawerContent>
        </Drawer>
    )
}