const Gallery = () => {
    return (
        <>
            <section className="w-full min-h-screen bg-black flex flex-col justify-center items-center text-white py-12">
                <div className="w-full text-center text-7xl font-cormorant py-12 border-y-[1px] border-gray-500 mb-14">GALERIA</div>
                <div className="w-full max-h-[150vh] grid grid-cols-5 grid-rows-12 gap-8 px-12">
                    <div className="col-span-5 row-span-3 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-3 row-span-3 row-start-4 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 2" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-4 row-start-4 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 3" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-3 row-span-3 col-start-3 row-start-7 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 4" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-1 row-start-7 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 5" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2 row-span-3 row-start-10 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 6" className="w-full h-full object-cover" />
                    </div>
                    <div className="col-span-2 row-span-3 col-start-4 row-start-10 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 7" className="w-full h-full object-cover" />
                    </div>
                    <div className="row-span-3 col-start-3 row-start-10 overflow-hidden">
                        <img src="/image(1).png" alt="Galeria 8" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Gallery;