import { useEffect, useState } from "react";
import carouselStyle from "./Carousel.module.css";

const Carousel = () => {
  const images = [
    "https://res.cloudinary.com/djw5fw1xp/image/upload/v1781270354/chat2_ngfhuf.jpg",
    "https://res.cloudinary.com/djw5fw1xp/image/upload/v1781270352/Chat1_dczdyx.jpg",
    "https://res.cloudinary.com/djw5fw1xp/image/upload/v1781270352/chat3_gktq1y.jpg",
  ];

  const [curImage, setCurImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={carouselStyle.carousel}>
      <div
        className={carouselStyle.slider}
        style={{
          transform: `translateX(-${curImage * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className={carouselStyle.image}
          />
        ))}
      </div>
      <div className={carouselStyle.overlay}></div>
    </div>
  );
};

export default Carousel;
