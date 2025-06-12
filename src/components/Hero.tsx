import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Hero = ({ onOpenAuth }: HeroProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      '#section-one',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2 }
    );
  }, []);

  return (
    <section className="relative z-0" id="section-one">
      <div className="w-full h-screen flex flex-col bg-black justify-center items-center text-white font-futura relative z-10">
        <span>Seja Bem-Vindo</span>
        <h1 className="md:text-8xl text-[14vw] text-center font-cormorant">DESCUBRA NOSSOS <br/> SERVICOS</h1>
        <button 
          onClick={() => isAuthenticated ? navigate('/booking') : onOpenAuth('register')} 
          className="relative top-12 px-6 py-2 border-2 border-white z-40 hover:bg-white hover:text-black transition-colors"
        >
          Agende Agora
        </button>
      </div>

      <div className="">
        <img className="absolute w-[30vw] md:w-[18vw] top-36 right-12 md:right-[8rem] z-20" src="/image.png" alt="" />
        <img className="absolute w-[30vw] md:w-[17vw] top-36 left-8 z-20" src="/image(6).png" alt="" />
        <img className="absolute w-[30vw] md:w-[20vw] bottom-24 right-12 md:right-[25rem] z-10" src="/image(3).png" alt="" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
