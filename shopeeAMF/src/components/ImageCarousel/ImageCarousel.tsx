import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./ImageCarousel.module.scss"; // <- Importa o SCSS
import { useNavigate } from "react-router";

interface ImageCarouselProps {
  images: string[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const navigate = useNavigate();
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={3.2}
      className={styles.swiperContainer}
      spaceBetween={9}
      loop
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            onClick={() => navigate("/shop")}
            src={src}
            alt={`Slide ${index}`}
            className={styles.carouselImage}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
