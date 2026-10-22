import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImagesSection from "@/components/ui/ImagesSection";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-30 border-b bg-card">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 md:flex-nowrap md:gap-6">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span aria-hidden className="size-2.5 rounded-full bg-led" />
            Appliances
          </Link>
          <div className="order-last w-full md:order-none md:w-auto md:flex-1">
            <input
              aria-label="Search"
              className="h-10 w-full max-w-md rounded-md border bg-background px-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              type="text"
              placeholder="Search here..."
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" nativeButton={false} render={<Link href="/sign-in" />}>Log In</Button>
            <Button nativeButton={false} render={<Link href="/sign-up" />}>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:py-20">
        <div className="max-w-xl">
          <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Best appliances for your home.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Computers, phones and home appliances in one catalog. Browse the list and see current prices.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/sign-up" />}>Get Started</Button>
            <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/products" />}>Browse products</Button>
          </div>
        </div>
        <ImagesSection />
      </main>
    </div>
  );
}
