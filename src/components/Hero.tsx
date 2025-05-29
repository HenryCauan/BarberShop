
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Hero = ({ onOpenAuth }: HeroProps) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
              BarberShop
            </span>
            <br />
            <span className="text-white">Elite</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            A experiência definitiva em cuidados masculinos.
            <br />
            Tradição, estilo e excelência em cada corte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => onOpenAuth('register')}
              className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-semibold px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Agora
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-black font-semibold px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
            >
              Ver Serviços
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
