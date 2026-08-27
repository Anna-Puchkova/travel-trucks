"use client";

import Image from "next/image";
import css from "./EmptyState.module.css";

interface EmptyStateProps {
  onClearFilters: () => void;
  onViewAll?: () => void;
}

export default function EmptyState({
  onClearFilters,
  onViewAll,
}: EmptyStateProps) {
  return (
    <div className={css.container}>
      <div className={css.imageWrapper}>
        <Image
          src="/car.png"
          alt="No campers found"
          width={488}
          height={463}
          priority
          className={css.image}
        />
      </div>

      <h3 className={css.title}>No campers found</h3>

      <p className={css.text}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={css.actions}>
        <button type="button" onClick={onClearFilters} className={css.btnClear}>
          <span>✕</span> Clear filters
        </button>

        <button
          type="button"
          onClick={onViewAll || onClearFilters}
          className={css.btnViewAll}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}
