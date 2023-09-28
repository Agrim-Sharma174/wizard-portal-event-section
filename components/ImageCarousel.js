import { useEffect, useState } from "react";
import Carousel from "nuka-carousel"

export default function ImageCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0); // Index of the current slide
  const [visibleSlides, setVisibleSlides] = useState(2); // Number of visible slides, used in the useEffect

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

  // Next Slide Handler, when clicked on the next button or when the autoplay is enabled
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Previous Slide Handler, when clicked on the previous button
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const autoplayInterval = 8000; // autoplay interval, can be changed in miliseconds


  useEffect(() => {
    //useEffect hook to enable autoplay
    const autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, []);

  useEffect(() => {
    // useEffect to show the slides based on screen size
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVisibleSlides(1); // Show only 1 slide on small screens
      } else {
        setVisibleSlides(2); // Show 2 slides on medium and larger screens
      }
    };

    handleResize();

    // window listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative bg-[#1E1423] h-[100vh] text-white px-12 flex justify-center items-center">

        {/* Buttons to navigate through the slides */}
        <button onClick={prevSlide} className=" rounded-full flex justify-center items-center absolute left-7 z-10 top-[50%] text-5xl">&lt;</button>
        <button onClick={nextSlide} className=" rounded-full flex justify-center items-center absolute right-7 top-[50%] z-10  text-5xl">&gt;</button>

        {/* Carousel */}
        <div className={`carousel grid grid-cols-${visibleSlides} gap-4 h-[600px]`}>
          {/* map through the slides and show them, the visibleSlides state changed from the ueEffect- handleResize is used here to slice the slides according to screen size */}
          {slides.slice(currentSlide, currentSlide + visibleSlides).map((slide, index) => (
            <div key={index} className="p-4 rounded-lg">
              <div className="rounded-lg border-2 border-[#380B60]">
                <Carousel
                  autoplay={true}
                  autoplayInterval={2000}
                  wrapAround={true}>
                  <img src={slide.image} className="rounded-lg" alt={`Slide ${currentSlide + index + 1}`} />
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
