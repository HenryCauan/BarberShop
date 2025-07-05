import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, Scissors, Calendar as CalendarIcon, CheckCircle, User, ChevronRight, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomCalendar from "@/components/ui/CustomCalendar";


const Booking = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const services = [
    { id: 'corte', name: 'Corte Clássico', price: 'R$ 35', duration: '30 min', icon: <Scissors className="w-8 h-8 text-[#aa8c2c]" /> },
    { id: 'barba', name: 'Barba & Bigode', price: 'R$ 25', duration: '20 min', icon: <User className="w-8 h-8 text-[#aa8c2c]" /> },
    { id: 'combo', name: 'Corte + Barba', price: 'R$ 55', duration: '45 min', icon: <Scissors className="w-8 h-8 text-[#aa8c2c]" /> },
    { id: 'hidratacao', name: 'Hidratação', price: 'R$ 40', duration: '25 min', icon: <Clock className="w-8 h-8 text-[#aa8c2c]" /> },
    { id: 'sobrancelha', name: 'Sobrancelha', price: 'R$ 15', duration: '15 min', icon: <User className="w-8 h-8 text-[#aa8c2c]" /> },
    { id: 'vip', name: 'Pacote VIP', price: 'R$ 85', duration: '60 min', icon: <CheckCircle className="w-8 h-8 text-[#aa8c2c]" /> }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30'
  ];

  const handleNextStep = () => setStep(prev => prev + 1);
  const handlePrevStep = () => setStep(prev => prev - 1);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      toast({ title: "Dados incompletos", description: "Por favor, preencha todas as informações.", variant: "destructive" });
      return;
    }

    const newAppointment = {
      id: Date.now().toString(),
      clientName: user?.name || "Cliente Anônimo",
      clientPhone: user?.phone || "Não informado",
      services: selectedServices.map(id => services.find(s => s.id === id)?.name || ""),
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: "pending" as const,
      totalPrice: selectedServices.reduce((total, id) => {
        const service = services.find(s => s.id === id);
        return total + (service ? parseInt(service.price.replace(/\D/g, '')) : 0);
      }, 0),
    };

    const savedUserAppointments = localStorage.getItem('appointments');
    const userAppointments = savedUserAppointments ? JSON.parse(savedUserAppointments) : [];
    localStorage.setItem('appointments', JSON.stringify([...userAppointments, newAppointment]));

    const savedAdminAppointments = localStorage.getItem('adminAppointments');
    const adminAppointments = savedAdminAppointments ? JSON.parse(savedAdminAppointments) : [];
    localStorage.setItem('adminAppointments', JSON.stringify([...adminAppointments, newAppointment]));

    toast({ 
      title: "Agendamento solicitado!", 
      description: `Seu horário para ${newAppointment.date} às ${newAppointment.time} foi solicitado. Aguarde confirmação.` 
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const getBookedTimes = (date: Date | undefined) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    const savedAppointments = localStorage.getItem('appointments');
    const appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
    return appointments
      .filter((apt: any) => apt.date === dateStr)
      .map((apt: any) => apt.time);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceStep />;
      case 2:
        return <DateTimeStep />;
      case 3:
        return <ConfirmationStep />;
      default:
        return <ServiceStep />;
    }
  };

  const ServiceStep = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            onClick={() => toggleService(service.id)}
            className={`bg-black border border-gray-800 p-6 rounded-lg shadow-lg hover:border-[#aa8c2c] transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
              selectedServices.includes(service.id) ? "border-[#aa8c2c]" : ""
            }`}
          >
            {service.icon}
            <h3 className="text-xl font-cormorant text-white mt-4">{service.name}</h3>
            <p className="text-gray-400 text-sm">{service.duration}</p>
            <p className="text-2xl font-bold text-[#aa8c2c] mt-4">{service.price}</p>
            {selectedServices.includes(service.id) && (
              <div className="mt-2 w-6 h-6 rounded-full bg-[#aa8c2c] flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-black" />
              </div>
            )}
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleNextStep}
          disabled={selectedServices.length === 0}
          className="bg-[#aa8c2c] hover:bg-[#aa8c2c]/90 text-black font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300"
        >
          Avançar <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );

  const DateTimeStep = () => {
    const bookedTimes = getBookedTimes(selectedDate);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-black border-2 border-[#aa8c2c]/30 p-6 rounded-xl shadow-lg shadow-[#aa8c2c]/10 flex flex-col items-center">
          <div className="flex items-center mb-6 w-full justify-center">
            <CalendarIcon className="w-8 h-8 text-[#aa8c2c] mr-3" />
            <h2 className="text-2xl font-cormorant text-[#aa8c2c]">Escolha a Data</h2>
          </div>

          <CustomCalendar
            selected={selectedDate}
            onSelect={setSelectedDate}
          />

          <div className="mt-6 flex items-center justify-center space-x-4 w-full">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#aa8c2c] mr-2"></div>
              <span className="text-sm text-white">Disponível</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
              <span className="text-sm text-gray-400">Indisponível</span>
            </div>
          </div>
        </Card>

        <Card className="bg-black border border-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-cormorant text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-[#aa8c2c]" />
            Escolha o Horário
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => {
              const isBooked = bookedTimes.includes(time);
              return (
                <Button
                  key={time}
                  variant={isBooked ? "ghost" : selectedTime === time ? "default" : "outline"}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  disabled={isBooked}
                  className={`py-6 text-lg transition-all duration-300 ${
                    isBooked
                      ? "bg-gray-900 text-gray-600 cursor-not-allowed"
                      : selectedTime === time
                      ? "bg-[#aa8c2c] text-black hover:bg-[#aa8c2c]/90"
                      : "border-gray-600 bg-gray-800 text-white hover:border-[#aa8c2c] hover:text-[#aa8c2c]"
                  }`}
                >
                  {time}
                  {isBooked && <span className="ml-2 text-xs">(Ocupado)</span>}
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

  const ConfirmationStep = () => {
    const totalPrice = selectedServices.reduce((total, id) => {
      const service = services.find(s => s.id === id);
      return total + (service ? parseInt(service.price.replace(/\D/g, '')) : 0);
    }, 0);

    return (
      <Card className="bg-black border border-[#aa8c2c] p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 className="text-3xl font-cormorant text-white mb-6 text-center">Confirme seu Agendamento</h2>
        <div className="space-y-6 mb-8 text-lg">
          <div className="border-b border-gray-700 pb-3">
            <span className="text-gray-400">Serviços:</span>
            <ul className="mt-2 space-y-2">
              {selectedServices.map(id => {
                const service = services.find(s => s.id === id);
                return (
                  <li key={id} className="flex justify-between items-center">
                    <span className="text-white">{service?.name}</span>
                    <span className="text-[#aa8c2c]">{service?.price}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <span className="text-gray-400">Data:</span>
            <span className="text-white font-semibold">{selectedDate?.toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <span className="text-gray-400">Horário:</span>
            <span className="text-white font-semibold">{selectedTime}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-cormorant text-white">Total:</span>
            <span className="text-3xl font-bold text-[#aa8c2c]">R$ {totalPrice}</span>
          </div>
        </div>
        <Button onClick={handleBooking} className="w-full bg-[#aa8c2c] hover:bg-[#aa8c2c]/90 text-black font-bold text-lg py-7 rounded-lg transition-all duration-300 shadow-lg shadow-[#aa8c2c]/20">Confirmar</Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-black font-futura text-white">
      <header className="bg-black border-b border-[#aa8c2c] p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevStep}
              className="border-gold bg-black text-white hover:bg-gold hover:text-black mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          ) : (
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="border-gold bg-black text-white hover:bg-gold hover:text-black mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Início
              </Button>
            </Link>
          )}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-cormorant text-white uppercase tracking-widest truncate max-w-[50vw]">
            Agendar Horário
          </h1>
          <div className="w-24 flex items-center justify-end space-x-2">
            {[1, 2, 3].map(s => <div key={s} className={`w-3 h-3 rounded-full transition-all duration-300 ${step === s ? 'bg-[#aa8c2c]' : 'bg-gray-600'}`}></div>)}
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-12">
        {renderStep()}
        {step === 2 && <div className="flex justify-end mt-8"><Button onClick={handleNextStep} disabled={!selectedDate || !selectedTime} className="bg-white hover:bg-white/90 text-black font-bold text-lg py-4 px-8 rounded-lg transition-all duration-300">Próximo<ChevronRight className="w-5 h-5 ml-2" /></Button></div>}
      </div>
    </div>
  );
};

export default Booking;
