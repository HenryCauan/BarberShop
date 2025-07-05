# 💇‍♂️ BarberShop

Uma aplicação web moderna e elegante para gerenciamento de barbearias, oferecendo uma experiência completa tanto para clientes quanto para proprietários.


## 🛠️ Tecnologias Utilizadas

- **Frontend Framework**: React 18 com TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animações**: GSAP (GreenSock Animation Platform)
- **Autenticação**: Sistema de login/registro
- **Gerenciamento de Estado**: Context API / Redux (conforme implementado)
- **Roteamento**: React Router DOM

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Git

## 🔧 Instalação

**Clone o repositório**
```bash
git clone https://github.com/HenryCauan/BarberShop.git
cd BarberShop
```

 **Instale as dependências**
```bash
npm install
# ou
yarn install
```

**Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface
│   ├── forms/          # Componentes de formulários
│   └── layout/         # Componentes de layout
├── pages/              # Páginas da aplicação
│   ├── Home/           # Página inicial
│   ├── Login/          # Autenticação
│   ├── Booking/        # Agendamento
│   └── Dashboard/      # Painel administrativo
├── hooks/              # Custom hooks
├── context/            # Context providers
├── services/           # Serviços de API
├── utils/              # Utilitários
├── types/              # Definições TypeScript
└── styles/             # Estilos globais
```

## 🎨 Design e UX

O projeto segue princípios de design moderno com:

- **Design System**: Componentes consistentes e reutilizáveis
- **Responsividade**: Adaptação perfeita para mobile, tablet e desktop
- **Acessibilidade**: Implementação de boas práticas de acessibilidade
- **Micro-animações**: Transições suaves com GSAP para melhor experiência


## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria a build de produção
npm run preview      # Preview da build de produção
npm run lint         # Executa o linter
npm run type-check   # Verifica os tipos TypeScript
```

## 🔍 Padrões de Código

- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **TypeScript**: Tipagem estática
- **Conventional Commits**: Padrão de commits

## 📚 Recursos Adicionais

- [Documentação do React](https://react.dev/)
- [Guia do Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP Documentation](https://greensock.com/docs/)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Henry Cauan**
- GitHub: [@HenryCauan](https://github.com/HenryCauan)
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

## 📞 Suporte

Se você tiver alguma dúvida ou problema, por favor abra uma [issue](https://github.com/HenryCauan/BarberShop/issues) no GitHub.

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
