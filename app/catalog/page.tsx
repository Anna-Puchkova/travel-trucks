import { Suspense } from "react";

import Filters from "../components/Filters/Filters";
import CamperList from "../components/CamperList/CamperList";
import Loader from "../components/Loader/Loader";

import css from "./page.module.css";

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
