import { Card } from "@/components/ui/card";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Contact: React.FC = () => {

  useEffect(() => {
    gsap.fromTo(
      '.section-four',
      { opacity: 0,},
      {
        opacity: 1,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '.section-four',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <>
      <section id="contact" className="w-full min-h-screen md:min-h-[50vh] grid md:grid-cols-2 grid-cols-1 text-white px-6 py-12 mt-12 section-four">
        <div className="w-full h-full flex-1 px-8 flex flex-col justify-between py-12 border-y-[1px] md:border-r-[1px] font-cormorant text-5xl">
          <h1>Barbearia</h1>
          <h1>Entre em Contato <br />Conosco</h1>
        </div>
        <div className="w-full h-full flex-1 px-8 flex md:flex-row flex-col justify-end md:items-center py-12 border-y-[1px] gap-32 font-futura">
          <div className="relative flex flex-col gap-4">
            <div className="flex flex-col">
              <span>(11) 3456-7890</span>
              <span>barbearia@meusite.com</span>
            </div>
            <div className="">
              <span>Dom Avelar, Petrolina - PE,</span>
              <span>Brasil</span>
            </div>
            <div className="flex relative top-3 gap-4">
              <Instagram className="w-6 h-6" />
              <Facebook className="w-6 h-6" />
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="border-b-[1px] border-white">Política de Privacidade</span>
            <span className="border-b-[1px] border-white">Declaração de acessibilidade</span>
            <span className="border-b-[1px] border-white">Termos e Condições</span>
            <span className="border-b-[1px] border-white">Política de Reembolso</span>
          </div>
        </div>
        <div className="text-white bg-black font-futura">
          <p className="absolute py-2 md:py-6 right-0  px-6">© 2035 by Barbearia. Powered and secured by Wix</p>
        </div>
      </section>
    </>
  );
};

export default Contact;
