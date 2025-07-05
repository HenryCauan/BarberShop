import { User, History, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProfileDropdown = () => {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 rounded-full">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <User className="w-4 h-4 text-black" />
            </div>
            <span className="text-white">{user?.full_name || "Perfil"}</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gold/20 text-white w-48">
        <DropdownMenuItem className="hover:bg-gray-800">
          <Link to="/historico" className="flex items-center w-full">
            <History className="w-4 h-4 mr-2 text-gold" />
            Histórico
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="hover:bg-gray-800 text-red-500"
          onClick={logout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};