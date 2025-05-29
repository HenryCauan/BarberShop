import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode: (mode: 'login' | 'register') => void;
  onAuthSuccess: (user: { name: string; phone: string; email: string; isAdmin: boolean }) => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode, onAuthSuccess }: AuthModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    if (mode === 'register') {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.password.trim()) {
        toast({
          title: "Erro no cadastro",
          description: "Todos os campos são obrigatórios",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
              phone: formData.phone,
            }
          }
        });

        if (authError) throw new Error(authError.message);

        const { error: dbError } = await supabase.from('users').insert([{
          name: formData.name,
          phone: formData.phone,
          email: formData.email
        }]);

        if (dbError) throw new Error(dbError.message);

        toast({
          title: "Cadastro realizado!",
          description: "Conta criada com sucesso!",
        });

        onAuthSuccess({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          isAdmin: false
        });

        setFormData({ name: '', phone: '', email: '', password: '' });
        onClose();

      } catch (error: any) {
        if (error.message.includes("429")) {
          toast({
            title: "Muitas requisições",
            description: "Aguarde um momento antes de tentar novamente.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }

    if (mode === 'login') {
      if (!formData.phone.trim() || !formData.password.trim()) {
        toast({
          title: "Erro no login",
          description: "Telefone e senha são obrigatórios",
          variant: "destructive"
        });
        return;
      }

      // Verificar se é login de administrador
      if (formData.phone === '999999999' && formData.password === 'admin') {
        toast({
          title: "Login de Administrador",
          description: "Bem-vindo, Administrador!",
        });

        onAuthSuccess({
          name: 'Administrador',
          phone: formData.phone,
          email: 'admin@barbershop.com',
          isAdmin: true
        });

        setFormData({ name: '', phone: '', email: '', password: '' });
        onClose();
        return;
      }

      // Login normal usando Supabase Auth
      try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (loginError) throw new Error(loginError.message);

        const user = loginData.user;
        toast({
          title: "Login realizado!",
          description: `Bem-vindo, ${user.user_metadata.name || 'cliente'}!`,
        });

        onAuthSuccess({
          name: user.user_metadata.name || 'Cliente',
          phone: user.user_metadata.phone || formData.phone,
          email: user.email || '',
          isAdmin: false
        });

        setFormData({ name: '', phone: '', email: '', password: '' });
        onClose();

      } catch (error: any) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive"
        });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gold/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gold">
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome Completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gold" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-gray-800 border-gold/20 text-white pl-10 focus:border-gold"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Telefone *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-gold" />
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-gray-800 border-gold/20 text-white pl-10 focus:border-gold"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-gold" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-gray-800 border-gold/20 text-white pl-10 focus:border-gold"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Senha *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gold" />
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-gray-800 border-gold/20 text-white pl-10 focus:border-gold"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gold hover:bg-gold/80 text-black font-semibold"
            disabled={isSubmitting}
          >
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </Button>

          <div className="text-center">
            <span className="text-gray-400">
              {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            </span>
            <Button
              type="button"
              variant="link"
              onClick={() => onSwitchMode(mode === 'login' ? 'register' : 'login')}
              className="text-gold hover:text-gold/80 ml-1"
            >
              {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
