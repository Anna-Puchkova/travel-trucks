"use client";

import { use, useEffect, useState } from "react";
import { fetchCamperById, getReviews } from "@/app/lib/api";
import { Camper, Review } from "@/app/types/camper";
import CamperGallery from "@/app/components/CamperGallery/CamperGallery";
import RatingStars from "@/app/components/RatingStars/RatingStars";
import BookingForm from "@/app/components/BookingForm/BookingForm";
import Loader from "@/app/components/Loader/Loader";
import styles from "./page.module.css";

export default function PageCamperId({
  params,
}: {
  params: Promise<{ camperId: string }>;
}) {
  const resolvedParams = use(params);
  const camperId = resolvedParams.camperId;
  const [camper, setCamper] = useState<Camper | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!camperId) {
      setLoading(false);
      return;
    }
    const loadCamper = async () => {
      try {
        const camperData = await fetchCamperById(camperId);
        setCamper(camperData);
        try {
          const reviewsData = await getReviews(camperId);
          setReviews(reviewsData);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch camper:", error);
        setCamper(null);
      } finally {
        setLoading(false);
      }
    };
    loadCamper();
  }, [camperId]);

  if (loading) {
    return <Loader />;
  }

  if (!camper) {
    return <div>Camper not found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.leftColumn}>
          <CamperGallery gallery={camper.gallery || []} name={camper.name} />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.infoCard}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.meta}>
              <span>
                <svg className={styles.locationIcon}>
                  <use href="/symbol.svg#icon-Property-1Default" />
                </svg>
                {camper.rating} ({camper.totalReviews} Reviews)
              </span>
              <span>
                <svg className={styles.locationIcon}>
                  <use href="/symbol.svg#icon-Map" />
                </svg>
                {camper.location}
              </span>
            </div>
            <div className={styles.price}> €{camper.price} </div>
            <p className={styles.description}> {camper.description} </p>
          </div>

          <div className={styles.detailsCard}>
            <h3 className={styles.cardTitle}>Vehicle details</h3>

            <ul className={styles.categoriesList}>
              {camper.transmission && (
                <li className={styles.categoryBadge}>{camper.transmission}</li>
              )}

              {camper.engine && (
                <li className={styles.categoryBadge}>{camper.engine}</li>
              )}

              {camper.amenities?.map((amenity) => (
                <li key={amenity} className={styles.categoryBadge}>
                  {amenity}
                </li>
              ))}
            </ul>

            <dl className={styles.specsList}></dl>
            <div className={styles.specRow}>
              <dt>Form</dt> <dd>{camper.form || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Length</dt> <dd>{camper.length || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Width</dt> <dd>{camper.width || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Height</dt> <dd>{camper.height || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Tank</dt> <dd>{camper.tank || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Consumption</dt> <dd>{camper.consumption || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Transmission</dt> <dd>{camper.transmission || "-"}</dd>
            </div>
            <div className={styles.specRow}>
              <dt>Engine</dt> <dd>{camper.engine || "-"}</dd>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.leftColumn}>
          <section className={styles.reviewsSection}>
            <h3 className={styles.sectionTitle}>Reviews</h3>
            {reviews.length > 0 ? (
              <div className={styles.reviewsList}>
                {reviews.map((review) => (
                  <div key={review.id} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div className={styles.avatar}>
                        {review.reviewer_name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={styles.reviewerName}>
                          {review.reviewer_name}
                        </h4>
                        <RatingStars rating={review.reviewer_rating} />
                      </div>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </section>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.formWrapper}>
            <BookingForm camperId={camperId} />
          </div>
        </div>
      </div>
    </div>
  );
}
