import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Clock, User, Calendar as CalendarIcon, Scissors } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Historico = () => {
    // Ler os agendamentos do localStorage
    const [appointments, setAppointments] = useState(() => {
        const savedAppointments = localStorage.getItem('appointments');
        return savedAppointments ? JSON.parse(savedAppointments) : [];
    });

    // Atualizar quando o localStorage mudar
    useEffect(() => {
        const handleStorageChange = () => {
            const savedAppointments = localStorage.getItem('appointments');
            setAppointments(savedAppointments ? JSON.parse(savedAppointments) : []);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <header className="bg-black border-b border-gold/20 p-4 font-cormorant uppercase">
                <div className="container mx-auto flex items-center justify-center relative">
                    <Link to="/" className="absolute left-0">
                        <Button variant="outline" size="sm" className="border-gold bg-black text-white hover:bg-gold hover:text-black mr-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">
                        Histórico de <span className="text-gold">Agendamentos</span>
                    </h1>
                </div>
            </header>

            {/* Container do Histórico */}
            <div className="container mx-auto px-4 py-8">
                <Card className="bg-black border-gold/20 p-6">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                        <CalendarIcon className="w-5 h-5 mr-2 text-gold" />
                        Seus Agendamentos
                    </h2>

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
                                                        : appointment.status === "Concluído" 
                                                            ? "bg-green-500/20 text-green-400" 
                                                            : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {appointment.status === "pending" ? "Pendente" : appointment.status}
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