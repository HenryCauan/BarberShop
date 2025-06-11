import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Hero = ({ onOpenAuth }: HeroProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="">
      <div className="w-full h-screen flex flex-col bg-black justify-center items-center text-white font-futura">
        <span>Seja Bem-Vindo</span>
        <h1 className="text-8xl text-center font-cormorant">DESCUBRA NOSSOS <br/> SERVICOS</h1>
        <button className="relative top-12 px-6 py-2 border-2 border-white">Agende Agora</button>
      </div>

      <div className="">
        <img className="absolute w-[18rem] top-36 right-8 z-20" src="/image.png" alt="" />
        <img className="absolute w-[17rem] top-36 left-8 z-20" src="/image(6).png" alt="" />
        <img className="absolute w-[20rem] bottom-24 right-[25rem] z-20" src="/image(3).png" alt="" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
