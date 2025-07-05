import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar as CalendarIcon, List, Clock, User, Phone, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { io } from "socket.io-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const navigate = useNavigate();

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
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        const updated = { ...apt, status: newStatus };
        
        // Atualiza adminAppointments no localStorage
        const adminAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
        const updatedAdmin = adminAppointments.map((a: Appointment) => 
          a.id === appointmentId ? updated : a
        );
        localStorage.setItem('adminAppointments', JSON.stringify(updatedAdmin));
        
        // Atualiza appointments (histórico do usuário) no localStorage
        const userAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const updatedUser = userAppointments.map((a: Appointment) => 
          a.id === appointmentId ? updated : a
        );
        localStorage.setItem('appointments', JSON.stringify(updatedUser));
        
        return updated;
      }
      return apt;
    });

    // Atualiza o estado local imediatamente usando uma cópia do array para forçar a re-renderização
    setAppointments([...updatedAppointments]);
    
    // Dispara um evento personalizado para sincronizar outras abas
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: newStatus === 'confirmed' ? "Agendamento confirmado!" : "Agendamento cancelado!",
      description: `O agendamento foi ${newStatus === 'confirmed' ? 'confirmado' : 'cancelado'} com sucesso.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500 bg-green-500/10 px-2 py-1 rounded';
      case 'cancelled': return 'text-red-500 bg-red-500/10 px-2 py-1 rounded';
      default: return 'text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded';
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

  const cleanupExpiredAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    const updatedAppointments = appointments.filter(apt => apt.date >= today);
    setAppointments(updatedAppointments);
    localStorage.setItem('adminAppointments', JSON.stringify(updatedAppointments));
  };

  useEffect(() => {
    cleanupExpiredAppointments();
    const interval = setInterval(cleanupExpiredAppointments, 86400000); // 24 horas
    return () => clearInterval(interval);
  }, [appointments]);

  const syncAppointments = () => {
    // Ler de ambas as chaves
    const userAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const adminAppointments = JSON.parse(localStorage.getItem('adminAppointments') || '[]');
    
    // Unificar os agendamentos
    const allAppointments = [...userAppointments, ...adminAppointments];
    
    // Remover duplicatas pelo ID
    const uniqueAppointments = allAppointments.filter(
      (appointment, index, self) =>
        index === self.findIndex(a => a.id === appointment.id)
    );

    // Atualizar o estado e o localStorage
    setAppointments(uniqueAppointments);
    localStorage.setItem('adminAppointments', JSON.stringify(uniqueAppointments));
  };

  // Chame esta função no useEffect de carregamento inicial
  useEffect(() => {
    syncAppointments();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'appointments' || e.key === 'adminAppointments') {
        syncAppointments();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const resetAllAppointments = () => {
    // Limpa os agendamentos no localStorage
    localStorage.removeItem('adminAppointments');
    localStorage.removeItem('appointments');
    
    // Atualiza o estado local para um array vazio
    setAppointments([]);
    
    // Dispara um evento para sincronizar outras abas
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Agendamentos resetados!",
      description: "Todos os agendamentos foram removidos com sucesso.",
    });
  };

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
        <div className="container mx-auto flex items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.href = "/"}
                className="border-gold text-gold hover:bg-gold hover:text-black"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-white whitespace-nowrap flex-grow text-center font-cormorant">
            Painel <span className="text-gold">Administrativo</span>
          </h1>
          <div className="flex items-center">
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
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                  inline
                  className="bg-gray-800 border border-gold/20 text-white rounded-lg p-2 w-full"
                  calendarClassName="bg-gray-800/90 border border-gold/20"
                  dayClassName={(date) => {
                    const dateStr = date.toISOString().split('T')[0];
                    const hasAppointment = appointments.some(apt => 
                      apt.date === dateStr && 
                      apt.status !== 'cancelled' &&
                      new Date(apt.date) >= new Date(new Date().setHours(0,0,0,0))
                    );
                    return hasAppointment ? '!bg-gold/30 !text-gold' : '';
                  }}
                />
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
                      className="bg-gray-800 border border-gray-700 rounded-lg p-4 w-full"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
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

                        <div className="text-center">
                          <Label className="text-gray-400">Serviço</Label>
                          <p className="text-white">{appointment.service}</p>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gold mr-2" />
                            <span className="text-white">{appointment.time}</span>
                          </div>
                          <div className="flex space-x-2">
                            {appointment.status === 'pending' ? (
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
                            ) : (
                              <span className={`text-sm ${getStatusColor(appointment.status)}`}>
                                {getStatusText(appointment.status)}
                              </span>
                            )}
                          </div>
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
