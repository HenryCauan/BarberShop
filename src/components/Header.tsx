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
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 font-cormorant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="text-2xl font-bold text-gold">
            <a href="#home">Barber</a>
          </div>

          {/* Desktop Navigation (Centrada) */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
            <a href="#home" className="text-white hover:text-gold transition-colors">Início</a>
            <a href="#services" className="text-white hover:text-gold transition-colors">Serviços</a>
            <a href="#about" className="text-white hover:text-gold transition-colors">Sobre</a>
            <a href="#galeria" className="text-white hover:text-gold transition-colors">Galeria</a>
            <a href="#contact" className="text-white hover:text-gold transition-colors">Contato</a>
          </nav>

          {/* Desktop Auth & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
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
                  className="border-white text-white bg-black hover:bg-white hover:text-black"
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

        {/* Mobile Menu (Aprimorado) */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 shadow-lg py-4">
            <nav className="flex flex-col items-center space-y-4">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gold transition-colors">Início</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gold transition-colors">Serviços</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gold transition-colors">Sobre</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gold transition-colors">Contato</a>
              
              <div className="w-full border-t border-gold/20 my-4"></div>

              {isAuthenticated ? (
                <div className="flex flex-col items-center space-y-4 w-full px-4">
                  {user?.isAdmin ? (
                    <Link to="/admin" className="w-full">
                      <Button className="w-full bg-gold hover:bg-gold/80 text-black">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                      <Link to="/booking" className="w-full">
                        <Button className="w-full bg-gold hover:bg-gold/80 text-black">
                          <Calendar className="w-4 h-4 mr-2" />
                          Agendar
                        </Button>
                      </Link>
                      <Link to="/historico" className="w-full">
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
                <div className="flex flex-col items-center space-y-4 w-full px-4">
                  <Button 
                    variant="outline" 
                    onClick={() => { onOpenAuth('login'); setIsMenuOpen(false); }}
                    className="w-full border-white text-white bg-black hover:bg-white hover:text-black"
                  >
                    Entrar
                  </Button>
                  <Button 
                    onClick={() => { onOpenAuth('register'); setIsMenuOpen(false); }}
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
