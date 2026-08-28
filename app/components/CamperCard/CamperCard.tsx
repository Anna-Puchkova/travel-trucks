"use client";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiStar, FiHeart } from "react-icons/fi";
import { Camper } from "@/app/types/camper";
import styles from "./CamperCard.module.css";
interface CamperCardProps {
  camper: Camper;
}
export default function CamperCard({ camper }: CamperCardProps) {
  const image = camper.gallery?.[0]?.thumb || camper.gallery?.[0]?.original;
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {image && (
          <Image
            src={image}
            alt={camper.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.image}
          />
        )}
        <button
          type="button"
          className={styles.favoriteButton}
          aria-label="Add camper to favorites"
        >
          <FiHeart size={20} />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{camper.name}</h2>
          <span className={styles.price}> €{camper.price} </span>
        </div>
        <div className={styles.meta}>
          <span className={styles.rating}>
            <FiStar className={styles.star} /> {camper.rating} (
            {camper.totalReviews})
          </span>
          <span className={styles.location}>
            <FiMapPin /> {camper.location}
          </span>
        </div>
        <p className={styles.description}> {camper.description} </p>
        <div className={styles.amenities}>
          {camper.amenities?.slice(0, 4).map((amenity) => (
            <span key={amenity} className={styles.amenity}>
              {amenity}
            </span>
          ))}
        </div>
        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMore}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
