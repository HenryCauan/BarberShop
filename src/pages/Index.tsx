import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import Gallery from "@/components/Gallery";
import Lenis from "@studio-freight/lenis";

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { login } = useAuth();

  // Configuração do Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Duração da animação de rolagem (em segundos)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de easing
      smooth: true, // Ativa a rolagem suave
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Limpeza ao desmontar o componente
    };
  }, []);

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData: { name: string; phone: string; email: string; isAdmin: boolean }) => {
    login(userData);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onOpenAuth={openAuthModal} />
      <Hero onOpenAuth={openAuthModal} />
      <Services />
      <About />
      <Gallery />
      <Contact />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
