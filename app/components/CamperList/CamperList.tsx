"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import type {
  CamperEngines,
  CamperForm,
  CamperTransmissions,
} from "../../types/camper";

import { fetchCampers } from "../../lib/api";
import CamperCard from "../../components/CamperCard/CamperCard";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";

import styles from "./CamperList.module.css";

export default function CamperList() {
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

    retry: false,
  });

  const handleClearFilters = () => {
    router.push("/catalog");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <EmptyState
        onClearFilters={handleClearFilters}
        onViewAll={handleClearFilters}
      />
    );
  }

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  if (campers.length === 0) {
    return (
      <EmptyState
        onClearFilters={handleClearFilters}
        onViewAll={handleClearFilters}
      />
    );
  }

  return (
    <div className={styles.container}>
      {isFetchingNextPage && <Loader />}

      <section className={styles.list}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </section>

      {hasNextPage && (
        <button
          type="button"
          className={styles.btnLoadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
