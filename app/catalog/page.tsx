import { Suspense } from "react";

import Filters from "../components/Filters/Filters";
import CamperList from "../components/CamperList/CamperList";
import Loader from "../components/Loader/Loader";

import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Camper Catalog | TravelTrucks",
  description: "Browse and filter campers available for rent.",
};
export default function CatalogPage() {
  return (
    <div className={css.page}>
      <div className={css.catalogContainer}>
        <Suspense fallback={<Loader />}>
          <Filters />
          <CamperList />
        </Suspense>
      </div>
    </div>
  );
}
