import { useEffect, useState } from "react";
import Carousel from "nuka-carousel"

export default function ImageCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/17812839/pexels-photo-17812839/free-photo-of-rustic-bar-counter-with-coffee-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Description for first event',
    },
    {
      image: 'https://images.pexels.com/photos/5812847/pexels-photo-5812847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Description for second event',
    },
    {
      image: 'https://images.pexels.com/photos/2293369/pexels-photo-2293369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Description for third event',
    },
    {
      image: 'https://images.pexels.com/photos/8936830/pexels-photo-8936830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Description for fourth event',
    },
  ];


  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const autoplayInterval = 8000;

  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, []);

  return (
    <>
      <div className="relative bg-[#1E1423] h-[100vh] text-white px-12">
        <button onClick={prevSlide} className=" rounded-full flex justify-center items-center absolute left-7 z-10 top-1/2 transform -translate-y-1/2 text-5xl">&lt;</button>
        <button onClick={nextSlide} className=" rounded-full flex justify-center items-center absolute right-7 z-10 top-1/2 transform -translate-y-1/2 text-5xl">&gt;</button>
        <div className="carousel grid grid-cols-2 gap-4 h-[600px]">
          {slides.slice(currentSlide, currentSlide + 2).map((slide, index) => (
            <div key={index} className="p-4 rounded-lg">

              {/* <img src={slide.image} alt={`Slide ${currentSlide + index + 1}`} className="h-[400px] mx-auto" /> */}
              <div className="rounded-lg border-2 border-[#380B60]">
                <Carousel
                  autoplay={true} // Enable autoplay
                  autoplayInterval={2000}
                  wrapAround={true}>
                  <img src="https://images.pexels.com/photos/17812839/pexels-photo-17812839/free-photo-of-rustic-bar-counter-with-coffee-machine.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="rounded-lg" />
                  <img src="https://images.pexels.com/photos/5812847/pexels-photo-5812847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="rounded-lg" />
                  <img src="https://images.pexels.com/photos/2293369/pexels-photo-2293369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="rounded-lg" />
                  <img src="https://images.pexels.com/photos/8936830/pexels-photo-8936830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="rounded-lg" />
                </Carousel>
              </div>
              <p className='mt-1 ml-1 text-2xl font-bold text-[#2AF1FF]'>Title</p>
              <p className="mt-2 ml-1">{slide.description}</p>

              <button className='border rounded-lg px-1 border-dotted border-[#2AF1FF] mt-3 text-[#2AF1FF]'>More -&gt;</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
