import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, User, Calendar as CalendarIcon, Scissors, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Historico = () => {
    const [appointments, setAppointments] = useState(() => {
        const savedAppointments = localStorage.getItem('appointments');
        return savedAppointments ? JSON.parse(savedAppointments) : [];
    });

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'appointments') {
                setAppointments(e.newValue ? JSON.parse(e.newValue) : []);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        console.log("Agendamentos no localStorage:", localStorage.getItem('appointments'));
        console.log("Agendamentos no estado:", appointments);
    }, [appointments]);

    const handleClearAppointments = () => {
        if (window.confirm("Tem certeza que deseja limpar todos os agendamentos?")) {
            localStorage.removeItem('appointments');
            setAppointments([]);
        }
    };

    return (
        <div className="min-h-screen bg-black">
            <header className="bg-black border-b border-gold/20 p-4 font-cormorant uppercase">
                <div className="container mx-auto flex items-center justify-between relative">
                    <Link to="/" className="flex-shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-gold bg-black text-white hover:bg-gold hover:text-black"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                        </Button>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-white text-center flex-grow px-4">
                        Histórico de <span className="text-gold">Agendamentos</span>
                    </h1>
                    <div className="flex-shrink-0 w-24"></div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <Card className="bg-black border-gold/20 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <CalendarIcon className="w-5 h-5 mr-2 text-gold" />
                            Seus Agendamentos
                        </h2>
                        {appointments.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearAppointments}
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                                <span className="hidden md:inline">Limpar Tudo</span>
                                <Trash2 className="w-4 h-4 md:hidden" />
                            </Button>
                        )}
                    </div>

                    {appointments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <p className="text-gray-400 text-lg mb-4">Você ainda não possui agendamentos.</p>
                            <Link to="/booking">
                                <Button className="bg-gold hover:bg-gold/80 text-black">
                                    Agendar Horário
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <Card key={appointment.id} className="bg-gray-800/50 border-gold/20 p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="flex items-center">
                                            <Scissors className="w-4 h-4 mr-2 text-gold" />
                                            <span className="text-white">{appointment.service}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <CalendarIcon className="w-4 h-4 mr-2 text-gold" />
                                            <span className="text-white">{appointment.date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-gold" />
                                            <span className="text-white">{appointment.time}</span>
                                        </div>
                                        <div>
                                            <span 
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    appointment.status === "pending" 
                                                        ? "bg-yellow-500/20 text-yellow-400" 
                                                        : appointment.status === "confirmed" 
                                                            ? "bg-green-500/20 text-green-400" 
                                                            : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {appointment.status === "pending" ? "Pendente" : appointment.status === "confirmed" ? "Confirmado" : "Cancelado"}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Historico;