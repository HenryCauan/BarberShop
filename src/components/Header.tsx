import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Calendar, Settings, History } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Header = ({ onOpenAuth }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gold/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gold">
            BarberShop Elite
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-gold transition-colors">Início</a>
            <a href="#services" className="text-white hover:text-gold transition-colors">Serviços</a>
            <a href="#about" className="text-white hover:text-gold transition-colors">Sobre</a>
            <a href="#contact" className="text-white hover:text-gold transition-colors">Contato</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">Olá, {user?.name}</span>
                
                {user?.isAdmin ? (
                  <Link to="/admin">
                    <Button className="bg-gold hover:bg-gold/80 text-black">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/booking">
                      <Button className="bg-gold hover:bg-gold/80 text-black">
                        <Calendar className="w-4 h-4 mr-2" />
                        Agendar
                      </Button>
                    </Link>
                    <Link to="/historico">
                      <Button className="bg-gold hover:bg-gold/80 text-black">
                        <History className="w-4 h-4 mr-2" />
                        Histórico
                      </Button>
                    </Link>
                  </div>
                )}
                
                <Button variant="outline" onClick={logout} className="border-gold text-gold hover:bg-gold hover:text-black">
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenAuth('login')}
                  className="border-gold text-gold hover:bg-gold hover:text-black"
                >
                  Entrar
                </Button>
                <Button 
                  onClick={() => onOpenAuth('register')}
                  className="bg-gold hover:bg-gold/80 text-black"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gold/20">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-white hover:text-gold transition-colors">Início</a>
              <a href="#services" className="text-white hover:text-gold transition-colors">Serviços</a>
              <a href="#about" className="text-white hover:text-gold transition-colors">Sobre</a>
              <a href="#contact" className="text-white hover:text-gold transition-colors">Contato</a>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4">
                  <span className="text-white">Olá, {user?.name}</span>
                  
                  {user?.isAdmin ? (
                    <Link to="/admin">
                      <Button className="w-full bg-gold hover:bg-gold/80 text-black">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex items-center space-x-4">
                      <Link to="/booking">
                        <Button className="w-full bg-gold hover:bg-gold/80 text-black">
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar
                        </Button>
                      </Link>
                      <Link to="/historico">
                        <Button className="w-full bg-gold hover:bg-gold/80 text-black">
                          <History className="w-4 h-4 mr-2" />
                          Histórico
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  <Button variant="outline" onClick={logout} className="w-full border-gold text-gold hover:bg-gold hover:text-black">
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => onOpenAuth('login')}
                    className="w-full border-gold text-gold hover:bg-gold hover:text-black"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => onOpenAuth('register')}
                    className="w-full bg-gold hover:bg-gold/80 text-black"
                  >
                    Cadastrar
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
