import { Card } from "@/components/ui/card";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ServicesProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const Services = ({ onOpenAuth }: ServicesProps) => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      '.section-two',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '.section-two',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const services = [
    {
      title: "Corte Clássico",
      description: "Corte tradicional com acabamento perfeito",
      price: "R$ 35",
      duration: "30 min",
      image: "/image(11).png"
    },
    {
      title: "Sobrancelha",
      description: "Tratamento premium para cabelos",
      price: "R$ 15",
      duration: "25 min",
      image: "/image(9).png"
    },
    {
      title: "Barba",
      description: "Design e acabamento masculino",
      price: "R$ 45",
      duration: "15 min",
      image: "/image(8).png"
    },
  ];

  return (
    <section id="services" className="w-full min-h-screen px-8 text-white  section-two">
      <div className="mt-12 font-cormorant">
        <h1 className="text-5xl md:text-8xl mb-20">SERVICES</h1>
      </div>
      <div className="w-full h-full flex md:flex-row flex-col gap-12 font-futura px-4">
        {services.map((service, index) => (
          <div className="h-2/3 flex flex-col border-[1px] p-4 border-white">
            <img className="" src={service.image} alt="" />
            <h1 className="text-lg border-b border-white py-4">{service.title}</h1>
            <p className="py-8 text-lg">{service.price}</p>
            <button 
              onClick={() => isAuthenticated ? navigate('/booking') : onOpenAuth('register')} 
              className="px-6 py-2 border-2 border-white hover:bg-white hover:text-black transition-colors"
            >
              Agendar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
