import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="hero bg-base-200 p-8 rounded-2xl">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-extrabold text-base-content mb-4">Commerce</h1>
            {/* <p className="py-2 text-base-content/80">
              Welcome to the full-stack Next.js App Router application built with Tailwind CSS and DaisyUI.
            </p> */}
            <div className="flex justify-center gap-3 mt-4">
              <Link href="/users" className="btn btn-primary">
                View Users
              </Link>
              <Link href="/users/new" className="btn btn-outline">
                Create User
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-3">Featured Item</h2>
        <ProductCard />
      </div>
    </div>
  );
}

