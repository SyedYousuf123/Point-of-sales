import { Button } from "@/components/ui/button";
import { Menu, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Left section */}
      <div className="flex items-center gap-2">
        {/* Hamburger for small screens */}
       

        {/* Large screen title */}
        <h2 className="hidden md:block text-lg font-semibold text-gray-800 tracking-tight">
          POS Dashboard
        </h2>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="hidden sm:inline-flex text-sm"
        >
          Profile
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4">
          Logout
        </Button>
      </div>
    </header>
  );
}
