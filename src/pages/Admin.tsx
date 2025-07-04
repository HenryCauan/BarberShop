import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar as CalendarIcon, List, Clock, User, Phone, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { io } from "socket.io-client";

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const Admin = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Carregar agendamentos do localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('adminAppointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Atualizar quando o localStorage mudar
  useEffect(() => {
    const handleStorageChange = () => {
      const savedAppointments = localStorage.getItem('adminAppointments');
      if (savedAppointments) {
        setAppointments(JSON.parse(savedAppointments));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filtrar agendamentos por data selecionada
  const filteredAppointments = appointments.filter(apt => {
    if (selectedDate) {
      return apt.date === selectedDate.toISOString().split('T')[0];
    }
    return true;
  });

  const handleStatusChange = (appointmentId: string, newStatus: 'confirmed' | 'cancelled') => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      )
    );

    toast({
      title: newStatus === 'confirmed' ? "Agendamento confirmado!" : "Agendamento cancelado!",
      description: `O agendamento foi ${newStatus === 'confirmed' ? 'confirmado' : 'cancelado'} com sucesso.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500';
      case 'cancelled': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'cancelled': return 'Cancelado';
      default: return 'Pendente';
    }
  };

  useEffect(() => {
    const socket = io('URL_DO_SEU_SERVIDOR_WEBSOCKET');
    socket.on('newAppointment', (appointment) => {
      if (Notification.permission === 'granted') {
        new Notification('Novo Agendamento', {
          body: `Cliente: ${appointment.clientName}, Horário: ${appointment.time}`,
        });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Permissão para notificações concedida');
        }
      });
    }
  }, []);

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gray-900 border-gold/20 p-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Acesso Negado</h1>
          <p className="text-gray-400 mb-6">Você não tem permissão para acessar esta página.</p>
          <Link to="/">
            <Button className="bg-gold hover:bg-gold/80 text-black">
              Voltar ao Início
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gold/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-gold hover:text-black mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-white">
              Painel <span className="text-gold">Administrativo</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={logout} className="border-gold text-gold hover:bg-gold hover:text-black">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filtros e Controles */}
          <Card className="bg-gray-900/50 border-gold/20 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Filtros</h2>
            
            <div className="space-y-4">
              <div>
                <Label className="text-white mb-2 block">Visualização</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-gold text-black' : 'border-gold text-gold'}
                  >
                    <List className="w-4 h-4 mr-2" />
                    Lista
                  </Button>
                  <Button
                    variant={viewMode === 'calendar' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('calendar')}
                    className={viewMode === 'calendar' ? 'bg-gold text-black' : 'border-gold text-gold'}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Calendário
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">Filtrar por Data</Label>
              </div>
            </div>
          </Card>

          {/* Lista de Agendamentos */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900/50 border-gold/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Agendamentos {selectedDate && `- ${selectedDate.toLocaleDateString('pt-BR')}`}
                </h2>
                <span className="text-gold font-semibold">
                  {filteredAppointments.length} agendamento(s)
                </span>
              </div>

              <div className="space-y-4">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Nenhum agendamento encontrado para esta data.</p>
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <div className="flex items-center mb-2">
                            <User className="w-4 h-4 text-gold mr-2" />
                            <span className="text-white font-semibold">{appointment.clientName}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 text-gold mr-2" />
                            <span className="text-gray-400">{appointment.clientPhone}</span>
                          </div>
                        </div>

                        <div>
                          <Label className="text-gray-400">Serviço</Label>
                          <p className="text-white">{appointment.service}</p>
                        </div>

                        <div>
                          <div className="flex items-center mb-2">
                            <Clock className="w-4 h-4 text-gold mr-2" />
                            <span className="text-white">{appointment.time}</span>
                          </div>
                          <span className={`font-semibold ${getStatusColor(appointment.status)}`}>
                            {getStatusText(appointment.status)}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Confirmar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Cancelar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
