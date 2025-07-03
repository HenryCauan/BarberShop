import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  useEffect(() => {
    // Seleciona todas as imagens da galeria
    const galleryImages = gsap.utils.toArray(".gallery-img");

    // Aplica a animação a cada imagem
    galleryImages.forEach((img: any) => {
      gsap.fromTo(
        img,
        { scale: 0.8, opacity: 0 }, // Estado inicial
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: img,
            start: "top 80%", // Quando o topo da imagem estiver a 80% da viewport
            toggleActions: "play none none none", // Só toca a animação uma vez
          },
        }
      );
    });
  }, []);

  return (
    <>
      <section className="w-full min-h-screen bg-black flex flex-col justify-center items-center text-white py-12">
        <div className="w-full text-center text-7xl font-cormorant py-12 border-y-[1px] border-gray-500 mb-14">
          GALERIA
        </div>
        <div className="w-full max-h-[200vh] grid grid-cols-5 grid-rows-12 gap-8 px-2 md:px-12">
          <div className="col-span-5 row-span-3 overflow-hidden">
            <img
              src="/barba-de-corte-de-homem-bonito-em-um-salao-de-barbeiro.jpg"
              alt="Galeria 1"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="col-span-3 row-span-3 row-start-4 overflow-hidden">
            <img
              src="/jovem-estilista-na-barbearia.jpg"
              alt="Galeria 2"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="col-span-2 row-span-3 col-start-4 row-start-4 overflow-hidden">
            <img
              src="/ferramentas-para-profissao-de-cabeleireiro.jpg"
              alt="Galeria 3"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="col-span-3 row-span-3 col-start-3 row-start-7 overflow-hidden">
            <img
              src="/cliente-fazendo-o-corte-de-cabelo-em-um-salao-de-barbearia.jpg"
              alt="Galeria 4"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="col-span-2 row-span-3 col-start-1 row-start-7 overflow-hidden">
            <img
              src="/Фото для барбшершопа.jpeg"
              alt="Galeria 5"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="col-span-3 md:col-span-2 row-span-3 row-start-10 overflow-hidden">
            <img
              src="/cortando2.jpeg"
              alt="Galeria 6"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="col-span-2 row-span-3 col-start-4 row-start-10 overflow-hidden">
            <img
              src="/cortando.jpeg"
              alt="Galeria 7"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
          <div className="row-span-3 col-start-3 row-start-10 overflow-hidden md:visible hidden">
            <img
              src="/pretocortado.jpeg"
              alt="Galeria 8"
              className="w-full h-full object-cover gallery-img"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Gallery;