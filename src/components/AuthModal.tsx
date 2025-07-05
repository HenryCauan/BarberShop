import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Lock, Eye, EyeOff } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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

      const { data: emailExists } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .single();

      if (emailExists) {
        toast({
          title: "Erro no cadastro",
          description: "Este e-mail já está em uso.",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      const { data: phoneExists } = await supabase
        .from('users')
        .select('phone')
        .eq('phone', formData.phone)
        .single();

      if (phoneExists) {
        toast({
          title: "Erro no cadastro",
          description: "Este telefone já está em uso.",
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
      if (!formData.email.trim() || !formData.password.trim()) {
        toast({
          title: "Erro no login",
          description: "Email e senha são obrigatórios",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      if (formData.email === 'admin@barbershop.com' && formData.password === 'admin') {
        toast({
          title: "Login de Administrador",
          description: "Bem-vindo, Administrador!",
        });

        onAuthSuccess({
          name: 'Administrador',
          phone: '999999999',
          email: 'admin@barbershop.com',
          isAdmin: true
        });

        setFormData({ name: '', phone: '', email: '', password: '' });
        onClose();
        setIsSubmitting(false);
        return;
      }

  
      try {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (loginError) {
          if (loginError.message.includes("Email not confirmed")) {
            toast({
              title: "E-mail não confirmado",
              description: (
                <div className="flex flex-col space-y-2">
                  <p>Por favor, verifique seu e-mail e confirme sua conta antes de fazer login.</p>
                  <Button
                    variant="ghost"
                    onClick={() => handleResendConfirmationEmail(formData.email)}
                    className="text-gold hover:text-gold/80 w-full"
                  >
                    Reenviar e-mail de confirmação
                  </Button>
                </div>
              ),
              variant: "destructive",
            });
          } else {
            throw new Error(loginError.message);
          }
          setIsSubmitting(false);
          return;
        }

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('name, phone, email, isAdmin')
          .eq('email', loginData.user?.email || '')
          .single();

        if (userError) throw new Error(userError.message);

        toast({
          title: "Login realizado!",
          description: `Bem-vindo, ${userData?.name || 'cliente'}!`,
        });

        onAuthSuccess({
          name: userData?.name || 'Cliente',
          phone: userData?.phone || formData.phone,
          email: userData?.email || '',
          isAdmin: userData?.isAdmin || false
        });

        setFormData({ name: '', phone: '', email: '', password: '' });
        onClose();
        setIsSubmitting(false);

      } catch (error: any) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive"
        });
        setIsSubmitting(false);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleResendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast({
        title: "E-mail de confirmação reenviado",
        description: "Verifique sua caixa de entrada.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao reenviar e-mail",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, insira seu e-mail para redefinir a senha.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "E-mail enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao enviar e-mail",
        description: error.message,
        variant: "destructive",
      });
    }
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

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
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
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Senha *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gold" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="bg-gray-800 border-gold/20 text-white pl-10 pr-10 focus:border-gold"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gold hover:text-gold/80"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <>
              <div className="text-xs text-center text-gray-400 -mt-2">
                <p>Admin Email: admin@barbershop.com</p>
                <p>Admin Senha: admin</p>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleForgotPassword}
                  className="text-gold hover:text-gold/80"
                >
                  Esqueci minha senha
                </Button>
              </div>
            </>
          )}

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
