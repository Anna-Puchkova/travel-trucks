"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import styles from "./CamperGallery.module.css";
type GalleryImage = { id: string; thumb: string; original: string };
export default function CamperGallery({
  gallery,
  name,
}: {
  gallery: GalleryImage[];
  name: string;
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  if (!gallery || gallery.length === 0) {
    return null;
  }
  return (
    <div className={styles.galleryWrapper}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={
          thumbsSwiper && !thumbsSwiper.destroyed
            ? { swiper: thumbsSwiper }
            : undefined
        }
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainSwiper}
      >
        {gallery.map((image, index) => (
          <SwiperSlide key={image.id} className={styles.mainSlide}>
            <Image
              src={image.original || image.thumb}
              alt={`${name} photo ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 600px"
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={32}
        slidesPerView="auto"
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbsSwiper}
      >
        {gallery.map((image, index) => (
          <SwiperSlide key={image.id} className={styles.thumbSlide}>
            <Image
              src={image.thumb || image.original}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              sizes="136px"
              className={styles.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
