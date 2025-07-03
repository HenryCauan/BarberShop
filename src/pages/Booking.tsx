import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, User, Scissors, Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { io } from "socket.io-client";

const Booking = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [clientName, setClientName] = useState<string>(user?.name || '');
  const [clientPhone, setClientPhone] = useState<string>(user?.phone || '');
  const { toast } = useToast();
  const [confirmedAppointments, setConfirmedAppointments] = useState<string[]>([]);

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

  const isTimeSlotConfirmed = (time: string) => {
    return confirmedAppointments.includes(time);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, selecione data, horário e serviço",
        variant: "destructive"
      });
      return;
    }

    const selectedServiceObj = services.find(s => s.id === selectedService);
    const newAppointment = {
      id: Date.now().toString(),
      clientName: clientName || user?.name || "Cliente não informado",
      clientPhone: clientPhone || user?.phone || "Telefone não informado",
      service: selectedServiceObj?.name || selectedService,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: 'pending' as const
    };

    const existingAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
    const updatedAppointments = [...existingAppointments, newAppointment];
    localStorage.setItem('adminAppointments', JSON.stringify(updatedAppointments));

    // const socket = io('URL_DO_SEU_SERVIDOR_WEBSOCKET');
    // socket.emit('newAppointment', newAppointment);

    toast({
      title: "Aguarde a confirmação do proprietário",
      description: `Seu horário foi solicitado para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedTime}`,
    });
  };

  return (
    <div className="min-h-screen bg-black font-futura text-white">
      {/* Header */}
      <header className="bg-black border-b border-[#aa8c2c] p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/">
            <Button variant="outline" size="sm" className="border-[#aa8c2c] text-[#aa8c2c] hover:bg-[#aa8c2c] hover:text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-3xl font-cormorant text-white uppercase tracking-widest">
            Agendar <span className="text-[#aa8c2c]">Horário</span>
          </h1>
          <div className="w-24"></div> {/* Espaço para centralizar o título */}
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna 1: Serviços */}
          <Card className="bg-black border border-[#aa8c2c] p-6 rounded-lg shadow-lg shadow-[#aa8c2c]/10">
            <h2 className="text-2xl font-cormorant text-white pb-4 flex items-center">
              <Scissors className="w-6 h-6 mr-3" />
              1. Escolha o Serviço
            </h2>
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 rounded-md border-2 cursor-pointer transition-all duration-300 flex justify-between items-center ${ 
                    selectedService === service.id
                      ? 'border-[#aa8c2c] bg-[#aa8c2c]/10'
                      : 'border-gray-700 hover:border-[#aa8c2c]/50'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div>
                    <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                    <p className="text-gray-400 text-sm">{service.duration}</p>
                  </div>
                  <span className="text-[#aa8c2c] font-bold text-lg">{service.price}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Coluna 2: Data e Horário */}
          <div className="space-y-8">
            <Card className="bg-black border border-[#aa8c2c] p-6 rounded-lg shadow-lg shadow-[#aa8c2c]/10">
              <h2 className="text-2xl font-cormorant text-white mb-4 flex items-center">
                <CalendarIcon className="w-6 h-6 mr-3" />
                2. Escolha a Data
              </h2>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || date.getDay() === 0}
                className="rounded-md text-white bg-black p-0"
              />
              <p className="text-gray-400 text-sm mt-4">
                * Não abrimos aos domingos.
              </p>
            </Card>
            <Card className="bg-black border border-[#aa8c2c] p-6 rounded-lg shadow-lg shadow-[#aa8c2c]/10">
              <h2 className="text-2xl font-cormorant text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3" />
                3. Escolha o Horário
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => !isTimeSlotConfirmed(time) && setSelectedTime(time)}
                    className={`py-6 text-lg transition-all duration-300 ${ 
                      isTimeSlotConfirmed(time)
                        ? "bg-red-800 text-white/50 cursor-not-allowed line-through"
                        : selectedTime === time
                        ? "bg-[#aa8c2c] text-black hover:bg-[#aa8c2c]/90"
                        : "border-gray-600 bg-gray-800 text-white hover:border-[#aa8c2c] hover:text-[#aa8c2c]"
                    }`}
                    disabled={isTimeSlotConfirmed(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Coluna 3: Resumo e Confirmação */}
          <Card className="bg-black border border-[#aa8c2c] p-6 rounded-lg shadow-lg shadow-[#aa8c2c]/10 lg:sticky lg:top-28">
            <h2 className="text-2xl font-cormorant text-white mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3" />
              Resumo do Agendamento
            </h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <Label className="text-gray-400">Serviço:</Label>
                <p className="text-white font-semibold text-right">
                  {selectedService ? services.find(s => s.id === selectedService)?.name : 'N/A'}
                </p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <Label className="text-gray-400">Data:</Label>
                <p className="text-white font-semibold">
                  {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : 'N/A'}
                </p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <Label className="text-gray-400">Horário:</Label>
                <p className="text-white font-semibold">
                  {selectedTime || 'N/A'}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4">
                <Label className="text-xl font-cormorant text-white">Total:</Label>
                <p className="text-2xl font-bold text-[#aa8c2c]">
                  {selectedService ? services.find(s => s.id === selectedService)?.price : 'R$ 0'}
                </p>
              </div>
            </div>

            <Button 
              onClick={handleBooking}
              className="w-full bg-[#aa8c2c] hover:bg-[#aa8c2c]/90 text-black font-bold text-lg py-7 rounded-lg transition-all duration-300 shadow-lg shadow-[#aa8c2c]/20 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={!selectedDate || !selectedTime || !selectedService}
            >
              Confirmar Agendamento
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;
