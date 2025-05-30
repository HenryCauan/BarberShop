import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const { toast } = useToast();

  const services = [
    { id: 'corte', name: 'Corte Clássico', price: 'R$ 35', duration: '30 min' },
    { id: 'barba', name: 'Barba & Bigode', price: 'R$ 25', duration: '20 min' },
    { id: 'combo', name: 'Corte + Barba', price: 'R$ 55', duration: '45 min' },
    { id: 'hidratacao', name: 'Hidratação', price: 'R$ 40', duration: '25 min' },
    { id: 'sobrancelha', name: 'Sobrancelha', price: 'R$ 15', duration: '15 min' },
    { id: 'vip', name: 'Pacote VIP', price: 'R$ 85', duration: '60 min' }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, selecione data, horário e serviço",
        variant: "destructive"
      });
      return;
    }

    // Criar o objeto do agendamento
    const newAppointment = {
      id: Date.now().toString(), // ID único
      clientName: "Cliente", // Substitua por um campo de input ou contexto de autenticação
      clientPhone: "(00) 00000-0000", // Substitua por um campo de input
      service: services.find(s => s.id === selectedService)?.name || selectedService,
      date: selectedDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      time: selectedTime,
      status: "pending" as const // Status inicial
    };

    // Salvar no localStorage
    const existingAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('adminAppointments', JSON.stringify(updatedAppointments));

    toast({
      title: "Agendamento confirmado!",
      description: `Seu horário foi marcado para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gold/20 p-4">
        <div className="container mx-auto flex items-center">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-black mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            Agendar <span className="text-gold">Horário</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Serviços */}
          <Card className="bg-gray-900/50 border-gold/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-gold" />
              Escolha o Serviço
            </h2>
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedService === service.id
                      ? 'border-gold bg-gold/10'
                      : 'border-gray-700 hover:border-gold/50'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold">{service.name}</h3>
                      <p className="text-gray-400 text-sm">{service.duration}</p>
                    </div>
                    <span className="text-gold font-bold">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Data */}
          <Card className="bg-gray-900/50 border-gold/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Escolha a Data
            </h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md text-white"
            />
            <p className="text-gray-400 text-sm mt-4">
              * Fechado aos domingos
            </p>
          </Card>

          {/* Horário */}
          <Card className="bg-gray-900/50 border-gold/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gold" />
              Escolha o Horário
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className={
                    selectedTime === time
                      ? "bg-gold text-black hover:bg-gold/80"
                      : "border-gray-700 text-black hover:border-gold hover:text-gold"
                  }
                >
                  {time}
                </Button>
              ))}
            </div>
          </Card>

          {/* Novo Card para Dados do Cliente */}
          <Card className="bg-gray-900/50 border-gold/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Seus Dados</h2>
            <div className="space-y-4">
              <div>
                <Label className="text-white">Nome</Label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Telefone</Label>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Resumo e Confirmação */}
        <Card className="bg-gray-900/50 border-gold/20 p-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Resumo do Agendamento</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label className="text-gray-400">Serviço</Label>
              <p className="text-white font-semibold">
                {selectedService ? services.find(s => s.id === selectedService)?.name : 'Não selecionado'}
              </p>
            </div>
            <div>
              <Label className="text-gray-400">Data</Label>
              <p className="text-white font-semibold">
                {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'Não selecionada'}
              </p>
            </div>
            <div>
              <Label className="text-gray-400">Horário</Label>
              <p className="text-white font-semibold">
                {selectedTime || 'Não selecionado'}
              </p>
            </div>
          </div>

          <Button 
            onClick={handleBooking}
            className="w-full bg-gold hover:bg-gold/80 text-black font-semibold text-lg py-3"
            disabled={!selectedDate || !selectedTime || !selectedService || !clientName || !clientPhone}
          >
            Confirmar Agendamento
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Booking;
