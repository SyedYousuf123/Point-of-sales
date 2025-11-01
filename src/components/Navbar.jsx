import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b px-4 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <Menu className="md:hidden text-gray-600" size={20} />
        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
          POS Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="text-sm">
          Profile
        </Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
          Logout
        </Button>
      </div>
    </header>
  );
}
