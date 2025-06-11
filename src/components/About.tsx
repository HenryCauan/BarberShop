import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



const About = () => {

  useEffect(() => {
    gsap.fromTo(
      '.section-three',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        scrollTrigger: {
          trigger: '.section-three',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section id="about" className="py-20 bg-black section-three">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center font-futura" >
          <div>
            <h2 className="text-4xl md:text-8xl font-cormorant text-white mb-6">
              TRADICAO E <span className="text-gold">EXCELENCIA</span>
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Há mais de 15 anos oferecendo os melhores serviços de barbearia da cidade. 
              Nossa equipe de profissionais qualificados está sempre pronta para proporcionar 
              uma experiência única e memorável.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Combinamos técnicas tradicionais com as mais modernas tendências do mercado, 
              garantindo que cada cliente saia satisfeito e com visual impecável.
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">15+</div>
                <div className="text-sm text-gray-400">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">5000+</div>
                <div className="text-sm text-gray-400">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">100%</div>
                <div className="text-sm text-gray-400">Qualidade Garantida</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img src="/image(7).png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
