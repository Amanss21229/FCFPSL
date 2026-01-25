import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="card-brutal max-w-md text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-24 w-24 text-black" />
        </div>
        <h1 className="text-4xl font-black uppercase mb-4">404 Page Not Found</h1>
        <p className="font-mono text-neutral-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <button className="btn-3d-primary w-full py-3 px-6 uppercase tracking-widest text-sm">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
