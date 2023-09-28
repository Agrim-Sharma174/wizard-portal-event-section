import { useEffect, useState } from "react";
import Carousel from "nuka-carousel"

export default function ImageCarousel({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0); // Index of the current slide
  const [visibility, setVisibility] = useState(1); // Number of visible slides, used in the useEffect

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
    const autoplayTimer = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => {
      clearInterval(autoplayTimer);
    };
  }, []);

  useEffect(() => {
    // Function to update visibility based on window width
    const updateVisibility = () => {
      if (window.innerWidth > 768) {
        setVisibility(2);
      } else {
        setVisibility(1);
      }
    };

    // Initial update
    updateVisibility();

    // event listener for window resize
    window.addEventListener("resize", updateVisibility);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <>
      <div className="relative bg-[#1E1423] h-[100vh] text-white px-12">
        <button onClick={prevSlide} className=" rounded-full flex justify-center items-center absolute left-7 z-10 top-1/2 transform -translate-y-1/2 text-5xl">&lt;</button>
        <button onClick={nextSlide} className=" rounded-full flex justify-center items-center absolute right-7 z-10 top-1/2 transform -translate-y-1/2 text-5xl">&gt;</button>
        <div className="carousel grid grid-cols-1 md:grid-cols-2 gap-4 h-[600px]">
          {/* map through the slides and show them, the visibleSlides state changed from the ueEffect- handleResize is used here to slice the slides according to screen size */}
          {slides.slice(currentSlide, currentSlide + visibility).map((slide, index) => (
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
