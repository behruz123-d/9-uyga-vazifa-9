"use client"

import Image from 'next/image'
import { useState } from "react";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "compyuters", category: "computers", label: "Computers", src: "/images/compyuters.avif", alt: "Computers" },
  { key: "appliances", category: "appliances", label: "Appliances", src: "/images/appliance.jpg", alt: "Home appliances" },
  { key: "phones", category: "phones", label: "Smartphones", src: "/images/smartphone.webp", alt: "Smartphones" },
] as const

const ImagesSection = () => {
  const [activeTab, setActiveTab] = useState<string>("compyuters")

  return (
    <section aria-label="Product categories" className="w-full">
      <div role="tablist" aria-label="Categories" className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            data-category={tab.category}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "tag-arrow h-9 cursor-pointer pl-4 pr-8 text-sm font-semibold outline-none focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4",
              activeTab !== tab.key && "[--tag:var(--card)] [--tag-fg:var(--foreground)] hover:brightness-95"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border bg-muted">
        {TABS.map((tab, index) => (
          <Image
            key={tab.key}
            src={tab.src}
            alt={tab.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority={index === 0}
            aria-hidden={activeTab !== tab.key}
            className={cn(
              "object-cover transition-opacity duration-300 motion-reduce:transition-none",
              activeTab === tab.key ? "opacity-100" : "opacity-0"
            )}
          />
        ))}
      </div>
    </section>
  )
}

export default ImagesSection
