import { Card } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-t from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entre em <span className="text-gold">Contato</span>
          </h2>
          <p className="text-xl text-gray-300">
            Estamos aqui para atender você da melhor forma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gold/20 p-6 text-center hover:border-gold/50 transition-all duration-300">
            <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Endereço</h3>
            <p className="text-gray-300 text-sm">
              Rua das Flores, 123<br />
              Centro - São Paulo/SP
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gold/20 p-6 text-center hover:border-gold/50 transition-all duration-300">
            <Phone className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Telefone</h3>
            <p className="text-gray-300 text-sm">
              (11) 99999-9999<br />
              (11) 3333-3333
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gold/20 p-6 text-center hover:border-gold/50 transition-all duration-300">
            <Clock className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Horário</h3>
            <p className="text-gray-300 text-sm">
              Seg a Sex: 9h às 19h<br />
              Sáb: 9h às 17h
            </p>
          </Card>

          <Card className="bg-gray-800/50 border-gold/20 p-6 text-center hover:border-gold/50 transition-all duration-300">
            <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-300 text-sm">
              contato@barbershop.com<br />
              agendamento@barbershop.com
            </p>
          </Card>
        </div>

        {/* Seção de Redes Sociais */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Siga-nos nas Redes Sociais</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <a 
              href="https://instagram.com/barbershop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://facebook.com/barbershop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
