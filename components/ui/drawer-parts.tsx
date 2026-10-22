"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { cn } from "cn"

function Drawer({ ...props }: DrawerPrimitive.Root.Props) {
  return <DrawerPrimitive.Root data-slot="drawer" swipeDirection="down" {...props} />
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerContent({
  className,
  children,
  ...props
}: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop className="fixed inset-0 min-h-dvh bg-black/30 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <DrawerPrimitive.Viewport className="fixed inset-0 flex items-end justify-center">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          className={cn(
            "flex max-h-[85dvh] w-full flex-col mx-auto rounded-t-xl border-t bg-card text-foreground sm:max-w-lg outline-none transition-transform duration-300 [transform:translateY(var(--drawer-swipe-movement-y))] data-ending-style:translate-y-full data-starting-style:translate-y-full",
            className
          )}
          {...props}
        >
          <DrawerPrimitive.Content className="flex flex-1 flex-col">
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-base font-medium", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
