"use client";

import Filters from "../components/Filters/Filters";
import CamperList from "../components/CamperList/CamperList";

import css from "./page.module.css";

export default function CatalogPage() {
  return (
    <div className={css.page}>
      <div className={css.catalogContainer}>
        <Filters />
        <CamperList />
      </div>
    </div>
  );
}
