
import { Card } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Corte Clássico",
      description: "Corte tradicional com acabamento perfeito",
      price: "R$ 35",
      duration: "30 min",
      image: "💇‍♂️"
    },
    {
      title: "Barba & Bigode",
      description: "Aparar e modelar com precisão profissional",
      price: "R$ 25",
      duration: "20 min",
      image: "🧔"
    },
    {
      title: "Corte + Barba",
      description: "Pacote completo para o homem moderno",
      price: "R$ 55",
      duration: "45 min",
      image: "✂️"
    },
    {
      title: "Hidratação",
      description: "Tratamento premium para cabelos",
      price: "R$ 40",
      duration: "25 min",
      image: "💆‍♂️"
    },
    {
      title: "Sobrancelha",
      description: "Design e acabamento masculino",
      price: "R$ 15",
      duration: "15 min",
      image: "👁️"
    },
    {
      title: "Pacote VIP",
      description: "Experiência completa de luxo",
      price: "R$ 85",
      duration: "60 min",
      image: "👑"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos <span className="text-gold">Serviços</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços premium para o homem moderno
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-gray-800/50 border-gold/20 hover:border-gold/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-gold/20"
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">{service.image}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gold">{service.price}</span>
                  <span className="text-sm text-gray-400">{service.duration}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
