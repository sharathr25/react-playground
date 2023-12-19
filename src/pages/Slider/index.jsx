import React, { useEffect, useRef, useState } from "react";
import classes from "./index.module.scss";

const SLIDES = [
  { title: "slide 1" },
  { title: "slide 2" },
  { title: "slide 3" },
  { title: "slide 4" },
  { title: "slide 5" },
];
const SIZE = 100;

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const interValRef = useRef();
  const firstIndex = 0;
  const lastIndex = SLIDES.length - 1;
  const numberOfSlides = SLIDES.length;
  const slideSize = { width: SIZE, height: SIZE };

  const renderSlide = (slide, i) => {
    return (
      <div
        className={classes.slide}
        style={{ right: (activeIndex - i) * SIZE, slideSize }}
        key={slide.title}
      >
        {slide.title}
      </div>
    );
  };

  const onClickPrev = () => {
    setActiveIndex((i) => i - 1);
  };

  const onClickNext = () => {
    setActiveIndex((i) => i + 1);
  };

  const onClickPlay = () => {
    setIsPlaying(true);
    interValRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % numberOfSlides);
    }, 1000);
  };

  const onClickStop = () => {
    setIsPlaying(false);
    clearInterval(interValRef.current);
  };

  useEffect(() => {
    return () => {
      if (interValRef.current) clearInterval(interValRef.current);
    };
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.slides} style={slideSize}>
        {SLIDES.map(renderSlide)}
      </div>
      <div className={classes.actions}>
        <button
          disabled={isPlaying || activeIndex === firstIndex}
          onClick={onClickPrev}
        >
          prev
        </button>
        <button
          disabled={isPlaying || activeIndex === lastIndex}
          onClick={onClickNext}
        >
          next
        </button>
        <button disabled={isPlaying} onClick={onClickPlay}>
          play
        </button>
        <button disabled={!isPlaying} onClick={onClickStop}>
          stop
        </button>
      </div>
    </div>
  );
};

export default Slider;
