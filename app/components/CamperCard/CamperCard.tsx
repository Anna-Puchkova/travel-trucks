"use client";

import Link from "next/link";

import { Camper } from "@/app/types/camper";

import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={camper.coverImage} alt={camper.name} />

      <div className={styles.content}>
        <div className={styles.top}>
          <div>
            <h3 className={styles.name}>{camper.name}</h3>

            <div className={styles.meta}>
              <span>⭐ {camper.rating}</span>

              <span>({camper.totalReviews} Reviews)</span>

              <span>│</span>

              <svg className={styles.locationIcon}>
                <use href="/symbol.svg#icon-Map" />
              </svg>

              <span className={styles.location}>{camper.location}</span>
            </div>
          </div>

          <p className={styles.price}>€{camper.price}</p>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.tags}>
          <span>
            <svg className={styles.locationIcon}>
              <use href="/symbol.svg#icon-Property-1petrol" />
            </svg>
            {camper.engine}
          </span>
          <span>
            <svg className={styles.locationIcon}>
              <use href="/symbol.svg#icon-Property-1automatic" />
            </svg>
            {camper.transmission}
          </span>
          <span>
            <svg className={styles.locationIcon}>
              <use href="/symbol.svg#icon-Property-1alcove" />
            </svg>
            {camper.form}
          </span>
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
