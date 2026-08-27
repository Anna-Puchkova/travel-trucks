"use client";

import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import css from "./page.module.css";
import {
  CamperEngines,
  CamperForm,
  CamperTransmissions,
} from "../types/camper";
import { fetchCampers } from "../lib/api";
import Filters from "../components/Filters/Filters";
import Loader from "../components/Loader/Loader";
import EmptyState from "../components/EmptyState/EmptyState";

export function CamperList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = {
    location: searchParams.get("location") || undefined,
    form: (searchParams.get("form") as CamperForm) || undefined,
    transmission:
      (searchParams.get("transmission") as CamperTransmissions) || undefined,
    engine: (searchParams.get("engine") as CamperEngines) || undefined,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],

    queryFn: ({ pageParam }) =>
      fetchCampers({
        ...filters,
        page: pageParam,
        perPage: 4,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,

    retry: false, // 👈 Потрібно, щоб бекенд не робив повторні запити при 404
  });

  const handleClearFilters = () => {
    router.push("/catalog");
  };

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  // 1. Початкове завантаження
  if (isLoading) {
    return <Loader />;
  }

  // 2. Якщо бекенд повернув 404 (isError) або список порожній (0 карток)
  if (isError || campers.length === 0) {
    return (
      <div className={css.contentWrapper}>
        <EmptyState
          onClearFilters={handleClearFilters}
          onViewAll={handleClearFilters}
        />
      </div>
    );
  }

  return (
    <div className={css.contentWrapper}>
      {isFetchingNextPage && <Loader />}

      <section className={css.list}>
        {campers.map((camper) => (
          <article className={css.card} key={camper.id}>
            <img
              className={css.image}
              src={camper.coverImage || camper.gallery?.[0]?.thumb}
              alt={camper.name}
            />

            <div className={css.content}>
              <div className={css.top}>
                <div>
                  <h3 className={css.name}>{camper.name}</h3>

                  <div className={css.meta}>
                    <span>⭐ {camper.rating}</span>
                    <span>({camper.totalReviews} Reviews)</span>

                    <span>│</span>

                    <svg className={css.locationIcon}>
                      <use href="/symbol.svg#icon-Map" />
                    </svg>

                    <span className={css.location}>{camper.location}</span>
                  </div>
                </div>

                <p className={css.price}>€{camper.price}</p>
              </div>

              <p className={css.description}>
                {camper.description ||
                  "The pictures shown here are example vehicles of the respective camper."}
              </p>

              <div className={css.tags}>
                <span>
                  <svg className={css.locationIcon}>
                    <use href="/symbol.svg#icon-Property-1petrol" />
                  </svg>
                  {camper.engine === "petrol" ? "Petrol" : camper.engine}
                </span>

                <span>
                  <svg className={css.locationIcon}>
                    <use href="/symbol.svg#icon-Property-1automatic" />
                  </svg>
                  {camper.transmission === "automatic" ? "Automatic" : "Manual"}
                </span>

                <span>
                  <svg className={css.locationIcon}>
                    <use href="/symbol.svg#icon-Property-1alcove" />
                  </svg>
                  {camper.form === "panel_van"
                    ? "Panel Van"
                    : camper.form === "semi_integrated"
                      ? "Semi Integrated"
                      : camper.form === "integrated"
                        ? "Integrated"
                        : "Alcove"}
                </span>
              </div>

              <Link
                href={`/catalog/${camper.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={css.showMore}
              >
                Show more
              </Link>
            </div>
          </article>
        ))}

        {hasNextPage && (
          <button
            type="button"
            className={css.loadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            Load More
          </button>
        )}
      </section>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <main className={css.page}>
      <div className={css.catalogContainer}>
        <Filters />
        <CamperList />
      </div>
    </main>
  );
}
